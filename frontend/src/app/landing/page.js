// home page

"use client"

import React, { useState, useEffect } from "react";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from 'next/image';


const Landing = () => {
  const [collectionIndex, setCollectionIndex] = useState(0);

  const collection = [
    {
      Image: ["beans1.jpg", "beans2.jpg", "beans3.jpg", "beans4.jpg"],
      title: "Beans",
    },
    {
      Image: ["equipment.jpg", "equipment2.jpg", "equipment3.jpg", "equipment4.jpg"],
      title: "equipment",
    },
    {
      Image: ["merchandise1.jpg", "merchandise2.jpg", "merchandise3.jpg", "merchandise4.jpg"],
      title: "merchandise",
    },
    {
      Image: ["brew1.jpg", "brew2.jpg", "brew3.jpg", "brew4.jpg"],
      title: "cold brew",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      AOS.refresh(); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCollectionIndex((prevIndex) => (prevIndex + 1) % collection[0].Image.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [collection]);
  
  

  return (
    <div className="home">
      <div className="background" style={{ backgroundImage: "url(/background3.jpg)" }} data-aos="fade-up">
        <div className="titles">
          <h1>New year</h1>
          <h2>More coffee</h2>
          <p>Plus, get 30% off your first order with code SUB30.</p>
          <button>Get started</button>
        </div>
      </div>
      <h1 className="collectionTitle" data-aos="fade-up">Explore our collection</h1>
      <div className="collection" data-aos="fade-up">
        {collection.map((item, index) => (
          <div key={index} className={item.title.toLowerCase()}>
            <div style={{ backgroundImage: `url(/${item.Image[collectionIndex]})` }}>
            <h3> {item.title} </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="guatemala" style={{ backgroundImage: "url(/brown.jpg)" }} data-aos="fade-up">
        <div className="image">
          <Image src="/Guatemala El Injerto Pacamara.jpg" alt="Guatemala El Injerto Pacamara" width={1200} height={800}/>
        </div>
        <div className="desc">
          <h1>Guatemala El Injerto Pacamara</h1>
          <p>
            This legendary coffee is renowned for its exquisite flavor, large bean size, and
            award-winning pedigree—including placing first in the prestigious Cup of Excellence seven times.
          </p>
          <button>Get pacamara</button>
        </div>
      </div>
      <div className="coldBrew" data-aos="fade-up">
        <Image src="/cold brew.jpg" alt="Cold Brew" width={1200} height={800}/>
        <div className="description">
          <h2>Plant-based Magic: Winter Cheer</h2>
          <p>
            Get it now by the carton or 12-pack. Enjoy our take on nog with warm, wintery spices, a kick
            of Stumptown Cold Brew, and Oatly oatmilk.
          </p>
          <button>Shop winter cheer</button>
        </div>
      </div>
      <div className="bear" style={{ backgroundImage: "url(/sky.jpg)" }} data-aos="fade-up">
        <div className="desc">
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
          <button><a href="/products">Show more</a></button>
        </div>
      </div>
      <div className="featuredProducts" data-aos="fade-up">
        <h1>Featured products</h1>
        <div className="products">
          <div>
            <Image src="/Ethiopia Mordecofe.jpg" alt="Ethiopia Mordecofe" width={1200} height={800}/>
            <button><a href="/products/659217f96a0ad254aeb005b4">Show product</a></button>
          </div>
          <div>
            <Image src="/Costa Rica Montes De Oro.jpg" alt="Costa Rica Montes De Oro" width={1200} height={800}/>
            <button><a href="/products/6592164b6a0ad254aeb00597">Show product</a></button>
          </div>
          <div>
            <Image src="/Indonesia Bies Penantan.jpg" alt="Indonesia Bies Penantan" width={1200} height={800}/>
            <button><a href="/products/6592b37f9229160a553b93d8">Show product</a></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
