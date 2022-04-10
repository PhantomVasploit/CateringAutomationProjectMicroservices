const mongoose = require("mongoose");
const amqp = require("amqplib");
const Ingredient = require("../models/ingredient.model");


let channel;
let connection;
let queue;

async function connect(){
  try {
      connection = await amqp.connect(process.env.AMQP_URI);
      channel = await connection.createChannel();
      queue = await channel.assertQueue("Stock");

  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();

exports.createStock = async (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const ingredientId = toId(req.params.ingredientId);
    const stockManagerId = toId(req.params.stockManagerId);
    const {quantityPurchased, price} = req.body.body.values;
    Ingredient.findOne({_id: ingredientId})
    .then((ingredient)=>{
      ingredient.stock.push({quantityPurchased: quantityPurchased, price: price, stockManager: stockManagerId});
      ingredient.save();
      res.status(201).json({"Message": "Stock created successfully"});
    })
    .catch((e)=>{
      res.status(400).json({"Message": `Error creating stock: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the create stock handler:${e.message}`);
  }
}

exports.getTodayStock = (req, res)=>{
  try {
    let filtered;
    let merged = [];
    const today = new Date();
    Ingredient.find({})
    .then((ingredients)=>{
      ingredients.map((ingredient)=>{
        if(ingredient.stock.length >= 1){
          filtered = ingredient.stock.filter(function(value){
            return value.date.getDate() == today.getDate();
          });
        }
        merged = [{...filtered, itemName:ingredient.itemName}];
      })
      res.status(200).json({"Message": "Fetch successful", merged});
    })
    .catch((e)=>{
      res.status(400).json({"Message": `Error fetching data: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the getTodayStock handler: ${e.message}`);
  }
}



exports.getSpecificStock = (req, res)=>{
  try {
    const ingredient = req.params.ingredient;
    Ingredient.findOne({itemName: ingredient})
    .then((ingredient)=>{
      res.status(200).json({"Message": "Fetch successful", ingredient});
    })
    .catch((e)=>{
      res.status(400).json({"Message": `Error fetching data: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the get specific stock route; ${e.message}`);
  }
}

exports.updateStock = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const ingredientId = toId(req.params.ingredientId);
    const {quantityPurchased, price} = req.body.body;
    Ingredient.findOneAndUpdate({_id: ingredientId},
      {
        "$set": {
          "stock.$.quantityPurchased": quantityPurchased,
          "stock.$.price": price
        }
      })
    .then(()=>{
      res.status(200).json({"Message": `Update successful`})
    })
    .catch((e)=>{
      res.status(400).json({"Message": `Error updating stock: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the stock update amount purchsed hanler: ${e.message}`);
  }
}

exports.deleteStock = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const ingredientId = toId(req.params.ingredientId);
    Ingredient.findOneAndRemove({_id: ingredientId})
    .then(()=>{
      console.log(`Ingredient deleted successfully`);
    })
    .catch((e)=>{
      res.status(400).json({"Message": `Error deleting ingredient: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @the delete stock hanler: ${e.message}`);
  }
}
