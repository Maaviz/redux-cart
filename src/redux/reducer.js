import { createReducer } from "@reduxjs/toolkit";

export const CartReducer = createReducer(
  {
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
      },
      
      decrement: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
          if (item.quantity > 1) {
              state.cartItems.forEach((i) => {
                  if (i.id === item.id) i.quantity -= 1;
              })
          }
      },

      deleteFromCart: (state, action) =>{
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      },
      calculatePrice: (state) => {
          let sum = 0;
          state.cartItems.forEach((i) => (sum += i.price * i.quantity));
          state.subtotal = sum;
          state.shipping = state.shipping > 1000 ? 0 : 200;
          state.tax = +(state.subtotal * 0.18).toFixed();
          state.total = state.subtotal + state.tax + state.shipping;
      }
  }
);
