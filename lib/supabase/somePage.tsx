"use client";
// pages/somePage.tsx
import SingleProduct from '@/components/SingleProduct';

const SomePage = () => {
    const product = {
      id: 1,
      title: "Example Product",
      name: "Example Name",
      description: "This is a description of the product.",
      category: "Example Category",
      price: 29.99,
      qty: 1,
      image: "/path/to/image.jpg",
      rating: {
        count: 10,
      },
    };
  
    return <SingleProduct product={product} />;
  };
  
  export default SomePage;
  
