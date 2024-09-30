"use client";

import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/supabase/hooks/redux";
import { decrementQuantity, incrementQuantity, removeFromTheCart, clearCart } from "@/redux/cartSlice";
import Subtotal from "@/components/Subtotal";
//import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';


interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart = ({ cart, totalPrice }: { cart: Product[], totalPrice: number }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Ensure router is mounted before using it
  if (!router) {
    return null; // Handle the case when the router isn't mounted
  }

  return (
    <div className="flex flex-col lg:flex-row w-[90%] mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      {/* Cart Section */}
      <div className="lg:w-2/3">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h1 className="font-bold text-3xl">Your Shopping Cart</h1>
          <p className="font-medium text-xl">Price</p>
        </div>

        {cart.map((product: Product, index: number) => (
          <div key={index} className="flex justify-between items-center py-6 border-b border-gray-300">
            <div className="flex items-center">
              <Image src={product.image} alt={product.title} width={100} height={100} className="rounded-md shadow-md" />
              <div className="ml-6">
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-green-600 my-2 font-bold text-sm">In Stock</p>
                <h1 onClick={() => dispatch(removeFromTheCart(product.id))} className="cursor-pointer font-bold text-red-500 hover:text-red-700 transition duration-200">
                  Remove
                </h1>
                <div className="flex justify-between items-center w-[90px] bg-gray-100 rounded-md mt-3">
                  <button onClick={() => product.quantity > 1 && dispatch(decrementQuantity(product.id))} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-md">-</button>
                  <span className="px-2">{product.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(product.id))} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-md">+</button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h1 className="font-bold text-lg">${product.price.toFixed(2)}</h1>
              <p className="text-xs text-gray-500 py-1">M.R.P <span className="line-through">$3,995.00</span></p>
            </div>
          </div>
        ))}

        {/* Clear All Button (Visible on smaller screens) */}
        <div className="lg:hidden mt-6 pt-6 border-t border-gray-300">
          <h1 onClick={() => dispatch(clearCart())} className="text-red-600 font-bold cursor-pointer text-sm hover:text-red-800 transition duration-300">
            CLEAR ALL
          </h1>
        </div>
      </div>

      {/* Subtotal Section */}
      <div className="lg:w-1/3 lg:ml-8 mt-6 lg:mt-0">
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg lg:sticky lg:top-20">
          <h1 className="font-bold text-2xl mb-4">Order Summary</h1>
          <Subtotal length={cart.length} subtotal={totalPrice} />

          {/* Buy Now Button */}
          <button onClickCapture={()=>{
            router.push('/checkout');
          } } className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => console.log("Buy Now clicked")}>
            Buy Now
          </button>

          {/* Clear All Button (Visible on larger screens) */}
          <div className="mt-4 hidden lg:flex justify-end">
            <h1 onClick={() => dispatch(clearCart())} className="text-red-600 font-bold cursor-pointer text-sm hover:text-red-800 transition duration-300">
              CLEAR ALL
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
