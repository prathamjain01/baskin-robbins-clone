// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("bb_cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("bb_cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen]);

  function addItem(product, qty = 1) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    setIsOpen(true);
  }

  function removeItem(productId) {
    setCart(prev => prev.filter(i => i.id !== productId));
  }

  function updateQty(productId, qty) {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setCart(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);

  const value = {
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    isOpen,
    setIsOpen
  };

  // debug handle — inspect from browser console: console.log(window.__cart_debug)
  if (typeof window !== "undefined") window.__cart_debug = value;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
