import React from "react";

function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 text-xl">✕</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-56 h-56 object-contain"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{product.subtitle}</p>

            <div className="mt-4 text-lg font-semibold">₹{product.price}</div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => onAdd(product, 1)}
                className="bg-[color:var(--brand-pink)] text-white px-4 py-2 rounded-full"
              >
                Add to cart
              </button>

              <button onClick={onClose} className="px-4 py-2 rounded-full border">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
