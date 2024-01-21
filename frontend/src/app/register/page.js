"use client"

import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Header from '../header/page';
import Footer from '../footer/page';


import './register.css';

const Register = () => {
  const background = {
    backgroundImage: 'url("/background3.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password before sending it to the server
      const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the number of salt rounds

      const response = await axios.post('http://localhost:5000/users/register', {
        email: formData.email,
        password: hashedPassword,
      });

      setSuccessMessage('Registration successful!');
      setErrorMsg('');
      console.log('Registration successful:', response.data);
      // You can redirect or perform additional actions upon successful registration
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // User already exists, display an error message
        console.error('Registration failed:', error.response.data.msg);
        setSuccessMessage('');
        setErrorMsg('User already exists. Please use a different email.');
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
    <>
    <Header />
    <div className='register' style={background}>
      <div className='form'>
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          <button
            type="submit"
          >
            Register
          </button>
          {errorMsg && (
            <div>{errorMsg}</div>
          )}
          {successMessage && (
            <div>{successMessage}</div>
          )}
          <p>
            Have an account? <a href='/login'>Log in</a>
          </p>
        </form>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default Register;
