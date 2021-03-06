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
  imgUrl:{
    type:String,
    trim: true
  },
  staffCafeteriaPrice:{
    type: Number,
    required: [true, "Staff cafeteria price field required"]
  },
  studentCafeteriaPrice:{
    type: Number,
    required: [true, "Student cafeteria price field required"]
  },
  ingredients: {
    type: Array,
    required:  [true, "ingredients field is required"]
  }
});

const FoodItem = mongoose.model('foodItem', foodItemSchema);
module.exports = FoodItem;
