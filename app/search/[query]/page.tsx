"use client";
import { useSupabase } from "@/lib/supabase/hooks/useSupabase";
import { useParams } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import SearchResult from '@/components/Searchresult';

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string; // Specify the type for the image property
};

const Page = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();

  const fetchData = useCallback(() => {
    if (query) {
      getFilteredData(query.toString());
    }
  }, [query, getFilteredData]);

  useEffect(() => {
    fetchData(); 
  }, []);
  return (
    <div>
      <SearchResult filterData={filterData as Product[]} /> {/* Cast filterData to Product[] */}
    </div>
  );
};

export default Page;
