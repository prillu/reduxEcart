import { configureStore, createReducer } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";

const ffStore= configureStore({
    reducer: {
        productReducer : productSlice,
        wishlistReducer : wishlistSlice ,
        cartReducer : cartSlice
    }
})
export default ffStore