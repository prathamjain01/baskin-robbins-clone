// src/components/FeaturedHighlights.jsx
import React from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

/**
 * FeaturedHighlights — dynamic version
 * - selects the top 3 products (by rating*reviews) as featured picks
 * - shows image, title, subtitle, price
 * - Add button adds to cart via CartContext.addItem
 * - keeps the glass-card look + hover lift
 */

function Card({ item, onAdd }) {
  return (
    <article className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-5 flex gap-4 items-center hover:shadow-xl transition-shadow transform hover:-translate-y-1">
      <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[color:var(--brand-deep)] truncate">{item.title}</div>
        <div className="text-xs text-gray-500">{item.subtitle}</div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="text-sm font-semibold text-[color:var(--brand-deep)]">₹{item.price}</div>
        <button
          onClick={() => onAdd(item)}
          className="bg-[color:var(--brand-pink)] text-white px-4 py-2 rounded-full text-sm shadow-sm hover:scale-[1.02] transition-transform"
        >
          + Add
        </button>
      </div>
    </article>
  );
}

export default function FeaturedHighlights() {
  const { addItem } = useCart();

  // pick top 3 by rating * reviews (fallback to first 3)
  const featured = React.useMemo(() => {
    try {
      return [...products]
        .sort((a, b) => (b.rating * (b.reviews || 1)) - (a.rating * (a.reviews || 1)))
        .slice(0, 3);
    } catch (e) {
      // fallback to first 3 product-like objects
      return [
        { id: "f1", title: "Featured 1", subtitle: "", price: 199, image: "/src/assets/product-choco.png" },
        { id: "f2", title: "Featured 2", subtitle: "", price: 189, image: "/src/assets/product-strawberry.png" },
        { id: "f3", title: "Featured 3", subtitle: "", price: 179, image: "/src/assets/product-vanilla.png" }
      ];
    }
  }, []);

  function handleAdd(item) {
    try {
      addItem(item, 1);
    } catch (err) {
      console.error("addItem failed", err);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[color:var(--brand-deep)]">Featured picks</h2>
        <a href="#popular" className="text-sm text-[color:var(--brand-pink)] underline">View all</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featured.map(item => (
          <Card key={item.id} item={item} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
}
