// Categories routes

const express = require("express")
const router = express.Router()
const {createCategory, getAllCategories, getCategoryById, updateCategoryByID, deleteCategoryByID} = require("../controllers/categories")

// Create new category
router.post("/", createCategory)

// Retrieve all categories 
router.get("/", getAllCategories)

// // Get category by ID
router.get("/:id", getCategoryById)

// Update category by ID
router.put("/:id", updateCategoryByID)

// Delete category by ID
router.delete("/:id", deleteCategoryByID)

module.exports = router