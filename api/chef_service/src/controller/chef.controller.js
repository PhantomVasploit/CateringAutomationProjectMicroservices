const amqp = require("amqplib");
const mongoose = require("mongoose");
const Chef = require("../model/chef.model");
const {createToken} = require("../utils/token")
let connection;
let channel;
let queue;
let queue2;
let queue3;

async function connect(){
  try {
    connection = await amqp.connect(process.env.AMQP_URI);
    channel = await connection.createChannel();
    queue = await channel.assertQueue("Chef");
    queue2 = await channel.assertQueue("ChefUpdate");
    queue3 = await channel.assertQueue("ChefDelete");
  } catch (e) {
    console.log(`Error connecting to amqp server: ${e.message}`);
  }
}

connect();


module.exports.register = (req, res)=>{
  try {
    const data = req.body.body.values;
    Chef.create(data)
    .then((chef)=>{
      channel.sendToQueue("Chef", Buffer.from(JSON.stringify(chef)));
      const token = createToken(chef._id);
      res.status(201).json({"Message": "Chef account created successfully", chef, token});
      channel.close();
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Failed to create chef account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the chef register handler: ${e.message}`);
  }
}

module.exports.login = async(req, res)=>{
  try {
    const {employeeNumber, password} = req.body.body.values;
    const chef = await Chef.login(employeeNumber, password);
    if(chef){
      const token = createToken(chef._id);
      res.status(200).json({"Message":"Login successful", chef, token})
    }  else {
      res.status(401).json({"Message": "Login failed"})
    }
  } catch (e) {
    console.log(`Error @ the chef login handler: ${e.message}`);
  }
}

module.exports.chefAccountDetails = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const chefId = toId(req.params.chefId);
    Chef.findOne({_id: chefId})
    .then((chef)=>{
      res.status(200).json({"Message":"Fetch successful", chef});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the chef account details handler: ${e.message}`);
  }
}

module.exports.chefAccounts = (req, res)=>{
  try {
    Chef.find({})
    .then((chefs)=>{
      res.status(200).json({"Message": "Fetch successful", chefs});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the chef accounts handler: ${e.message}`);
  }
}

module.exports.updateAccount = (req, res)=>{
  try {
    const {username, email, employeeNumber, nationalId} = req.body.body.values;
    const toId = mongoose.Types.ObjectId;
    const chefId = toId(req.params.chefId);
    const data = {username, email, employeeNumber, nationalId, chefId};
    Chef.findOneAndUpdate({_id: chefId}, { username, email, employeeNumber, nationalId })
    .then(()=>{
      Chef.findOne({_id: chefId})
      .then((chef)=>{
        channel.sendToQueue("ChefUpdate", Buffer.from(JSON.stringify(data)));
        res.status(200).json({"Message": "Account updated successfully", chef});
      })
      .catch((e)=>{
        res.status(401).json({"Message": `Failed to fetch updated account: ${e.message}`});
      })
      .catch((e)=>{
        res.status(401).json({"Message": `Failed to update chef account: ${e.message}`});
      })
    })
  } catch (e) {
    console.log(`Error @ the chef update account handler: ${e.message}`);
  }
}


module.exports.deleteAccount = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const chefId = toId(req.params.chefId);
    Chef.findOneAndRemove({_id: chefId})
    .then(()=>{
      channel.sendToQueue("ChefDelete", Buffer.from(JSON.stringify(chefId)));
      res.status(200).json({"Message": "Chef account deleted successfully"});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error deleting chef's account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the chef delete account handler: ${e.message}`);
  }
}
