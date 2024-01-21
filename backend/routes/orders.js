// products routes

const express = require("express")
const router = express.Router()
const {placeOrder, getAllOrders} = require("../controllers/orders")

// Create new category
router.post("/",placeOrder )

// Get all orders
router.get("/", getAllOrders)



module.exports = router