"use client"


// product details


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";
import Image from 'next/image';

import "./details.css";

const ProductDetails = ({ params }) => {
  const [products, setProducts] = useState([]);
  const productId = params.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProduct = products.find(product => product._id === productId);

  const handleAddToCart = () => {
    // Retrieve existing cart items from localStorage
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCartItems.some(item => item._id === productId);

    if (!isProductInCart) {
      // Add the product to the cart
      const updatedCartItems = [...existingCartItems, filteredProduct];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      alert('Product added to cart!');
    } else {
      alert('Product is already in the cart!');
    }
  };

  return (
    <>
      <Header />
      <div className="product" style={{ backgroundColor: filteredProduct?.color }}>
        {filteredProduct ? (
          <div className="product-item" >
            <Image src={`/${filteredProduct.productImage}`} alt={filteredProduct.productName} width={100} height={100}/>
            <div className="details">
              <h2>{filteredProduct.productName}</h2>
              <p className="price">${filteredProduct.price}</p>
              <p>{filteredProduct.descriptions}</p>
              <button className='addToCart' onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

