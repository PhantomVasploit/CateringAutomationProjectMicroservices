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

chefSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

chefSchema.statics.login = async function(employeeNumber, password){
  const chef = await this.findOne({employeeNumber});
  if(chef){
    const auth = await bcrypt.compare(password, chef.password);
    if(auth){
      return chef;
    }
    throw Error("Invalid password...\n");
  }
  throw Error("Unregistered employee number")
}

const Chef = mongoose.model('chef', chefSchema);
module.exports = Chef;
