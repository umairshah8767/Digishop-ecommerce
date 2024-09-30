import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index"; // Ensure correct path for your store file

interface Product {
  id: number;
  name: string;
  price: number;
  qty: number; 
  quantity: number; // Corrected spelling
}

interface CartState {
  cart: Product[]; 
}

const initialState: CartState = {
  cart: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromTheCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    clearCart: (state) => {
      state.cart = []; 
    },
  },
});

// Export actions
export const { 
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeFromTheCart
} = cartSlice.actions;

export const getCart = (state: RootState) => state.cart.cart; // Selector

export default cartSlice.reducer;
