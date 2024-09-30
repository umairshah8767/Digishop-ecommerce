// pages/AllProducts.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usesupabase } from '@supabase/supabase-js'; // Import Supabase client
import Rating from '../components/shared/Ratting'; // Assuming you have a Rating component

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating?: {
    count: number;
    rate: number;
  };
};

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1); // To track the page for loading more products
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To check if more products exist

  // Fetch products from the Supabase Database
  const fetchProducts = async (page: number) => {
    setLoading(true);
    
    const itemsPerPage = 15; // 3 rows * 5 products per row

    // Fetching products from Supabase
    const { data, error } = await usesupabase
      .from('products')
      .select('*')
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      return;
    }

    if (data) {
      // Append the new products to the existing list
      setProducts((prevProducts) => [...prevProducts, ...data]);

      // If fewer than the expected number of products are returned, set hasMore to false
      if (data.length < itemsPerPage) {
        setHasMore(false);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // Load initial products when the component mounts
    fetchProducts(page);
  }, [page]);

  // Load more products when "Load More" button is clicked
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg flex flex-col items-center justify-between"
          >
            <div className="w-[150px] h-[150px] relative">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="font-bold mt-2">{product.title}</h2>
            <p className="text-lg text-[#147C8F]">${product.price}</p>
            {product.rating && (
              <Rating rating={product.rating.rate} count={product.rating.count} />
            )}
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {hasMore && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
