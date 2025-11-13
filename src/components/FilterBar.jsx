// src/components/FilterBar.jsx
import React, { useMemo } from "react";

export default function FilterBar({
  products,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy
}) {
  // derive categories from products
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category || "Other"));
    return ["All", ...Array.from(set)];
  }, [products]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flavours, e.g. chocolate, cake..."
            className="w-full px-4 py-2 border rounded-lg text-sm"
            aria-label="Search products"
          />
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-auto py-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c === "All" ? null : c)}
              className={`text-sm px-3 py-1 rounded-full border ${
                (selectedCategory === c || (c === "All" && !selectedCategory))
                  ? "bg-[color:var(--brand-pink)] text-white border-[color:var(--brand-pink)]"
                  : "bg-white text-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="flex items-center gap-2">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm"
            aria-label="Price filter"
          >
            <option value="any">All prices</option>
            <option value="0-199">Under ₹200</option>
            <option value="200-249">₹200 - ₹249</option>
            <option value="250-9999">₹250+</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm"
            aria-label="Sort products"
          >
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
