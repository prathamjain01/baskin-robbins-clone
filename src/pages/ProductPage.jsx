import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Product not found 😢</h2>
        <Link to="/" className="mt-4 text-[color:var(--brand-pink)] underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Link to="/" className="text-[color:var(--brand-pink)] underline">← Back</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div className="flex items-center justify-center">
          <img src={product.image} alt={product.title} className="w-80 h-80 object-contain" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 mt-3">{product.subtitle}</p>
          <p className="mt-6 text-xl font-bold">₹{product.price}</p>
          <button
            onClick={() => addItem(product)}
            className="mt-8 bg-[color:var(--brand-pink)] text-white px-6 py-3 rounded-full shadow"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
