import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // If the item is already in the cart, increase the quantity; otherwise, add the item to the cart with quantity = 1
    additem: (state, action) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1; // Increment the quantity
      } else {
        state.push(action.payload); // Add item with quantity = 1
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // Decrease the quantity by one
    deleteitem: (state, action) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity =state[itemIndex].quantity- 1;
        } else {
          // Remove the item from the cart if the quantity reaches zero
          state.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { additem, remove, deleteitem } = cartSlice.actions;
export default cartSlice.reducer;
