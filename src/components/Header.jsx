import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart, setIsOpen } = useCart();
  const totalItems = Array.isArray(cart)
    ? cart.reduce((s, i) => s + (i.qty || 0), 0)
    : 0;

  const [bump, setBump] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);

  useEffect(() => {
    if (prevCount === totalItems) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 420);
    setPrevCount(totalItems);
    return () => clearTimeout(t);
  }, [totalItems, prevCount]);

  return (
    <header className="w-full top-6 left-0 z-60 pointer-events-auto fixed">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="mx-auto w-full md:w-auto bg-white/95 backdrop-blur-sm
                     rounded-full px-4 md:px-8 py-3 flex items-center justify-between
                     shadow-[0_6px_30px_rgba(15,15,15,0.08)]"
          style={{ maxWidth: 1200 }}
        >
          {/* nav left */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link
              to="/shop"
              className="hover:text-[color:var(--brand-pink)] uppercase tracking-wide"
            >
              Shop
            </Link>
            <Link
              to="/"
              className="hover:text-[color:var(--brand-pink)] uppercase tracking-wide"
            >
              Home
            </Link>
            <a className="hover:text-[color:var(--brand-pink)] uppercase tracking-wide">
              Flavours
            </a>
            <a className="hover:text-[color:var(--brand-pink)] uppercase tracking-wide">
              Cakes
            </a>
          </nav>

          {/* logo center */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link to="/">
              <img src={logo} alt="Baskin Robbins" className="h-10 md:h-12" />
            </Link>
          </div>

          {/* right section */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex items-center justify-center
                         w-9 h-9 rounded-full hover:bg-[color:var(--brand-cream)]
                         transition"
            >
              🔍
            </button>

            <button
              aria-label="Cart"
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center
                         w-10 h-10 rounded-full bg-[color:var(--brand-deep)]
                         text-white"
            >
              🛒
              {totalItems > 0 && (
                <span
                  aria-live="polite"
                  className={`absolute -top-1 -right-1 bg-[color:var(--brand-pink)]
                    text-white text-xs font-semibold rounded-full px-1.5 transform origin-center
                    ${bump ? "badge-bump" : ""}`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
