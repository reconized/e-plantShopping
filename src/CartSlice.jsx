import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.name !== item.name);
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((cartItem) => cartItem.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity === 0) {
          state.items = state.items.filter((cartItem) => cartItem.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
