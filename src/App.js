import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider } from '@chakra-ui/react'
import MainContainer from './layout/MainContainer';
import Products from './features/product/Product';
import ProductDetails from './features/product/ProductDetails';

function App() {
  return (
  <Provider store={store}>
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
