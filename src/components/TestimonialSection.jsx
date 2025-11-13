import React from "react";
import a1 from "../assets/testi-1.png";
import a2 from "../assets/testi-2.png";
import a3 from "../assets/testi-3.png";

const items = [
  {
    id: 1,
    name: "Deo Leonasky",
    role: "Food Blogger",
    text: "Eating ice cream from Baskin Robins always brightens my day. Texture is perfect and flavors are balanced.",
    avatar: a1,
    rating: 5,
  },
  {
    id: 2,
    name: "Justin Higgus",
    role: "Designer",
    text: "Their seasonal flavors are exceptional — I love the subtle ingredients and the creamy finish.",
    avatar: a2,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Alex Nainsta",
    role: "Customer",
    text: "Perfect for parties. The cakes and tubs are always fresh and crowd-pleasing.",
    avatar: a3,
    rating: 4.8,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-[color:var(--brand-cream)] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-6xl font-[Playfair_Display] text-[color:var(--brand-deep)]">Some of our ice cream lovers</h3>
          <p className="text-sm text-gray-600 mt-2">Real reviews from our happy customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <article key={t.id} className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={`${t.name} avatar`} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-[color:var(--brand-deep)]">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
                <div className="ml-auto text-yellow-500 font-semibold" aria-hidden>
                  ★ {t.rating}
                </div>
              </div>

              <p className="mt-4 text-gray-700 flex-1">{t.text}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400">Verified buyer</div>
                <button
                  className="text-[color:var(--brand-pink)] text-sm font-semibold hover:underline"
                  onClick={() => alert(`Thanks for interest in ${t.name}'s review!`)}
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
