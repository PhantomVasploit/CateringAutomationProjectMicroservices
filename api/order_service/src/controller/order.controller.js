const mongoose = require("mongoose");
const axios = require("axios");
const amqp = require("amqplib");

const { Order } = require("../models/order.model");
const Customer = require("../models/customer.model");
const lipaNaMpesaOnline = require("../utils/lipaNaMpesa");

let connection;
let channel;
let queue;
let queue2;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();
    queue = await channel.assertQueue("Order");
    queue2 = await channel.assertQueue("Order2")
  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();

// mpesa configuration

const auth = "Basic "+ Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64");
let oauth_token;

async function getOauthToken(){
  try {
    let response = await axios.get(process.env.OAUTHTOKEN_URL, {
      headers: {
        "Authorization": auth
      }
    })
    oauth_token = response.data.access_token;
    console.log(`oauth_token is: ${oauth_token}`);
  } catch (e) {
    console.log(`Auth Error: ${e.response}`);
  }
}

function startInterval(seconds){
  setInterval(function(){getOauthToken()}, seconds * 1000);
}


function pad2(n) { return n < 10 ? '0' + n : n }

function formatDate() {
    let date = new Date();
    let correctDate =
        date.getFullYear().toString() +
        pad2(date.getMonth() + 1) +
        pad2(date.getDate()) +
        pad2(date.getHours()) +
        pad2(date.getMinutes()) +
        pad2(date.getSeconds());
    return correctDate;
}

getOauthToken().then(()=>{
  startInterval(3499);
})

exports.createOrder = async (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const cashierId = toId(req.params.cashierId);
    const e_menuId = toId(req.params.e_menuId);
    const {orderAmount, orderCost} = req.body.body;
    const order = new Order({
      e_menu: e_menuId,
      orderAmount,
      orderCost,
      cashier: cashierId
    });
    const data = {
      e_menuId: e_menuId,
      orderAmount: orderAmount
    };
    await order.save(function(error, result){
      if(error){
        res.status(401).json({"Message": `Error create new order: ${error.message}`})
      }
      if(result){
        channel.sendToQueue("Order", Buffer.from(JSON.stringify(data)));
        channel.sendToQueue("Order2", Buffer.from(JSON.stringify(order)))
        res.status(201).json({"Message": "Order created Successfully", result});
      }
    });
  } catch (e) {
    console.log(`Error @ the create order handler: ${e.message}`);
  }
}

exports.customerCreateOrder = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const customerId = toId(req.params.customerId);
    const e_menuId = toId(req.params.e_menuId);
    const {orderAmount, orderCost} = req.body;
    const data = {
      e_menuId: e_menuId,
      orderAmount: orderAmount
    }
    Customer.findOne({_id: customerId})
    .then((customer)=>{
      console.log(`${JSON.stringify(customer)}`);
      console.log(`${oauth_token}`);
      // mpesa stk push prompt user for payment
      let timestamp = formatDate();
      let password = Buffer.from(process.env.BUSINESSSHORTCODE + process.env.PASSKEY + timestamp).toString("base64");
      let auth = "Bearer "+ oauth_token;
      axios({
        method: 'POST',
        url: process.env.STKPUSH_URL,
        headers: {
          "Authorization": auth
        },
        data: {
          "BusinessShortCode": 174379,
          "Password": password,
          "Timestamp": timestamp,
          "TransactionType": "CustomerPayBillOnline",
          "Amount": 1,
          "PartyA": 254757255894,
          "PartyB": 174379,
          "PhoneNumber": 254757255894,
          "CallBackURL": "http://127.0.0.1:5006/api/order/api/v1/c2bconfirmation",
          "AccountReference": "Egerton Bites",
          "TransactionDesc": "TestingMpesa"
        }
      })
      .then((response)=>{
        res.status(200).json({"Message": "Stk push sent to phone"});
        let responseBody = response.data;
        console.log(`Data is: ${JSON.stringify(responseBody)}`);
        // send order amount to e_menu service to be deducted
        channel.sendToQueue("Order", Buffer.from(JSON.stringify(data)));
        // save customer order
        customer.orders.push({e_menu: e_menuId, orderAmount, orderCost});
        customer.save();
      })
      .catch((e)=>{
        res.status(500).json({"Message": `Error: ${e.message}`});
        console.log(`Error: ${e.message}`);
      })
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error saving customer order: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the customer create order route: ${e.message}`);
  }
}

// C2B ConfirmationURL - /api/v1/c2b/confirmation
exports.mpesaConfirmationURL = (req, res)=>{
  console.log('-----------C2B CONFIRMATION REQUEST------------');
   console.log(req.body);
   console.log('-----------------------');

   let message = {
       "ResultCode": 0,
       "ResultDesc": "Success"
   };
   res.json(message);
}

exports.getCustomerOrders = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const customerId = toId(req.params.customerId);
    Customer.findOne({_id: customerId}, {
      "orders": 1
    })
    .then((orders)=>{
      res.status(200).json({"Message": "Successfully fetch customer orders", orders});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the fetch customer orders routes`);
  }
}

exports.getOrders = (req ,res)=>{
  try {
    const today = new Date().toLocaleDateString();
    Order.find({dateToday:today})
    .then((orders)=>{
      res.status(200).json({"Message": "Fetch Successful", orders})
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the fetch order handler: ${e.message}`);
  }
}

exports.processPayment = (req, res)=>{
  try {
  const {stkCallback} = req.body;
  channel.sendToQueue('Order', Buffer.from(JSON.stringify(stkCallback)));
  res.status(201).json({"Message": "Payment processed Successfully", stkCallback});
  } catch (e) {
    console.log(`Error @ the process payment route: ${e.message}`);
  }
}
