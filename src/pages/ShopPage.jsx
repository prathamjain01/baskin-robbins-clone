// src/pages/ShopPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products as allProductsRaw } from "../data/products"; // if this fails, we fallback below
import { useCart } from "../context/CartContext";

/* Local debounce hook (self-contained) */
function useDebounceLocal(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* Safe fallback if products import fails */
const demoFallback = [
  { id: "d1", title: "Demo Chocolate", subtitle: "Demo", price: 199, image: "/src/assets/product-choco.png", rating: 4.5, reviews: 10, category: "Classic", tags: ["choc"], createdAt: "2025-01-01" },
  { id: "d2", title: "Demo Strawberry", subtitle: "Demo", price: 189, image: "/src/assets/product-strawberry.png", rating: 4.4, reviews: 8, category: "Classic", tags: ["fruit"], createdAt: "2025-02-01" },
  { id: "d3", title: "Demo Vanilla", subtitle: "Demo", price: 179, image: "/src/assets/product-vanilla.png", rating: 4.3, reviews: 6, category: "Premium", tags: ["vanilla"], createdAt: "2025-03-01" }
];

export default function ShopPage() {
  const { addItem } = useCart();
  const allProducts = Array.isArray(allProductsRaw) && allProductsRaw.length ? allProductsRaw : demoFallback;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState("any");
  const [sortBy, setSortBy] = useState("popular");
  const [activeProduct, setActiveProduct] = useState(null);

  const debouncedSearch = useDebounceLocal(search, 300);

  const categories = useMemo(() => ["All", ...Array.from(new Set(allProducts.map(p => p.category || "Other")))], [allProducts]);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (category && category !== "All") {
      list = list.filter(p => p.category === category);
    }

    if (debouncedSearch && debouncedSearch.trim() !== "") {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter(p =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.subtitle || "").toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (priceFilter && priceFilter !== "any") {
      const [min, max] = priceFilter.split("-").map(Number);
      list = list.filter(p => p.price >= (min || 0) && p.price <= (max || Number.MAX_SAFE_INTEGER));
    }

    if (sortBy === "price-asc") list.sort((a,b)=>a.price-b.price);
    else if (sortBy === "price-desc") list.sort((a,b)=>b.price-a.price);
    else if (sortBy === "rating-desc") list.sort((a,b)=>b.rating - a.rating);
    else if (sortBy === "newest") list.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    else list.sort((a,b)=>(b.rating*b.reviews) - (a.rating*a.reviews));

    return list;
  }, [allProducts, category, debouncedSearch, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[color:var(--brand-cream)] text-[color:var(--brand-deep)] py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-[Playfair_Display]">Shop all flavours</h1>
          <div>
            <Link to="/" className="text-sm text-[color:var(--brand-pink)] underline">Back to home</Link>
          </div>
        </div>

        {/* Filter row */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flavours, e.g. chocolate, cake..."
            className="w-full md:flex-1 px-4 py-2 border rounded-lg text-sm"
          />

          <div className="flex items-center gap-2 overflow-auto py-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c === "All" ? null : c)}
                className={`text-sm px-3 py-1 rounded-full border ${
                  (category === c || (c === "All" && !category))
                    ? "bg-[color:var(--brand-pink)] text-white border-[color:var(--brand-pink)]"
                    : "bg-white text-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <select value={priceFilter} onChange={(e)=>setPriceFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
            <option value="any">All prices</option>
            <option value="0-199">Under ₹200</option>
            <option value="200-249">₹200 - ₹249</option>
            <option value="250-9999">₹250+</option>
          </select>

          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">No products match your filters.</div>
          ) : (
            filtered.map(p => (
              <article key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="relative aspect-square w-full bg-[color:var(--brand-cream)] flex items-center justify-center p-6">
                  <img src={p.image} alt={p.title} className="max-w-full max-h-full object-contain cursor-pointer" />
                </div>
                <div className="p-4">
                  <h4 className="text-[color:var(--brand-deep)] font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">₹{p.price}</span>
                      <span className="text-xs text-gray-400">/ tub</span>
                    </div>
                    <div>
                      <button
                        onClick={() => addItem(p, 1)}
                        className="bg-[color:var(--brand-deep)] text-white px-3 py-2 rounded-full"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">Showing {filtered.length} product(s)</div>
      </div>
    </div>
  );
}
