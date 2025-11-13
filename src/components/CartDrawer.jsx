// src/components/CartDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQty, removeItem, subtotal, clearCart } = useCart();
  const drawerRef = useRef(null);

  // local state to handle animating additions and removals
  const [newlyAddedIds, setNewlyAddedIds] = useState(new Set());
  const [removingIds, setRemovingIds] = useState(new Set());
  const prevCartRef = useRef([]);

  // detect newly added items (compare prevCart and current cart)
  useEffect(() => {
    const prev = prevCartRef.current || [];
    const prevIds = new Set(prev.map(i => i.id));
    const added = cart.filter(i => !prevIds.has(i.id)).map(i => i.id);
    if (added.length) {
      setNewlyAddedIds(prev => {
        const next = new Set(prev);
        added.forEach(id => next.add(id));
        return next;
      });
      // remove the "highlight" after animation (800ms)
      const t = setTimeout(() => {
        setNewlyAddedIds(prev => {
          const next = new Set(prev);
          added.forEach(id => next.delete(id));
          return next;
        });
      }, 900);
      return () => clearTimeout(t);
    }
    prevCartRef.current = cart;
  }, [cart]);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  // focus trap basic
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;
    const container = drawerRef.current;
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    function handleTab(e) {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Handles animated remove: mark removing then call removeItem after timeout
  function handleRemoveWithAnimation(id) {
    setRemovingIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // wait for CSS animation (~350ms) then remove from cart
    setTimeout(() => {
      setRemovingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      removeItem(id);
    }, 350);
  }

  // Order summary calculations
  const TAX_RATE = 0.05; // 5% tax for demo
  const SHIPPING_THRESHOLD = 500; // free shipping if subtotal >= threshold
  const SHIPPING_FLAT = 50; // shipping fee otherwise

  const tax = Math.round(subtotal * TAX_RATE);
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const total = subtotal + tax + shipping;

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!isOpen}
      />

      {/* drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full md:w-[480px] bg-white shadow-2xl flex flex-col`}
      >
        {/* header */}
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { clearCart(); }}
              className="text-sm text-gray-500 hidden sm:inline"
              aria-label="Clear cart"
            >
              Clear
            </button>
            <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="text-2xl leading-none">
              ✕
            </button>
          </div>
        </div>

        {/* content area with internal scroll */}
        <div className="flex-1 overflow-auto p-5" style={{ WebkitOverflowScrolling: "touch" }}>
          {(!cart || cart.length === 0) ? (
            <div className="text-center text-gray-500 py-20">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => {
                const isNew = newlyAddedIds.has(item.id);
                const isRemoving = removingIds.has(item.id);
                return (
                  <li
                    key={item.id}
                    className={`flex items-start gap-4 cart-item transition-all duration-300 ${
                      isNew ? "cart-item-just-added" : ""
                    } ${isRemoving ? "cart-item-removing" : ""}`}
                    aria-live="polite"
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <div className="font-medium text-[color:var(--brand-deep)] truncate">{item.title}</div>
                        <div className="ml-auto text-sm text-gray-600">₹{item.price * item.qty}</div>
                      </div>

                      <div className="text-sm text-gray-500 truncate">{item.subtitle || ""}</div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-2 py-1 rounded border"
                          aria-label={`Decrease quantity for ${item.title}`}
                        >
                          -
                        </button>

                        <div className="px-3 py-1 border rounded text-sm">{item.qty}</div>

                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-2 py-1 rounded border"
                          aria-label={`Increase quantity for ${item.title}`}
                        >
                          +
                        </button>

                        <button onClick={() => handleRemoveWithAnimation(item.id)} className="ml-auto text-xs text-red-500">Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* compact order summary */}
        <div className="p-5 border-t bg-white sticky bottom-0">
          <div className="mb-3 text-sm text-gray-600">Order summary</div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>Subtotal</div>
            <div>₹{subtotal}</div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>Tax (5%)</div>
            <div>₹{tax}</div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
            <div>Shipping</div>
            <div className={`${shipping === 0 ? "text-green-600" : ""}`}>{shipping === 0 ? "Free" : `₹${shipping}`}</div>
          </div>

          <div className="flex items-center justify-between font-semibold text-lg mb-3">
            <div>Total</div>
            <div>₹{total}</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { alert("Demo checkout — integrate gateway to complete."); clearCart(); setIsOpen(false); }}
              className="flex-1 bg-[color:var(--brand-pink)] text-white px-4 py-3 rounded-full"
            >
              Checkout
            </button>

            <button onClick={() => clearCart()} className="px-4 py-3 rounded-full border">
              Clear
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
