const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phoneNumber: String,
  country: String,
  RIB: String,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
