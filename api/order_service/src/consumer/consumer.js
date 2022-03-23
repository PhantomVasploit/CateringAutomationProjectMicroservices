const amqp = require("amqplib")

const Customer = require("../models/customer.model");
const Cashier = require("../models/cashier.model");

let connection;
let channel;
let queue;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();

    // consuming the Customer channel
    try {
      channel.consume("Customer", (message)=>{
        const data = JSON.parse(message.content.toString());
        Customer.create(data)
        .then((customer)=>{
          channel.ack(message);
          console.log(`Consumed data from the Consumer Queue: ${JSON.stringify(customer)}`);
        })
        .catch((e)=>{
          console.log(`Error consuming data from the Consumer Queue: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error consuming from the Customer Queue: ${e.message}`);
    }

    // customer update queue
    try {
      channel.consume("CustomerUpdate", (message)=>{
        const data = JSON.parse(message.content.toString());
        Customer.findOneAndUpdate({_id: data.customerId}, {
          username: data.username,
          email: data.email,
          password: data.password,
          registrationNumber: data.registrationNum
        })
        .then(()=>{
          console.log(`Customer account updated Successfully`);
        })
        .catch((e)=>{
          console.log(`Error updating customer account: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error consuming the CustomerUpdate queue: ${e.message}`);
    }

    // consuming customer delete queue
    try {
      channel.consume("CustomerDelete", (message)=>{
        const data = JSON.parse(message.content.toString);
        Customer.findOneAndRemove({_id: data.customerId})
        .then(()=>{
          console.log(`Customer account Successfully deleted`);
        })
        .catch((e)=>{
          console.log(`Error deleting customer account: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error consuming from the customer delete queue: ${e.message}`);
    }

    // consuming the cashier queue
    try {
      channel.consume("Cashier", (message)=>{
        const data = JSON.parse(message.content.toString());
        Cashier.create(data)
        .then((cashier)=>{
          console.log(`Successfully consumed data on the Cashier queue: ${JSON.stringify(cashier)}`);
          channel.ack(message);
        })
        .catch((e)=>{
          console.log(`Failed to consume data on the Cashier queue: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error connecting to the Cashier queue: ${e.message}`);
    }

    // consume the cashier update queue
    try {
      channel.consume("CashierUpdate", (message)=>{
        const data = JSON.parse(message.content.toString());
        Cashier.findOneAndUpdate({_id: data.cashierId}, {
          username: data.username,
          email: data.email,
          password: data.password,
          employeeNumber: data.employeeNumber,
          nationalId: data.nationalId
        })
        .then(()=>{
          console.log(`Cashier Account updated`);
        })
        .catch((e)=>{
          console.log(`Error updating cashier account: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error @ reading from the CashierUpdate queue`);
    }

    // consume from cashier delete queue
    try {
      channel.consume("CashierDelete", (message)=>{
        const data = JSON.stringify(message.content.toString());
        Cashier.findOneAndRemove({_id: data.cashierId})
        .then(()=>{
          console.log(`Cashier account deleted Successfully`);
        })
        .catch((e)=>{
          console.log(`Error deleting cashier account: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error reading from cashier delete queue: ${e.message}`);
    }

  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();
