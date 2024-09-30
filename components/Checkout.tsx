"use client";
import React from 'react';
import { FaLock } from "react-icons/fa6";
import Image from "next/image";
import OrderSummary from './OrderSummary';
import DeliveryAddress from './DeliveryAddress';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';

const Checkout = () => {
    const cart = useAppSelector(getCart);
    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice += item.price * item.quantity;
    });

    return (
        <div className='absolute top-0 w-full p-10 bg-[#fffbf0] transition-all duration-300'> {/* Light orange background */}
            <div className='flex w-[70%] mx-auto items-center border-b border-[#ffb74d] pb-5 justify-between'> {/* Orange border */}
                <div>
                    <Image src={'/logos.png'} alt={"logo"} width={150} height={150} />
                </div>
                <div>
                    <h1 className='font-bold text-2xl text-[#ff5722]'>Checkout</h1> {/* Darker orange for title */}
                </div>
                <div className='text-[#ff9800] hover:text-[#ffa726] transition duration-300'> {/* Hover effect for icon */}
                    <FaLock size={"30px"} />
                </div>
            </div>
            <div className='flex justify-between w-[70%] mx-auto mt-5'> {/* Margin for spacing */}
                <DeliveryAddress />
                <OrderSummary totalPrice={totalPrice} />
            </div>
            <div className='flex justify-center mt-10'>
                <button
                    onClick={() => alert('Proceeding to payment...')}
                    className='bg-[#ff9800] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#ffa726] hover:shadow-lg'>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}

export default Checkout;
