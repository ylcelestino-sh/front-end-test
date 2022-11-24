import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import { productAPI } from "../services/productAPI";

export const rootReducer = combineReducers({
  product: productReducer,
  [productAPI.reducerPath]: productAPI.reducer,
});
