import React from "react";
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-white pt-12 pb-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <img src={logo} alt="Baskin Robbins logo" className="h-10" />
          <p className="text-sm text-gray-600 max-w-xs">
            Baskin Robbins — bringing you 31 flavors of happiness. Visit our stores or order online.
          </p>
          <div className="text-xs text-gray-400">© {new Date().getFullYear()} Baskin Robbins</div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-[color:var(--brand-deep)] mb-3">Shop</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">Flavours</a></li>
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">Cakes</a></li>
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">Offers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-[color:var(--brand-deep)] mb-3">Support</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">Contact us</a></li>
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">FAQ</a></li>
            <li><a href="#" className="hover:text-[color:var(--brand-pink)]">Store locator</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-[color:var(--brand-deep)] mb-3">Join our newsletter</h4>
          <p className="text-sm text-gray-600 mb-3">Get exclusive offers and new flavor alerts.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed — thank you!"); }} className="flex gap-2">
            <input aria-label="Email" type="email" required placeholder="you@email.com" className="flex-1 px-3 py-2 border rounded-full text-sm" />
            <button className="px-4 py-2 rounded-full bg-[color:var(--brand-pink)] text-white text-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 text-xs text-gray-400 flex flex-col md:flex-row md:justify-between gap-4">
        <div>Terms · Privacy · Cookies</div>
        <div>Made with ❤️</div>
      </div>
    </footer>
  );
}
