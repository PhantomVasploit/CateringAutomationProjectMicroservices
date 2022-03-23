const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const foodItemSchema = new Schema({
  itemName:{
    type: String,
    trim: true,
    required: [true, "item name field required"]
  },
  codeNumber: {
    type: String,
    trim: true,
    required: [true, "code number field required"],
    unique: true
  },
  staffCafeteriaPrice:{
    type: Number,
    required: [true, "Staff cafeteria price field required"]
  },
  studentCafeteriaPrice:{
    type: Number,
    required: [true, "Student cafeteria price field required"]
  }
});

const FoodItem = mongoose.model('foodItem', foodItemSchema);
module.exports = FoodItem;
