import { RootState } from '@/redux/store';
import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem extends Product {
  id: string;
  name: string;
  quantity: number;
  availableQuantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  searchText: string;
  totalQuantity: number;
  totalPrice: number;
  salesCount: number;
}

const initialState: CartState = {
  items: [],
  searchText: '',
  totalQuantity: 0,
  totalPrice: 0,
  salesCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      const price = product.current_price?.[0]?.NGN[0] ?? 0; // Updated price retrieval

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          ...product,
          id: product.id,
          name: product.name,
          quantity: 1,
          availableQuantity: product.available_quantity,
          price, // Use the updated price
        });
      }

      // Update total quantity and price
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(
          1,
          Math.min(action.payload.quantity, item.availableQuantity)
        );
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    updateSalesCountFromData: (state, action: PayloadAction<number>) => {
      state.salesCount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setSearchText,
  updateSalesCountFromData,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectSearchText = (state: RootState) => state.cart.searchText;
export const selectTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
