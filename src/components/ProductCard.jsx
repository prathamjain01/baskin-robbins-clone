// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden group">
      <div className="relative aspect-square w-full bg-[color:var(--brand-cream)] flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain hero-img"
          loading="lazy"
        />
        <button
          onClick={() => onAdd && onAdd(product)}
          className="absolute right-3 top-3 bg-[color:var(--brand-deep)] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform scale-95 group-hover:scale-100 transition"
          aria-label={`Add ${product.title} to cart`}
        >
          + 
        </button>
      </div>

      <div className="p-4">
        <h4 className="text-[color:var(--brand-deep)] font-semibold">{product.title}</h4>
        <p className="text-sm text-gray-500">{product.subtitle}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">₹{product.price}</span>
            <span className="text-xs text-gray-400">/ tub</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <span aria-hidden>★</span>
            <span className="text-xs text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </div>
    </article>
  );
}
