import { StockItemResponse } from '@/types/stocks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockItemWithQuantity extends StockItemResponse {
  quantity: number; // Locally managed quantity
}

interface SalesState {
  activeItem: number | null;
  searchText: string;
  selectedItems: StockItemWithQuantity[];
  currentTime: string;
}

const initialState: SalesState = {
  activeItem: null,
  searchText: '',
  selectedItems: [],
  currentTime: new Date().toLocaleTimeString(),
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<number | null>) => {
      state.activeItem = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<StockItemResponse[]>) => {
      state.selectedItems = action.payload.map((item) => ({
        ...item,
        quantity: 1, // Initialize with default quantity
      }));
    },
    updateCurrentTime: (state) => {
      state.currentTime = new Date().toLocaleTimeString();
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.selectedItems.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity < item.available_quantity) {
        item.quantity += 1; // Increment quantity
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.selectedItems.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrement quantity
      }
    },
  },
});

export const {
  setActiveItem,
  setSearchText,
  setSelectedItems,
  updateCurrentTime,
  increaseQuantity,
  decreaseQuantity,
} = salesSlice.actions;

export default salesSlice.reducer;

export const selectActiveItem = (state: { sales: SalesState }) =>
  state.sales.activeItem;
export const selectSearchText = (state: { sales: SalesState }) =>
  state.sales.searchText;
