const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const chefSchema = new Schema({
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
    unique: true
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    trim: true,
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

const Chef = mongoose.model('chef', chefSchema);
module.exports = Chef;
