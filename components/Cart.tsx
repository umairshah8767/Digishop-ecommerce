// pages/cart.tsx
"use client"; // Ensures the component runs on the client side

import React from 'react';
import ShoppingCart from '@/components/ShoppingCart'; // Correct import path
import ProccedToBuy from './ProccedToBuy';
import { useSelector } from 'react-redux';  // Import useSelector to get the cart from Redux
import { getCart } from '@/redux/cartSlice'; // Import the selector for the cart

const Cart = () => {
  const cart = useSelector(getCart);  // Get the cart from Redux
  
  // Calculate total price (subtotal)
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className='w-[80%] mx-auto mt-10'>
      <div className='flex w-full justify-between'>
        {/* Pass cart and totalPrice to ShoppingCart */}
        <ShoppingCart cart={cart} totalPrice={totalPrice} />
        
        {/* Pass cart length and totalPrice to ProccedToBuy */}
        <ProccedToBuy length={cart.length} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Cart;
