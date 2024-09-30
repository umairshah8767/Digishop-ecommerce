import React from 'react';

interface SubtotalProps {
  length: number;
  subtotal: number;
}

const Subtotal: React.FC<SubtotalProps> = ({ length, subtotal }) => {
  return (
    <div>
      <h1>Subtotal ({length} items): ${subtotal.toFixed(2)}</h1>
    </div>
  );
};

export default Subtotal;
