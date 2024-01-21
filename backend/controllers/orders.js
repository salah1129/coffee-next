const Order = require("../models/orders");

// POST - Create a new order
exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET - Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET - Retrieve a specific order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
