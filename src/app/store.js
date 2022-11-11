import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import { productAPI } from '../services/productAPI';

const rootReducer = combineReducers({
  product: productReducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});
