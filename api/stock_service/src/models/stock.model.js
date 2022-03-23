const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  date: {
    type: Date,
    default: new Date().toLocaleDateString(),
    required: [true, "date field is required"]
  },
  amountPurchased: {
    type: Number,
    required: [true, "amount purchased field is required"]
  },
  foodItem: {
    type: Schema.Types.ObjectId,
    ref: 'foodItem',
    required: [true, "food item field required"]
  },
  stockManager: {
    type: Schema.Types.ObjectId,
    ref: 'stockManager',
    required: [true, "stockManager field required"]
  }
});

const Stock = mongoose.model('stock', stockSchema);
module.exports = Stock;
