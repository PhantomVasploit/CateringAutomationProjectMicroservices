const amqp = require("amqplib");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Cashier = require("../model/cashier.model");
const { createToken } = require("../utils/token")

let connection;
let channel;
let queue;
let queue2;
let queue3;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();
    queue = await channel.assertQueue("Cashier");
    queue2 = await channel.assertQueue("CashierUpdate");
    queue3 = await channel.assertQueue("CashierDelete");
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
    Cashier.create(data)
    .then((cashier)=>{
      const token = createToken(cashier._id);
      channel.sendToQueue("Cashier", Buffer.from(JSON.stringify(cashier)));
      res.status(201).json({"Message": "Cashier saccount created successfully", cashier, token});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Faled to create cashier account ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the manager cashier route handler: ${e.message}`);
  }
}

module.exports.login = async(req, res)=>{
  try {
    const data = req.body.body.values;
    const cashier = await Cashier.login(data.employeeNumber, data.password);
    if(cashier){
      const token = createToken(cashier._id);
      res.status(200).json({"Message":`Login successful`, cashier, token});
    }else {
      res.status(401).json({"Message":"Login failed"})
    }
  } catch (e) {
    console.log(`Error @ the cashier login handler: ${e.message}`);
  }
}

module.exports.cashierAccountDetails = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const cashierId = toId(req.params.cashierId);
    Cashier.findOne({_id:cashierId})
    .then((cashier)=>{
      res.status(200).json({"Message":"Fetch successful", cashier});
    })
    .catch((e)=>{
      res.status(401).json({"Message":`Error fectching account details: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the cashier account handler: ${e.message}`);
  }
}


module.exports.updateAccount = (req, res)=>{
  try {
    const data = req.body.body.values;
    const toId = mongoose.Types.ObjectId;
    const cashierId = toId(req.params.cashierId);
    const data2 = {...data, cashierId};
    Cashier.findOneAndUpdate({_id: cashierId}, {
      username: data.username,
      email: data.email,
      employeeNumber: data.employeeNumber,
      nationalId: data.nationalId,
      password: hashPassword(data.password)
    })
    .then(()=>{
      Cashier.findOne({_id:cashierId})
      .then((cashier)=>{
        channel.sendToQueue("CashierUpdate",  Buffer.from(JSON.stringify(data2)));
        res.status(200).json({"Message": "Account updated successfully", cashier});
      })
      .catch((e)=>{
        res.status(401).json({"Message":`Failed to update account ${e.message}`});
      })
    })
  } catch (e) {
    console.log(`Error @ the cashier update account handler: ${e.message}`);
  }
}

module.exports.deleteAccount = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const cashierId = toId(req.params.cashierId);
    Cashier.findOneAndRemove({_id: cashierId})
    .then((cashier)=>{
      channel.sendToQueue("CashierDelete", Buffer.from(JSON.stringify(cashierId)));
      res.status(200).json({"Message":"Account successfully deleted"});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error deleting account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the cashier delete account handler: ${e.message}`);
  }
}

module.exports.cashierAccounts = (req, res)=>{
  try {
      Cashier.find({})
      .then((cashiers)=>{
        res.status(200).json({"Message": "Fetch successful", cashiers});
      })
      .catch((e)=>{
        res.status(401).json({"Message": `Fetch failed: ${e.message}`});
      })
  } catch (e) {
    console.log(`Error @ the cashier accounts handler: ${e.message}`);
  }
}
