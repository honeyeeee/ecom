"use client";

/**
 * Navbar cart icon + item count badge
 * Count CartSync aur addProduct actions se update hota hai.
 */

import { ShoppingBag } from "lucide-react";
import useCartStore from "@/app/store/cartStore";

export default function CartButton() {
  const openCart = useCartStore((state) => state.openCart);
  const productsNumber = useCartStore((state) => state.productsNumber);

  return (
    <button
      type="button"
      aria-label="Open cart"
      onClick={openCart}
      className="relative hover:opacity-60 transition"
    >
      <ShoppingBag size={21} strokeWidth={1.7} />
      {productsNumber > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center">
          {productsNumber > 99 ? "99+" : productsNumber}
        </span>
      )}
    </button>
  );
}
