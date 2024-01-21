// Header.jsx

"use client"
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaCoffee } from 'react-icons/fa';
import "./header.css";

const Header = () => {
  const [isNavActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!isNavActive);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Coffee</a>
        < FaCoffee className="coffeIcon"/>
        </div>
      <div className={`nav ${isNavActive ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="loginCart">
        <div><FaSearch /></div>
        <div><Link href="/login"><FaUser /></Link></div>
        <div className="cartIcon">
          <Link href="/cart"><FaShoppingCart /></Link>
        </div>
      </div>
      <div className="navIcon" onClick={toggleNav}>
        <FaBars />
      </div>
    </header>
  );
}

export default Header;
