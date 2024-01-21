// Login.jsx


"use client"
import React, { useState } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 


import './login.css';

const Login = () => {
  const background = {
    backgroundImage: 'url("/background3.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      setSuccessMsg("login successful")
      setErrorMsg("")
      router.push('/checkout');

    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Login failed:', error.response.data.msg);
        setErrorMsg('Invalid email or password. Please try again.');
        setSuccessMsg("")
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <>
    <Header />
    <div className='login' style={background}>
      <div className='form'>
        <h1>Login page</h1>
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
            Login
          </button>
          {errorMsg && (
            <div >{errorMsg}</div>
          )}
          {successMsg && (
            <div>{successMsg}</div>
          )}
          <p>
            You do not have an account? <a href='/register'>Register here</a>
          </p>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
