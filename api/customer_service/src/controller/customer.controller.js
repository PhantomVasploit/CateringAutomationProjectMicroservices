const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const amqp = require("amqplib");

const Customer = require("../model/customer.model");
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
    queue = await channel.assertQueue("Customer");
    queue2 = await channel.assertQueue("CustomerUpdate");
    queue3 = await channel.assertQueue("CustomerDelete");
  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();

const hashPassword = async (password)=>{
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

module.exports.register = (req, res)=>{
  try {
    const data = req.body.body.values;
    Customer.create(data)
    .then((customer)=>{
      channel.sendToQueue('Customer', Buffer.from(JSON.stringify(customer)));
      const token = createToken(customer._id);
      res.status(201).json({"Message":"Customer Accounted created successfully", customer, token});
      channel.close()
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error creating customer account ${e.message}`})
      console.log(`Error creating customer account ${e.message}`);
    })
  } catch (e) {
    console.log(`Error @ the customer registration handler: ${e.message}`);
  }
}

module.exports.login = async (req, res)=>{
  try {
    const data = req.body.body.values;
    const customer = await Customer.login(data.registrationNumber, data.password);
    if(customer){
      const token = createToken(customer._id);
      res.status(200).json({"Message":"Login successful", customer, token});
      console.log(`Login successful, ${customer}`);
    }else {
      res.status(401).json({"Message":"Login failed"});
      console.log("Login failed");
    }
  } catch (e) {
    console.log(`Error @ the customer login handler: ${e.message}`);
  }
}

module.exports.customerAccountDetails = async (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const customerId = toId(req.params.customerId);
    Customer.findOne({_id: customerId})
    .then((customer)=>{
      res.status(200).json({"Message":"Fetch successful", customer});
      console.log(`Fetch successful:\n ${customer}`);
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch Failed: ${e.message}`});
      console.log(`Fetch failed: ${e.message}`);
    })
  } catch (e) {
    console.log(`Error @ the customer account details handler: ${e.message}`);
  }
}

exports.customerAccounts = (req, res)=>{
  try {
    Customer.find({})
    .then((customer)=>{
      res.status(200).json({"Message": "Fetch successful", customer})
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the fetch customer accounts route: ${e.message}`);
  }
}

module.exports.customerUpdate = (req, res)=>{
  try {
      const data = req.body.body.values;
      const toId = mongoose.Types.ObjectId;
      const customerId = toId(req.params.customerId);
      const data2 = {...data, customerId};
      Customer.findOneAndUpdate({_id: customerId}, {
          username: data.username,
          email: data.email,
          registrationNumber: data.registrationNumber,
          password: hashPassword(data.password)
      })
      .then(()=>{
        Customer.findOne({_id: customerId})
        .then((customer)=>{
          channel.sendToQueue("CustomerUpdate", Buffer.from(JSON.stringify(data2)));
          res.status(200).json({"Message":"Customer account updated successfully", customer});
          console.log(`Customer account updated successfully: ${customer}`);
        })
      })
      .catch((e)=>{
        res.status(401).json({"Message":`Customer account updation failed:${e.message}` });
        console.log(`Error updating customer account: ${e.message}`);
      })
  } catch (e) {
    console.log(`Error @ the customer update account handler: ${e.message}`);
  }
}

module.exports.customerDelete = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const customerId = toId(req.params.customerId);
    Customer.findOneAndRemove({_id: customerId})
    .then(()=>{
      channel.sendToQueue("CustomerDelete", Buffer.from(JSON.stringify(customerId)));
      res.status(200).json({"Message": `Customer account deleted successfully`});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Failed to delete customer account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the customer delete account handler: ${e.message}`);
  }
}
