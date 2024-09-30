import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import axios from "axios";
import { supabase } from '@/lib/supabase/product';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const OrderSummary = ({ totalPrice }: { totalPrice: number }) => {
  const cart = useAppSelector(getCart);

  const createStripeSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const stripe = await stripePromise;

      const checkoutSession = await axios.post("/api/checkout-sessions", {
        items: cart,
        email: user?.email,
      });

      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-5 mt-5'>
      <h1 className='font-bold text-2xl text-center mb-5'>Order Summary</h1>
      <div className='text-sm'>
        <div className='flex items-center justify-between py-2'>
          <p>Items</p>
          <p>₹749.00</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p>Delivery:</p>
          <p>₹40.00</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p>Total:</p>
          <p>₹789.00</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p>Promotion Applied:</p>
          <p className='text-red-500'>-₹40.00</p>
        </div>
        <div className='flex justify-between text-xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-1'>
          <h1>Order Total:</h1>
          <h1>${totalPrice.toFixed(2)}</h1> {/* Ensure 2 decimal places */}
        </div>
      </div>
      <button 
        onClick={createStripeSession} 
        className='bg-[#ff9800] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#ffa726] hover:shadow-lg'>
                    Proceed to Payment
      </button>
      
    </div>
  );
};

export default OrderSummary;
