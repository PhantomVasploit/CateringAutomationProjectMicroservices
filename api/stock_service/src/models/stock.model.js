const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  date: {
    type: Date,
    default: new Date(),
    required: [true, "date field is required"]
  },
  price: {
    type: Number,
    required: [true, "price field is required"]
  },
  quantityPurchased: {
    type: Number,
    required: [true, "amount purchased field is required"]
  },
  stockManager: {
    type: Schema.Types.ObjectId,
    ref: 'stockManager',
    required: [true, "stockManager field required"]
  }
});

const Stock = mongoose.model('stock', stockSchema);
module.exports = {Stock, stockSchema};
