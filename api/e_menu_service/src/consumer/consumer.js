const amqp = require("amqplib");

const Chef = require("../models/chef.model");
const E_Menu = require("../models/e_menu.model");

let channel;
let connection;
let queue;

async function connect(){
  try {
      connection = await amqp.connect(process.env.AMQP_URI);
      channel = await connection.createChannel();

      // consuming from chef provider
      try {
        channel.consume("Chef", (message)=>{
          const data = JSON.parse(message.content.toString());
          Chef.create(data)
          .then((chef)=>{
            console.log(`Recieved a new registered chef from the chef service: ${JSON.stringify(chef)}`);
            channel.ack(message);
          })
          .catch((e)=>{
            console.log(`Error creating a new chef from the chef service: ${e.message}`);
          })
        })
      } catch (e) {
        console.log(`Error consuming data from the chef publisher: ${e.message}`);
      }

      // consuming chef update queue
      try {
        channel.consume("ChefUpdate", (message)=>{
          const {username, email, password, employeeId, nationalId, chefId} = JSON.parse(message.content.toString());
          Chef.findOneAndUpdate({_id: chefId}, {username, email, password, employeeId, nationalId})
          .then(()=>{
            console.log(`Chef account updated successfully`);
          })
          .catch((e)=>{
            console.log(`Chef account updated successfully: ${e.message}`);
          })
        });
      } catch (e) {
        console.log(`Error consuming from the ChefUpdate queue: ${e.message}`);
      }

      // consuming from cashier delete queue
      try {
        channel.consume("ChefDelete", (message)=>{
          const data = JSON.parse(message.content.toString());
          Chef.findOneAndRemove({_id: data.chefId})
          .then(()=>{
            console.log(`Chef account deleted`);
          })
          .catch((e)=>{
            console.log(`Error deleting chef account: ${e.message}`);
          })
        })
      } catch (e) {
        console.log(`Error consuming from the ChefDelete queue: ${e.message}`);
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

  } catch (e) {
    console.log(`Error connecting to the amqp server: ${e.message}`);
  }
}

connect();
