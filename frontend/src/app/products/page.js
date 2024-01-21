// products page

"use client";
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import './products.css';
import Link from 'next/link';
import Image from 'next/image';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("beans");

    useEffect(() => {
        // Fetch data from your API
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    return (
        <div>
            <Header />
            <div className="products">
                <div className="productsNav">
                <ul>
                    <li onClick={() => handleCategoryClick('beans')} className={selectedCategory === 'beans' ? 'selectedCategory' : ''}>Beans</li>
                    <li onClick={() => handleCategoryClick('equipment')} className={selectedCategory === 'equipment' ? 'selectedCategory' : ''}>Equipment</li>
                    <li onClick={() => handleCategoryClick('merchandise')} className={selectedCategory === 'merchandise' ? 'selectedCategory' : ''}>Merchandise</li>
                    {/* <li onClick={() => handleCategoryClick('accessories')} className={selectedCategory === 'cold brew' ? 'selectedCategory' : ''}>Cold brew</li> */}
                </ul>
                    <div className="filter">filter +</div>
                </div>
                <div className="cards">
                    {filteredProducts.map((product) => (
                        <Link href={`/products/${product._id}`} key={product._id}>
                        <div key={product._id} className="card">
                            <Image src={`/${product.productImage}`} alt={product.productName} width={100} height={100}/>
                            <div className='productInfo'>
                                <h3>{product.productName} <span>${product.price}</span></h3>
                                <p className='showDetails'>Show details</p>
                            </div>
                        </div>
                        </Link>
                        
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;


