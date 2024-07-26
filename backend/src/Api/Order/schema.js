const mongoose = require("mongoose");
const validator = require("validator");
const UserModel = require("../User/schema");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User schema for user information
    // required: true,
  },

  address: {
    type: String,
  },

  contact_no: {
    type: String,
    // required: true,
    validate: {
      validator: function (value) {
        // Using validator library to check if it's a valid phone number
        return validator.isMobilePhone(value, "any", { strictMode: false });
      },
    },
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],

  order_id: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  payment_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  payment_method: { type: String, required: true },
  seller_id: { type: String, required: true },
  departure_time: { type: Date, required: true },
});

const orderModel = new mongoose.model("Order", orderSchema);

module.exports = orderModel;
