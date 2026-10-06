"use client";

/**
 * Add to Cart (product grid) — abhi placeholder
 * Expected flow: logged-in → POST `lib/cart-legacy/client/cartApi.addToCart`
 * → refresh/revalidate ya store update → CartSync jaisa sync
 */

export default function AddToCart({ product }) {
  return (
    <button
      type="button"
      className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-full border border-head text-head hover:bg-head hover:text-body transition"
      onClick={() => {
        // TODO: product._id + quantity API; guest → login redirect ya local cart
        void product;
      }}
    >
      Add to Cart
    </button>
  );
}
