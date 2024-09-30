"use client"; // Indicate that this component runs on the client side

import React from "react";
import Image from "next/image";
import prime from "../public/prime-logo.png";
import { useAppDispatch } from "@/lib/supabase/hooks/redux";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation"; 

type Product = {
  id: number;
  title: string;
  name: string;
  description: string;
  category: string;
  price: number;
  about_item?: string;
  qty: number; 
  rating?: {
    count: number;
  };
  image: string;
};

type AddToCardContainerProps = {
  product: Product;
  userLocation: string; // Prop for user's location
};

const AddToCardContainer: React.FC<AddToCardContainerProps> = ({ product, userLocation }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="border border-gray-300 rounded-md mt-10 ml-4 h-fit text-sm w-150">
      <div className="p-4">
        <div className="p-4">
          <Image src={prime} width={40} height={40} alt={"prime"} />
        </div>
        <h1>
          <span className="text-[#147C8F]">FREE Delivery</span> Thursday 22 Jan{" "}
          <span className="text-[#147C8F]">Details</span>
        </h1>
        <h1 className="mt-4">
          $291.37 Shipping & Import Charges to Pakistan Details{" "}
        </h1>
        <h1 className="text-[#147C8F] my-2">Delivery to {userLocation}</h1> {/* Dynamic delivery location */}
        <button
  onClick={() => {
    // Ensure qty is set to 1 when adding to cart
    dispatch(addToCart({ ...product, qty: 1 }));
    router.push("/cart");
  }}
  className="addtocart bg-[#FFD814] w-full rounded-full py-2"
>
  Add to Cart
</button>
        <button className="addtocart bg-[#FFA14C] w-full rounded-full py-1 my-2">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCardContainer;
