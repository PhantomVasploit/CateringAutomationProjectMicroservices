const amqp = require("amqplib");

const { Order } = require("../model/order.model");
const E_Menu = require("../model/e_menu.model");

let connection;
let channel;
let queue;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();

    try {
      // consuming E_Menu2 queue
      channel.consume("E_Menu2", (message)=>{
        const data = JSON.parse(message.content.toString());
        E_Menu.create(data)
        .then((menu)=>{
          console.log(`Consumed from E_Menu2 queue successfully: ${JSON.stringify(menu)}`);
        })
        .catch((e)=>{
          console.log(`Error creating menu: ${e.message}`);
        })
      })

    } catch (e) {
      console.log(`Unable to consume data from the E_Menu2 queue: ${e.message}`)
    }
    // consuming from the Order Queue
    try {
      channel.consume("Order", (message)=>{
        const {orderAmount, e_menuId} = JSON.parse(message.content.toString());
        E_Menu.findOneAndUpdate({_id: e_menuId}, {$inc:{amountPrepared: parseInt(-orderAmount)}})
        .then(()=>{
          console.log(`Consumed from the order queue successfully`);
          channel.ack(message);
        })
        .catch((e)=>{
          console.log(`Unable to deduct amount ordered from the Order queue: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Unable to consume data from the order queue: ${e.message}`);
    }

    // consuming from the Order2 Queue
    try {
      channel.consume("Order2", (message)=>{
        const data = JSON.parse(message.content.toString());
        Order.create(data)
        .then((order)=>{
          console.log(`Successfully consumed from the order2 queue: ${order}`);
        })
        .catch((e)=>{
          console.log(`Error creating order from order2 queue: ${e.message}`);
        })
      })
    } catch (e) {
      console.log(`Error reading from order2 queue: ${e.message}`);
    }

  } catch (e) {
  console.log(`Error connecting to the amqp server: ${e.message}`);
  }





}
connect();
