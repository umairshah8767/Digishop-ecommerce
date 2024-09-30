// import React, { useState } from 'react';
// import { AiOutlineCheckCircle } from 'react-icons/ai';

// interface ProccedToBuyProps {
//   length: number;
//   totalPrice: number;
// }

// const ProccedToBuy: React.FC<ProccedToBuyProps> = ({ length, totalPrice }) => {
//   const [isFreeDeliverySelected, setIsFreeDeliverySelected] = useState(false);

//   // Toggle function for the checkbox
//   const handleCheckboxChange = () => {
//     setIsFreeDeliverySelected(!isFreeDeliverySelected);
//   };

//   return (
//     <div className="w-[300px] border border-gray-200 shadow-lg rounded-lg p-6 bg-white ml-4 fixed top-20 mt-10 right-10">
//       {/* Free Delivery Section */}
//       {length >= 5 && ( // Show only if there are 5 or more items
//         <div className="flex items-center p-4 bg-green-50 rounded-md">
//           <input
//             type="checkbox"
//             checked={isFreeDeliverySelected}
//             onChange={handleCheckboxChange}
//             className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
//           />
//           <label className="ml-2 text-green-600 font-semibold">
//             Your order is eligible for Free Delivery. Choose this option at checkout.
//           </label>
//         </div>
//       )}

//       {/* Items in Cart and Total Price */}
//       <div className="mt-4">
//         <h1 className="text-lg font-semibold">
//           Items in Cart: <span className="text-blue-600">{length}</span>
//         </h1>
//         <h2 className="text-lg font-bold text-gray-800 mt-2">
//           Total Price: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
//         </h2>
//       </div>

//       {/* Buttons */}
//       <button className="bg-[#faaa20] hover:bg-[#ff2e2e] text-white font-bold px-4 py-2 mt-6 w-full rounded-md transition-colors duration-300">
//         Proceed to Buy
//       </button>

//       <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 mt-4 w-full rounded-md transition-colors duration-300">
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default ProccedToBuy;
import React from 'react'

const ProccedToBuy = () => {
  return (
    <div></div>
  )
}

export default ProccedToBuy