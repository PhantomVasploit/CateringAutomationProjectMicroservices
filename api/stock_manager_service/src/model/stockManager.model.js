const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const stockManagerSchema = new Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    trim: true,
    lowercase: true
  },
  email:{
    type: String,
    required: [true, "email field is required"],
    trim: true,
    unique: true,
  },
  password:{
    type: String,
    required: [true, "password field is required"],
    trim: true
  },
  employeeNumber: {
    type: String,
    required: [true, "employee number field is required"],
    trim: true,
    unique: true
  },
  nationalId:{
      type: String,
      required: [true, "national Id field is required"],
      trim: true,
      unique: true
  }
});

stockManagerSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

stockManagerSchema.statics.login = async function(employeeNumber, password){
  const stockManager = await this.findOne({employeeNumber});
  if(stockManager){
    const auth = await bcrypt.compare(password, stockManager.password);
    if(auth){
      return stockManager;
    }
    throw Error("Invalid password...\n");
  }
  throw Error("Invalid employeeNumber...\n");
}

const StockManager = mongoose.model('stockManager', stockManagerSchema);
module.exports = StockManager
