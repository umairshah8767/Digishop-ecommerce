import React from 'react';
import ProductCart from './productCart';

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating?: {
    count: number;
  }; // Optional rating property
  image: string;
};

interface SearchResultProps {
  filterData: Product[];
}

const SearchResult: React.FC<SearchResultProps> = ({ filterData }) => {
  return (
    <div className='w-[80%] mx-auto'>
      <div className='mt-10'>
        <div>
          <h1 className='font-bold text-2xl'>Results ({filterData.length})</h1>
          <p>Price and other details may vary based on product size and color</p>
          <hr className="my-4 border-gray-200"/>
        </div>
        <div className='grid grid-cols-4 gap-2'>
          {/* {
            filterData?.map((product:Product)=>{
              <div>
                <productCart product={product} />
                <div/>
            })
          } */}
          {filterData.map((product:Product) => (
            <div key={product.id}>
              <ProductCart product={product} /> 

             
            </div>
          ))}
          
        </div>
        <hr className="my-4 border-gray-200"/>
      </div>
    </div>
  );
};

export default SearchResult;
