const mongoose = require("mongoose");
const amqp = require("amqplib");
const E_Menu = require("../models/e_menu.model");


let channel;
let connection;
let queue;
let queue2

async function connect(){
  try {
      connection = await amqp.connect(process.env.AMQP_URI);
      channel = await connection.createChannel();
      queue = await channel.assertQueue("E_Menu");
      queue2 = await channel.assertQueue("E_Menu2")

  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();

exports.createEMenu = async (req, res)=>{
  try {
    const {amountPrepared} = req.body.body.values;
    const toId = mongoose.Types.ObjectId;
    const chefId = toId(req.params.chefId);
    const foodItemId = toId(req.params.foodItemId);
    const data = {
      amountPrepared,
      foodItemId
    }
    const data2 = {
      amountPrepared,
      foodItem: foodItemId,
      chef: chefId
    }
    const menu = await new E_Menu({
      amountPrepared,
      foodItem: foodItemId,
      chef: chefId
    });
    await menu.save(function(error, result){
      if(error){
        channel.sendToQueue("E_Menu", Buffer.from(JSON.stringify(data)));
        channel.sendToQueue*("E_Menu2", Buffer.from(JSON.stringify(data2)));
        res.status(401).json({"Message": `Error creating the menu item: ${error.message}`});
      }
      if(result){
        channel.sendToQueue("E_Menu", Buffer.from(JSON.stringify(result)));
        res.status(201).json({"Message": "Menu item created successfully", result})
      }
    })
  } catch (e) {
    console.log(`Error @ the create menu handler:${e.message}`);
  }
}

exports.getMenu = (req, res)=>{
  try {
    const today = new Date().toLocaleDateString();
    E_Menu.find({date: today}).populate([{path: "foodItem", select:['itemName', 'staffCafeteriaPrice', 'studentCafeteriaPrice', 'imgUrl'] }, {path: 'chef', select: ['username']}])
    .then((items)=>{
      res.status(200).json({"Message": "Fetch successful", items});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the fetch menu handler: ${e.message}`);
  }
}
