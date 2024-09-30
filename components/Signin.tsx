//import SigninPage from '@/app/signin/page'
"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabase/product";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Signin = () => {
  return (
    <div className="absolute w-full top-0 bg-white py-12">
        <div className="w-[24%] m-auto">
           <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
    </div>
  );
};

export default Signin;
