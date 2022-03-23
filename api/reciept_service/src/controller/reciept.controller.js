const mongoose = require("mongoose");
const Reciept = require("../model/reciept.model");


module.exports.generateReciept = async(req, res)=>{
  try {
      const toId = mongoose.Types.ObjectId;
      const orderId = toId(req.params.orderId);
      const reciept = new Reciept({
        order: orderId
      })
      await reciept.save(function(err, result){
        if(result){
          res.status(201).json({"Message": "Reciept Generated Successfully", reciept});
        }
        if(err){
          res.status(400).json({"Message": `Error in Generating Reciept: ${e.message}`});
        }
      })
  } catch (e) {
    console.log(`Error at the Generate Reciept handler: ${e.message}`);
  }
}


module.exports.getReciept = async (req, res)=>{
  try {
    const reciept = await Reciept.find({}).populate({path: "order", populate:{ path: "e_menu", populate:{path: "foodItem", model: "foodItem"}}});
    if(reciept){
      res.status(200).json({"Message": "Fetch Successful", reciept});
    }else {
      res.status(400).json({"Message": "Fetch Failed"})
    }
  } catch (e) {
    console.log(`Error on the Get Reciept handler: ${e.message}`);
  }
}
