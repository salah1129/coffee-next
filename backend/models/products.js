const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    descriptions: { type: String, required: true }, 
    price: { type: Number, required: true },
    images: [{ type: String}],
    color: {type: String}
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;