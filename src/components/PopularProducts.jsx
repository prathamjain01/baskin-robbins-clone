import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Toast from "./Toast";
import { products as sampleProducts } from "../data/products";
import { useCart } from "../context/CartContext";

export default function PopularProducts({ items = sampleProducts }) {
  const { addItem } = useCart(); // requires CartProvider wrapping App
  const [active, setActive] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  function handleAdd(product, qty = 1) {
    try {
      addItem(product, qty);
      setToastVisible(true);
      // auto-hide toast is handled by Toast component
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  }

  function handleOpen(product) {
    setActive(product);
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-[color:var(--brand-deep)]">Popular products</h3>
        <a href="#" className="text-sm text-[color:var(--brand-pink)] underline">View all</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items && items.length > 0 ? (
          items.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} onOpen={handleOpen} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}
      </div>

      {/* Product detail modal */}
      <ProductModal
        product={active}
        onClose={() => setActive(null)}
        onAdd={(p, q) => { handleAdd(p, q); setActive(null); }}
      />

      {/* Toast when item is added */}
      <Toast message="Added to cart 🎉" show={toastVisible} />
    </section>
  );
}
