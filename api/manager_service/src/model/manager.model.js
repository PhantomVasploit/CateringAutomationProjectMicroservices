const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const managerSchema = new Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "email field is required"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    trim: true,
    default: process.env.PASSWORD
  },
  employeeNumber: {
    type: String,
    required: [true, "employee number field is required"],
    trim: true,
    unique: true
  },
  nationalId: {
    type: String,
    required: [true, "national Id field is required"],
    trim: true,
    unique: true
  }
});

managerSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

managerSchema.statics.login = async function(employeeNumber, password){
  const manager = await this.findOne({employeeNumber});
  const message = `Invalid login credentials`;
  if(manager !== null && manager !== undefined){
    const auth = await bcrypt.compare(password, manager.password);
    if(auth){
      return manager;
    }else {
      return message
    }
  }else {
    return message;
  }
}

const Manager = mongoose.model('manager', managerSchema);
module.exports = Manager;
