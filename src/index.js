import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductProvider } from "./context/products";
import App from './App';
import './globals.css';
import { StateContext } from './context/StateContext';
import { BannerProvider } from './context/banner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContext>
  <ProductProvider>
    <BannerProvider> 
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </BannerProvider> 
  </ProductProvider>
  </StateContext>,
);
