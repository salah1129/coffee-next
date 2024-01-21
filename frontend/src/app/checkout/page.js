// checkout page

"use client"
import React, { useState, useEffect } from "react";
import "./checkout.css";
import Header from "../header/page";
import Footer from "../footer/page";
import Image from 'next/image';


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    creditCard: "",
    expiryDate: "",
    cvv: "",
    phoneNumber: "",
    country: "",
    shippingMethod: "",
    couponCode: "",
    termsAndConditions: false,
  });

  const [orderStatus, setOrderStatus] = useState(null); // 'success', 'error', or null
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const orderData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      RIB : formData.rib,
      country: formData.country,
      items: cartItems,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderStatus("success");
        setPopupMessage("Order placed successfully! Thank you for your purchase");
      } else {
        setOrderStatus("error");
        setPopupMessage("Error placing the order");
      }
    } catch (error) {
      setOrderStatus("error");
      setPopupMessage("Error: " + error.message);
    }
  };

  const closePopup = () => {
    setOrderStatus(null);
    setPopupMessage("");
  };

  return (
    <>
    <Header />
    <div className="checkout">
    <div className="cartItems">
        {cartItems.map((item) => (
          <div key={item._id} className="item">
            <div>
              <div className="img">
                <Image
                  src={`/${item.productImage}`}
                  alt={item.productName}
                  style={{ height: "80px", width: "80px" }}
                  width={100} height={100}
                />
                <p className="quantity">{item.quantity}</p>
              </div>
              <p className="productName">{item.productName}</p>
            </div>
            <p className="total">${item.quantity * item.price}</p>
          </div>
        ))}
        <div className="OverallTotal">
        <p>Overall total</p>
        <p>${cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="rib">RIB</label>
        <input
          type="text"
          id="rib"
          name="rib"
          value={formData.rib}
          onChange={handleChange}
          required
        />       

        <label htmlFor="country">Country:</label>
        <input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        
        <label>
          <input
            type="checkbox"
            id="termsAndConditions"
            name="termsAndConditions"
            checked={formData.termsAndConditions}
            onChange={handleChange}
            required
          />
          I agree to the terms and conditions
        </label>
        <div>
        <button type="submit">Place Order</button>
        <button><a href="/cart">Return to cart</a></button>
        </div>
        
      </form>
    </div>
      {orderStatus && (
        <div className={`popup ${orderStatus}`} onClick={closePopup}>
          <p>{popupMessage}</p>
        </div>
      )}
    <Footer />
    </>
    
  );
};

export default Checkout;



