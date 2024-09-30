import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';
import Image from "next/image";
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
// Define Product interface for type safety
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const DeliveryAddress = () => {
    const cart = useAppSelector(getCart);
    const [address, setAddress] = useState<string>("Fetching location...");
    const [isUsingLiveLocation, setIsUsingLiveLocation] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetching user details
                const { data, error } = await supabase.auth.getUser();
                
                if (error) {
                    console.error("Error fetching user details: ", error);
                    setAddress("Error fetching user profile.");
                    return;
                }
        
                // Log the data to see its structure
                console.log(data);
                
                const user = data?.user;
                // Check if user exists and has metadata including the address
                if (user && user.metadata && user.metadata.address) {
                    setAddress(user.metadata.address);
                } else {
                    // Fallback to live location if no address found
                    fetchLiveLocation();
                }
            } catch (err) {
                console.error("Error in fetchUserProfile:", err);
                setAddress("Unable to fetch user profile.");
            }
        };
        
        const fetchLiveLocation = () => {
            if (navigator.geolocation) {
                setIsUsingLiveLocation(true); // Using live location
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        try {
                            // Use OpenCage API to reverse geocode the coordinates
                            const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                                params: {
                                    q: `${latitude},${longitude}`,
                                    key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY // Add this in your .env file
                                }
                            });
                            const location = res.data.results[0].formatted;
                            setAddress(location);
                        } catch (error) {
                            setAddress("Unable to retrieve address.");
                        }
                    },
                    (error) => {
                        setAddress("Location access denied.");
                    }
                );
            } else {
                setAddress("Geolocation not supported.");
            }
        };

        fetchUserProfile(); // First try to fetch the user profile
    }, []);

    return (
        <div>
            {/* Delivery Address Section */}
            <div className='border-b border-gray-300 py-2'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-lg'>1. Delivery Address</h1>
                    <p className='text-sm'>
                        {isUsingLiveLocation ? 'Using live location: ' : 'Saved address: '}
                        {address}
                        <br />
                        <span className='text-blue-500 cursor-pointer'>Add delivery instructions</span>
                    </p>
                </div>
            </div>
            
            {/* Items and Delivery Section */}
            <div className='border-b border-gray-300 py-2'>
                <div className='flex justify-between w-[50%]'>
                    <h1 className='font-bold text-lg'>2. Items and delivery</h1>
                </div>
                {cart.map((product: Product) => (
                    <div key={product.id} className='my-4'>
                        <div className='flex'>
                            {/* Product Image */}
                            <Image 
                                src={product.image} 
                                alt={product.title} 
                                width={100} 
                                height={100} 
                                className="rounded-md" 
                            />
                            <div className='ml-4'>
                                {/* Product Title and Price */}
                                <h1 className='font-bold'>{product.title}</h1>
                                <p className='text-2xl font-bold py-2'>{`$${product.price.toFixed(2)}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeliveryAddress;
