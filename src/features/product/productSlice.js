import { createSlice } from "@reduxjs/toolkit";
import { productAPI } from "../../services/productAPI";

const initialState = {
    isAddingToCart: false,
    countProductInCart: 0
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
      builder
      .addMatcher(productAPI.endpoints.addProductToCart.matchPending, (state) => {
        state.isAddingToCart = true;
      })
      .addMatcher(productAPI.endpoints.addProductToCart.matchFulfilled, (state, {payload}) =>{
        state.isAddingToCart = false,
        state.countProductInCart+= payload.count;
      });

    },
  });
  
export default productSlice.reducer;
