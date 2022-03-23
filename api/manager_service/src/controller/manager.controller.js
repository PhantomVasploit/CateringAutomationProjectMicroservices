const mongoose = require("mongoose");

const Manager = require("../model/manager.model");
const {createToken} = require("../utils/token");

exports.register = (req, res)=>{
  try {
    const data = req.body.body.values;
    Manager.create(data)
    .then((manager)=>{
      const token = createToken(manager._id);
      res.status(201).json({"Message": "Manager account created successfully", manager, token});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Faled to create manager account ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the manager register route handler: ${e.message}`);
  }
}

exports.login = async(req, res)=>{
  try {
    const {employeeNumber, password} = req.body.body.values;
    const manager = await Manager.login(employeeNumber, password);
    if(manager){
      const token = createToken(manager._id);
      res.status(200).json({"Message": "Login successful", manager, token});
    }else {
      res.status(401).json({"Message": "Login failed"});
    }
  } catch (e) {
    console.log(`Error @ the manager login handler: ${e.message}`);
  }
}

exports.managerAccountDetails = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const managerId = toId(req.params.managerId);
    Manager.findOne({_id: managerId})
    .then((manager)=>{
      res.status(200).json({"Message":"Fetch successful", manager});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the manager account details handler: ${e.message}`);
  }
}

exports.managerAccounts = (req, res)=>{
  try {
    Manager.find({})
    .then((managers)=>{
      res.status(200).json({"Message": "Fetch successful", managers});
    })
    .catch((e)=>{
      res.status(401).sjon({"Message": `Fetch failed ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the manager accounts handler: ${e.message}`);
  }
}


exports.updateAccount = (req, res)=>{
  try {
    const {username, email, employeeNumber, nationalId} = req.body.body.values;
    const toId = mongoose.Types.ObjectId;
    const managerId = toId(req.params.managerId);
    Manager.findOneAndUpdate({_id: managerId}, {username, email, employeeNumber, nationalId})
    .then(()=>{
      Manager.findOne({_id: managerId})
      .then((manager)=>{
        res.status(200).json({"Message": "Update successful", manager});
      })
      .catch((e)=>{
        res.status(401).json({"Message": `Fetch after update failed: ${e.message}`});
      })
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Update failed: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the manager account handler: ${e.message}`);
  }
}


exports.deleteAccount = (req, res)=>{
  try {
    const toId = mongoose.Types.ObjectId;
    const managerId = toId(req.params.managerId);
    Manager.findOneAndRemove({_id: managerId})
    .then(()=>{
      res.status(200).json({"Message": "Account deleted successfully"})
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Failed to delete account: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the manager delete account handler: ${e.message}`);
  }
}
