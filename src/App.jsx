import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularProducts from "./components/PopularProducts";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[color:var(--brand-cream)] text-[color:var(--brand-deep)]">
        <Header />
        <main>
          <Hero />
          <PopularProducts />
          <TestimonialSection />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
