const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {orderSchema} = require("./order.model");

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
  },
  orders: [orderSchema]
});

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
