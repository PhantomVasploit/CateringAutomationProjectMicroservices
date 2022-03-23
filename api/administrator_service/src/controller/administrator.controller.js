const Admin = require("../model/administrator.model");
const {createToken} = require("../utils/token");

exports.register = (req, res)=>{
  try {
    const data = req.body.body.values;
    Admin.create(data)
    .then((admin)=>{
      const token = createToken(admin._id);
      res.status(201).json({"Message": "Administrator account created", admin, token});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Error creating administrator account: ${e.message}`});
    })
  } catch (e) {
    console.log(`Error @ the administrator register route: ${e.message}`);
  }
}

exports.login = async (req, res)=>{
  try {
    const {employeeNumber, password} = req.body.body.values;
    const admin = await Admin.login(employeeNumber, password);
    if(admin){
      const token = createToken(admin._id);
      res.status(200).json({"Message": "Login successful", admin, token});
    }  else {
      res.status(401).json({"Message": "Login failed"});
    }
  } catch (e) {
    console.log(`Error @ the administrator login route: ${e.message}`);
  }
}
