// src/components/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items = [], onAdd, onOpen }) {
  if (!items || items.length === 0) {
    return <div className="text-center text-gray-500 py-20">No products match your filters.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
      ))}
    </div>
  );
}
