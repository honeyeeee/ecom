"use client";

export default function AddToCart({ product }) {
  return (
    <button
      type="button"
      className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-full border border-head text-head hover:bg-head hover:text-body transition"
      onClick={() => {
        // Cart rebuild: hook up state / API from lib/cart-legacy when ready

        // if usere loged in

      }}
    >
      Add to Cart
    </button>
  );
}
