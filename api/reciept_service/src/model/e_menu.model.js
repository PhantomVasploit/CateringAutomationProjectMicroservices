const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const e_menuSchema = new Schema({
  date: {
    type: Date,
    default: new Date().toLocaleDateString(),
    required: [true, "date field is required"]
  },
  amountPrepared: {
    type: Number,
    required: [true, "amount preapred field is required"]
  },
  foodItem: {
    type: Schema.Types.ObjectId,
    ref: 'foodItem',
    required: [true, "food item field required"]
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'chef',
    required: [true, "chef field required"]
  }
});

const E_Menu = mongoose.model('e_menu', e_menuSchema);
module.exports = E_Menu;
