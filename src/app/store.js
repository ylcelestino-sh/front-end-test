import { configureStore } from '@reduxjs/toolkit';
import { productAPI } from '../services/productAPI';
import { rootReducer } from './rootReducer';

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
  })
}
