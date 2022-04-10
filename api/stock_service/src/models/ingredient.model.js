const mongoose = require("mongoose");
const {stockSchema} = require("./stock.model");

const Schema = mongoose.Schema;
const ingredientSchema = new Schema({
  itemName:{
    type: String,
    trim: true,
    required: [true, "item name field required"]
  },
  stock: [stockSchema]
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);
module.exports = Ingredient;
