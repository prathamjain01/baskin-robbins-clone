import React, { useEffect, useState } from "react";

export default function Toast({ message, show, duration = 2000 }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-full bg-[color:var(--brand-deep)] text-white shadow-lg transition-all duration-500 z-50 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {message}
    </div>
  );
}
