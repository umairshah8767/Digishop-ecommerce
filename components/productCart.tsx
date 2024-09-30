"use client"; // یہ شامل کریں

import React from "react";
import Image from "next/image";
import starIcon from "../public/star-icon.png"; // Make sure the path is correct
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating?: {
    count: number;
  }; // Optional rating
  image: string;
};

type ProductCartProps = {
  product: Product;
};

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
      >
        <div className="flex items-center justify-center rounded-md bg-gray-100 h-[250px] overflow-hidden">
          <Image
            className="mix-blend-multiply p-7"
            src={product.image || "/path/to/default/image.jpg"}
            alt={product.title}
            width={200}
            height={300}
          />
        </div>

        <h1 className="font-bold">{product.title}</h1>
        <p>{`${product.description.substring(0, 50)}...`}</p>

        {/* Rating render */}
        {product.rating && (
          <div>
            <div className="flex items-center">
              {/* Limit stars to a maximum of 5 */}
              {Array(Math.min(product.rating.count, 5))
                .fill(0)
                .map((_, index) => (
                  <Image
                    key={index}
                    src={starIcon}
                    width={20}
                    height={20}
                    alt="star"
                  />
                ))}
              <p className="ml-2 text-sm/[15px] text-[#007185]">{product.rating.count} ratings</p>
            </div>
          </div>
        )}

        <p className="font-bold text-2xl">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCart;
