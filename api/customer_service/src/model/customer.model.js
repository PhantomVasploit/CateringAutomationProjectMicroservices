const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username:{
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
  password:{
    type: String,
    required: [true, "password field is required"],
    trim: true
  },
  registrationNumber: {
    type: String,
    required: [true, "registration number field is required"]
  },
  balance: {
    type: Number,
    min: 0,
    default: 0
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number field is required"]
  }
});

// hashing password
customerSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// login login
customerSchema.statics.login = async function(registrationNumber, password){
  const customer = await this.findOne({registrationNumber});
  if(customer){
    const auth = bcrypt.compare(password, customer.password);
    if(auth){
      return customer;
    }
    throw Error(`Incorrect password...\n`);
  }
  throw Error(`Unregistered registrationNumber...\n`);
}

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
