// products routes

const express = require("express")
const router = express.Router()
const {createNewProduct, getAllProducts, getProductByID, updateProductByID, deleteProductByID} = require("../controllers/products")

// Create new category
router.post("/",createNewProduct )

// Retrieve all categories 
router.get("/", getAllProducts)

// // Get category by ID
router.get("/:id", getProductByID)

// Update category by ID
router.put("/:id", updateProductByID)

// Delete category by ID
router.delete("/:id", deleteProductByID)

module.exports = router