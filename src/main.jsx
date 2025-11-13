// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import { CartProvider } from "./context/CartContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
