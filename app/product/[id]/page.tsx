"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import SingleProduct from '@/components/SingleProduct'; // Ensure this path is correct
import { useParams } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/hooks/useSupabase';
import 'animate.css';



const Page = () => {
  const { id } = useParams(); // Get the product id from the URL parameters
  const {  getSingleProduct } = useSupabase();
  const [productData, setProductData] = useState(null); // Add local state for product data
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          console.log(`Fetching product with ID: ${id}`);
          const data = await getSingleProduct(Number(id)); // Ensure this is awaited
          if (data) {
            console.log('Data received:', data); // Check if correct data is received
            setProductData(data); // Set the product data to state
          } else {
            console.error('No data found for this product.');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false); // Hide loading after data fetch
        }
      }
    };

    fetchProduct();
  }, [id, getSingleProduct]); // Properly handle dependencies

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (!productData) {
    return <div>No product found.</div>; // Handle case when no data is found
  }

  return (
    <div className='flex max-lg:2 '>
      {/* Pass the product data to the SingleProduct component */}
      <SingleProduct product={productData} /> 
     
    </div>
  );
};

export default Page;
