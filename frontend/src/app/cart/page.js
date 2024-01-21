"use client"

// cart page
import React, { useEffect, useState } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import Image from 'next/image';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Remove the product from the cart based on its productId
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update the quantity of a product in the cart
    const updatedCartItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const calculateItemTotal = (item) => {
    // Calculate the total price for a specific item in the cart
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    // Calculate the total price of all items in the cart
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  return (
    <>
      <Header />
      <div className="cart">
        <ul className="cartItems">
          {cartItems.map(item => (
            <li key={item._id} className='cartItem'>
              <Image src={`/${item.productImage}`} alt={item.productName}  width={100} height={100}/>
              <div className='cartInfo'>
              <p className='name'>{item.productName}</p>
              <p className="price">${item.price}</p>
              <p>
                Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                />
              </p>
              <p className='total'>Total: ${calculateItemTotal(item)}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>X</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cartSummary">
          <h2>Cart Summary</h2>
          <p>Total: <span>${calculateTotal()}</span> </p>
          <p>Delivery costs : <span>not included at this stage</span> </p>
          <p>Shipping and taxes : <span>calculated in the next step</span> </p>
          <div>
          <button> <a href='/login'>Checkout</a></button>
          <button> <a href='/products'>Keep shopping</a></button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
