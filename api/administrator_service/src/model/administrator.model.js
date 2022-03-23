const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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

adminSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

adminSchema.statics.login = async function(employeeNumber, password){
  const cashier = await this.findOne({employeeNumber});
  if(cashier){
    const auth = await bcrypt.compare(password, cashier.password);
    if(auth){
      return cashier;
    }
    throw Error("Invalid password...\n");
  }
  throw Error("Invalid employeeNumber...\n");
}

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;