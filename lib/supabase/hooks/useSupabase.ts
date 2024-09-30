import { useState } from "react";
import { supabase } from "../product"; // Ensure this path is correct

// Product type definition
type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string; // Specify the type for the image property
};

export const useSupabase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterData, setFilterData] = useState<Product[]>([]); // Initialize as an empty array
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [mensProduct, setMensProduct] = useState<Product[]>([]);
  const [womensProduct, setWomensProduct] = useState<Product[]>([]); // Add state for women's products

  // Fetch all products
  const getDataFromSupabase = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (data) {
      setProducts(data);
      console.log("All Products:", data);
    }
    if (error) {
      console.log(error);
    }
  };

  // Fetch filtered data
  const getFilteredData = async (query: string) => {
    console.log("Search Query:", query);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${query}%`);

    if (data) {
      setFilterData(data);
      console.log("Filtered Products:", data);
    }
    if (error) {
      console.log(error);
    }
  };

  // Fetch a single product by id
  const getSingleProduct = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("products") // Ensure this matches the actual table name
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product from Supabase:", error);
        return null;
      }

      setSingleProduct(data); // Save the fetched product
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  };

  // Fetch men's clothing
  const getMensClothing = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("category", `men's clothing`);

    if (data) {
      setMensProduct(data);
    }
    if (error) {
      console.log(error);
    }
  };

  // Fetch women's clothing
  const getWomensClothing = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("category", `women's clothing`);

    if (data) {
      setWomensProduct(data);
    }
    if (error) {
      console.log(error);
    }
  };
  

  return {
    products,
    getDataFromSupabase,
    filterData,
    getFilteredData,
    singleProduct,
    getSingleProduct,
    mensProduct,
    getMensClothing,
    womensProduct, // Ensure you return womensProduct
    getWomensClothing // Ensure you return getWomensClothing
  };
};
