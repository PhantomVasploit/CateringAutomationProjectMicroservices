const mongoose = require("mongoose");
const amqp = require("amqplib");
const StockManager = require("../model/stockManager.model");
const bcrypt = require("bcrypt");
const {createToken} = require("../utils/token");

let connection;
let channel;
let queue;
let queue2;
let queue3;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();
    queue = await channel.assertQueue("StockManager");
    queue2 = await channel.assertQueue("StockManagerUpdate");
    queue3 = await channel.assertQueue("StockManagerDelete");
  } catch (e) {
    console.log(`Error connecting to amqp server: ${e.message}`);
  }
}

connect();

const hashPassword = async (password)=>{
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

exports.register = (req, res)=>{
  try {
    const data = req.body.body.values;
    StockManager.create(data)
    .then((stockManager)=>{
      channel.sendToQueue("StockManager", Buffer.from(JSON.stringify(stockManager)));
      const token = createToken(stockManager._id);
      res.status(201).json({"Message": "stockManager account created", stockManager, token});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error creating stockManager account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the stockManager register route: ${e.message}`);
  }
}

exports.login = async (req, res)=>{
  try {
    const {employeeNumber, password} = req.body.body.values;
    const stockManager = await StockManager.login(employeeNumber, password);
    if(stockManager){
      const token = createToken(stockManager._id);
      res.status(200).json({"Message": "Login successful", stockManager, token});
    }  else {
      res.status(401).json({"Message": "Login failed"});
    }
  } catch (e) {
    console.log(`Error @ the stockManager login route: ${e.message}`);
  }
}


module.exports.stockManagerDetails = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const cashierId = toId(req.params.cashierId);
    StockManager.findOne({_id:stockManagerId})
    .then((stockManager)=>{
      res.status(200).json({"Message":"Fetch successful", stockManager});
    })
    .catch((e)=>{
      res.status(401).json({"Message":`Error fectching account details: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the stockManager account handler: ${e.message}`);
  }
}


module.exports.updateAccount = (req, res)=>{
  try {
    const data = req.body.body.values;
    const toId = mongoose.Types.ObjectId;
    const stockManagerId = toId(req.params.stockManagerId);
    const data2 = {...data, stockManagerId};
    StockManager.findOneAndUpdate({_id: stockManagerId}, {
      username: data.username,
      email: data.email,
      password: hashPassword(data.password),
      employeeNumber: data.employeeNumber,
      nationalId: data.nationalId
    })
    .then(()=>{
      channel.sendToQueue("StockManagerUpdate", Buffer.from(JSOn.stringify(data2)));
      StockManager.findOne({_id:stockManagerId})
      .then((stockManager)=>{
        res.status(200).json({"Message": "Account updated successfully", stockManager});
      })
      .catch((e)=>{
        res.status(401).json({"Message":`Failed to update account ${e.message}`});
      })
    })
  } catch (e) {
    console.log(`Error @ the stockManager update account handler: ${e.message}`);
  }
}

module.exports.deleteAccount = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const stockManagerId = toId(req.params.stockManagerId);
    StockManager.findOneAndRemove({_id: stockManagerId})
    .then(()=>{
      channel.sendToQueue("StockManagerDelete", Buffer.from(JSON.stringify(cashierId)))
      res.status(200).json({"Message":"Account successfully deleted"});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error deleting account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the stockManager delete account handler: ${e.message}`);
  }
}

module.exports.stockManagerAccounts = (req, res)=>{
  try {
      StockManager.find({})
      .then((stockManagers)=>{
        res.status(200).json({"Message": "Fetch successful", stockManagers});
      })
      .catch((e)=>{
        res.status(401).json({"Message": `Fetch failed: ${e.message}`});
      })
  } catch (e) {
    console.log(`Error @ the stockManager accounts handler: ${e.message}`);
  }
}
