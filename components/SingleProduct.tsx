import React from "react";
import Image from "next/image";
import Rating from "./shared/Ratting"; // Ensure the correct import
import AddToCardContainer from "./AddToCardContainer";

type Product = {
  id: number;
  name: string;
  title: string;
  description: string;
  category: string;
  qty: number;
  price: number;
  about_item?: string;
  rating?: {
    count: number;
  };
  image: string;
};

type SingleProductProps = {
  product: Product;
};

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  if (!product) {
    return <div className="text-center text-red-500">No product data available.</div>;
  }

  const aboutItems = product.about_item
    ? product.about_item.split("\n").filter((item) => item.trim() !== "")
    : [];

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row gap-10 p-6 shadow-lg rounded-lg bg-white">
        {/* Product Image */}
        <div className="flex-none w-full md:w-1/3"> {/* Reduced width to make space for content */}
          {product.image ? (
            <div className="relative w-full h-[250px]"> {/* Reduced image height */}
              <Image
                className="object-contain rounded-lg"
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <span className="font-bold text-lg">No image available</span>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl text-gray-800">{product.title}</h1> {/* Larger title */}
            <p className="text-gray-600 mt-2 text-lg">{product.description}</p> {/* Slightly larger description */}
            <p className="text-gray-500 mt-1">
              Category: <span className="font-medium">{product.category}</span>
            </p>
            {product.rating ? (
              <div className="mt-3">
                <Rating rating={{ rate: product.rating.rate, count: product.rating.count }} />

              </div>
            ) : (
              <p className="text-gray-500">No rating available</p>
            )}
            <p className="font-bold text-2xl mt-4">
              Price: <span className="text-green-600">${product.price}</span> {/* Larger price */}
            </p>
          </div>

          {/* About this item section */}
          {aboutItems.length > 0 && (
            <div className="mt-5">
              <hr className="my-4 border-gray-200" />
              <h2 className="font-bold text-lg">About this item</h2>
              <ul className="list-disc pl-5 mt-2 text-gray-700">
                {aboutItems.map((paragraph, index) => (
                  <li key={index} className="mb-2">{paragraph}</li>
                ))}
              </ul>
              <hr className="my-4 border-gray-200" />
            </div>
          )}
        </div>

        {/* Add to Cart Section */}
        <AddToCardContainer product={product} userLocation="Karachi-70077" />
      </div>
    </div>
  );
};

export default SingleProduct;
