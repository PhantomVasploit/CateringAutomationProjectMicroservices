const mongoose = require("mongoose");
const amqp = require("amqplib");
const Stock = require("../models/stock.model");


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
    const {amountPrepared} = req.body.body;
    const toId = mongoose.Types.ObjectId;
    const stockManagerId = toId(req.params.stockManagerId);
    const foodItemId = toId(req.params.foodItemId);
    const stock = await new Stock({
      amountPurchased: amountPrepared,
      foodItem: foodItemId,
      stockManager: stockManagerId
    });
    await stock.save(function(error, result){
      if(error){
        res.status(401).json({"Message": `Error creating the stock item: ${error.message}`});
      }
      if(result){
        res.status(201).json({"Message": "Stock item created successfully", result})
      }
    })
  } catch (e) {
    console.log(`Error @ the create stock handler:${e.message}`);
  }
}

exports.getStock = (req, res)=>{
  try {
    const today = new Date().toLocaleDateString();
    Stock.find({date: today}).populate([{path: "foodItem", select:['itemName'] }, {path: 'stockManager', select: ['username']}])
    .then((items)=>{
      res.status(200).json({"Message": "Fetch successful", items});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the fetch stock handler: ${e.message}`);
  }
}

exports.getSpecificStock = (req, res)=>{
  try {
    const today = new Date().toLocaleDateString();
    const toId = mongoose.Types.ObjectId;
    const foodItemId = toId(req.params.foodItemId);
    Stock.findOne({foodItem: foodItemId})
    .then((stock)=>{
      res.status(200).json({"Message": "Fetch Failed", stock})
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch Failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the get specific stock route; ${e.message}`);
  }
}

exports.updateStock = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const stockId = toId(req.params.stockId);
    const amountAdded = req.body.body;
    Stock.findOneAndUpdate({_id: stockId}, {$inc:{amountPurchased: parseInt(amountAdded)}})
    .then(()=>{
      res.status(200).json({"Message": "Amount purchsed incremented successfully"})
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error incrementing the stock item purchased field`});
    })
  } catch (e) {
    console.log(`Error @ the stock update amount purchsed hanler: ${e.message}`);
  }
}

exports.deleteStock = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const stockId = toId(req.params.stockId);
    Stock.findOneAndRemove({_id: stockId})
    .then(()=>{
      res.status(200).json({"Message": "Stock itme deleted"});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Unable to delete stock item: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @the delete stock hanler: ${e.message}`);
  }
}
