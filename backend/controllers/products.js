// Products controller

const Product = require("../models/products")

 // Create new product
exports.createNewProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({
            $or :[
                {productName : req.body.productName},
            ]
        })
        if(existingProduct){
            return res.status(400).json({msg : "product nam should be unique"})
        }
        const newProduct = new Product({
            ...req.body,
        })
        await newProduct.save()
        res.status(201).json({msg : "Product created successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// List all products

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryID');
        const productsWithCategoryNames = products.map(product => ({
            _id: product._id,
            productName: product.productName,
            productImage: product.productImage,
            category: product.categoryID.categoryName, 
            descriptions: product.descriptions,
            price: product.price,
            images: product.images,
        }));
        res.status(200).json(productsWithCategoryNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a product by ID
exports.getProductByID = async (req, res) => {
    try {
        const productID = req.params.id 
        const product = await Product.findById(productID)
        if(!product){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Update product by ID 
exports.updateProductByID = async (req, res) => {
    try {
        const productID = req.params.id
        const updatedData = req.body
        const existingProduct = await Product.findOne({
            $or :[
                {productName : req.body.productName},
            ]
        })
        if(existingProduct && existingProduct._id != productID){
            return res.status(400).json({msg : "Product name or SKU is already in use"})
        }
        const product = await Product.findByIdAndUpdate(productID, updatedData)
        if(!product){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({msg : "Product updated successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Delete product by ID
exports.deleteProductByID = async (req, res) => {
    try {
        const productToDelete = await Product.findByIdAndDelete(req.params.id)
        if(!productToDelete){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({msg : "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}