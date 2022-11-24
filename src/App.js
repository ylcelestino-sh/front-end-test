import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { ChakraProvider } from '@chakra-ui/react'
import MainContainer from './layout/MainContainer';
import ProductDetails from './features/product/product_details/ProductDetails';
import Products from './features/product/product_list/Product';

function App() {
  return (
  <Provider store={setupStore()}>
  <ChakraProvider>
    <Router>
      <Routes>
        <Route element={
          <MainContainer>
            <Outlet />
          </MainContainer>
        } >
           <Route path="products" element={<Products />}/>
           <Route path="product/:id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  </ChakraProvider>
  </Provider>
  );
}

export default App;
