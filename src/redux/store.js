import {  configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./reducer";


const store = configureStore({
    reducer: {
        cart: CartReducer,
    },
});


export default store;