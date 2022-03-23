const amqp = require("amqplib");

const Stock = require("../models/stock.model");

let connection;
let channel;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();

    // consuming from the E_Menu channel
    channel.consume("E_Menu", (message)=>{
      const {foodItemId, amountPrepared} = JSON.parser(message.content.toString());
      Stock.findOneAndUpdate({foodItem: foodItemId}, {$inc:{amountPurchased: parseInt(-amountPrepared)}})
      .then(()=>{
        console.log(`Consumed from the E_Menu queue successfully`);
      })
      .catch((e)=>{
        console.log(`Error updating the stock data; ${e.message}`);
      })
    })
  } catch (e) {
      console.log(`Error connecting to the E_Menu queue: ${e.message}`);
  }
}
