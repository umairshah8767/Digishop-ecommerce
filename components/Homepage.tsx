"use client"; // This ensures the component runs on the client side

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
import Link from "next/link";
import Banner from "./Banner";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice'; // Import your addToCart action
import Footer from "./Footer";

const Homepage = () => {
  const dispatch = useDispatch();
  const { mensProduct, getMensClothing, womensProduct, getWomensClothing } = useSupabase();
  
  const mensRef = useRef(null);
  const womenRef = useRef(null);

  useEffect(() => {
    getMensClothing("men"); // Fetch men's products
    getWomensClothing("women"); // Fetch women's products
  }, []);

  const itemsToShow = 5; // Number of items to show at once
  const [currentIndexMen, setCurrentIndexMen] = useState(0);
  const [currentIndexWomen, setCurrentIndexWomen] = useState(0);

  const totalMenPages = Math.ceil(mensProduct.length / itemsToShow);
  const totalWomenPages = Math.ceil(womensProduct.length / itemsToShow);

  const handleNextMen = () => {
    setCurrentIndexMen((prevIndex) => (prevIndex + 1) % totalMenPages);
    mensRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrevMen = () => {
    setCurrentIndexMen((prevIndex) => (prevIndex - 1 + totalMenPages) % totalMenPages);
    mensRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextWomen = () => {
    setCurrentIndexWomen((prevIndex) => (prevIndex + 1) % totalWomenPages);
    womenRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrevWomen = () => {
    setCurrentIndexWomen((prevIndex) => (prevIndex - 1 + totalWomenPages) % totalWomenPages);
    womenRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentProductsMen = () => {
    const start = currentIndexMen * itemsToShow;
    return mensProduct.slice(start, start + itemsToShow);
  };

  const getCurrentProductsWomen = () => {
    const start = currentIndexWomen * itemsToShow;
    return womensProduct.slice(start, start + itemsToShow);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the addToCart action
    console.log("Product added to cart:", product); // For debugging
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-0">
      {/* Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <Banner />
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl font-bold mt-4 text-gray-800 text-center">Welcome to Our Store</h1>

      <div className="flex flex-col w-full max-w-7xl mt-12 space-y-8">
        {/* Men's Products Section */}
        <div ref={mensRef}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Mens Products</h2>
          <div className="relative">
            <button onClick={handlePrevMen} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-opacity duration-200 opacity-80">
              &#9664;
            </button>
            <div className="flex overflow-hidden space-x-4">
              {getCurrentProductsMen().map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-48 h-48 mb-4">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </div>
                  </Link>
                  <h3 className="mt-2 text-xl font-medium text-gray-800">{product.title}</h3>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className={index < Math.round(product.rating?.rate) ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating?.rate || 5} out of 5) - {product.rating?.count || 0} reviews
                    </span>
                  </div>
                  <button
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleAddToCart(product)} // Add to Cart functionality
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleNextMen} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-opacity duration-200 opacity-80">
              &#9654;
            </button>
          </div>
          <Link href="/men-products" className="mt-4 text-sm text-blue-600 hover:underline opacity-70 transition-opacity duration-200 hover:opacity-100">
            More Men's Products
          </Link>
        </div>

        {/* Women's Products Section */}
        <div ref={womenRef}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Women's Products</h2>
          <div className="relative">
            <button onClick={handlePrevWomen} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-opacity duration-200 opacity-80">
              &#9664;
            </button>
            <div className="flex overflow-hidden space-x-4">
              {getCurrentProductsWomen().map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-48 h-48 mb-4">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </div>
                  </Link>
                  <h3 className="mt-2 text-xl font-medium text-gray-800">{product.title}</h3>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className={index < Math.round(product.rating?.rate) ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating?.rate || 5} out of 5) - {product.rating?.count || 0} reviews
                    </span>
                  </div>
                  <button
                    className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:translate-y-1"
                    onClick={() => handleAddToCart(product)} // Add to Cart functionality
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleNextWomen} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-opacity duration-200 opacity-80">
              &#9654;
            </button>
          </div>
          <Link href="/women-products" className="mt-4 text-sm text-blue-600 hover:underline opacity-70 transition-opacity duration-200 hover:opacity-100">
            More Women's Products
          </Link>
        </div>

      </div>

    </div>
  );
};
export default Homepage;
