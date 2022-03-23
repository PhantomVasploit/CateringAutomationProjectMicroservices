const mongoose = require("mongoose");
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
    const {orderAmount, orderCost} = req.body.body;
    const data = {
      e_menuId: e_menuId,
      orderAmount: orderAmount
    }
    Customer.findOne({_id: customerId})
    .then((customer)=>{
      customer.orders.push({e_menu: e_menuId, orderAmount, orderCost});
      customer.save();
      // send order amount to e_menu service to be deducted
      channel.sendToQueue("Order", Buffer.from(JSON.stringify(data)));
      // mpesa stk push prompt user for payment
      lipaNaMpesa(orderCost, customer.phoneNumber);
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error saving customer order: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the customer create order route: ${e.message}`);
  }
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
