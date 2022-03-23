const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const orderSchema = new Schema({
  e_menu: {
    type: Schema.Types.ObjectId,
    ref: 'e_menu',
    required: [true, 'Menu field is required']
  },
  orderDateAndTime: {
    type: Date,
    default: Date.now,
    required:[true, "date time field is required"]
  },
  dateToday: {
    type: Date,
    default: new Date().toLocaleDateString(),
    required: [true, "date today field is required"]
  },
  orderAmount: {
    type: Number,
    required: [true, "amount ordered is required"]
  },
  orderCost: {
    type: Number,
    required: [true, "order cost field is required"]
  },
  cashier: {
    type: Schema.Types.ObjectId,
    ref: 'cashier'
  }
});

const Order = mongoose.model('order', orderSchema);
module.exports = {Order, orderSchema};
