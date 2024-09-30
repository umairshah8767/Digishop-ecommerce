"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCartDash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import { supabase } from "@/lib/supabase/product"; // Ensure the path is correct

const itemlist = [
  "All",
  "Today's Deals",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
];

export default function Header() {
  const [query, setQuery] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const cart = useAppSelector(getCart);

  const searchHandler = () => {
    router.push(`/search/${query}`);
  };

  useEffect(() => {
    const getUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout Error:', error.message);
    } else {
      setUser(null); // Clear the user state
      router.push('/signin'); // Redirect to signin page after logout
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="top-0 left-0 w-full z-50 bg-gradient-to-r from-[#232F3E] via-[#FEBD69] to-[#f3951a] shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto py-4">
          
          {/* Logo */}
          <Link href={"/"} className="w-full md:w-auto">
            <Image
              className="cursor-pointer"
              src="/logos.png"
              alt="Logo"
              width={110}
              height={70}
            />
          </Link>

          {/* Search Bar */}
          {/* Search Bar */}
<div className="flex items-center w-full md:w-1/2 bg-white rounded-full shadow-lg mt-4 md:mt-0 transition-all duration-300 border border-orange-500 focus-within:ring-2 ring-orange-500">
  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full p-3 text-black bg-transparent outline-none placeholder-gray-500 rounded-l-full"
    type="text"
    placeholder="Search for products, brands and more..."
  />
  <button
    onClick={searchHandler}
    className="bg-[#FEBD69] p-3 cursor-pointer hover:bg-[#f3951a] rounded-r-full transition-all duration-300"
  >
    <FaSearch size={"20px"} className="text-black" />
  </button>
</div>


          {/* Account & Cart */}
          <div className="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0 space-x-6">
            
            {/* Account Section */}
            <div onClick={() => router.push('/signin')} className="text-center text-white cursor-pointer">
              <h1 className="text-sm hover:underline hover:text-[#FF8C00] transition-all duration-300">
                {`${user ? user.email : "Signin"}`}
              </h1>
              <h2 className="text-lg font-semibold hover:text-[#FF8C00] transition-all duration-300">
                Account & Lists
              </h2>
            </div>

            {/* Orders Section */}
            <div className="text-center text-white cursor-pointer">
              <h1 className="text-sm hover:text-[#FF8C00] transition-all duration-300">
                Returns
              </h1>
              <h2 className="text-lg font-semibold hover:text-[#FF8C00] transition-all duration-300">
                & Orders
              </h2>
            </div>

            {/* Cart Section */}
            <div className="relative text-white cursor-pointer">
              <Link href={"/cart"}>
                <BsCartDash size={"30px"} />
                <p className="absolute top-0 left-5 bg-red-500 rounded-full w-5 h-5 text-center text-xs">
                  {cart.length}
                </p>
              </Link>
              <Link href={"/cart"}>
                <h2 className="mt-1 hover:text-[#FF8C00] transition-all duration-300">
                  Cart
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-[#232F3E] w-full text-white py-3 flex overflow-x-auto">
        <div className="flex space-x-6 mx-auto">
          {itemlist.map((item, idx) => (
            <Link
              className="hover:text-[#f3951a] border-b-2 border-transparent hover:border-[#FF8C00] transition-all duration-300"
              href={`/${item}`}
              key={idx}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="mr-10">
          <h1 
            className="text-[#FF8C00] font-bold cursor-pointer hover:underline" 
            onClick={handleLogout}
          >
            Sign out
          </h1>
        </div>
      </div>
    </>
  );
}
