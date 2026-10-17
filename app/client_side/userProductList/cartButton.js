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
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-light hover:text-white transition shadow-sm"
    >
      <ShoppingBag size={19} strokeWidth={1.8} />
      {productsNumber > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-button">
          {productsNumber > 99 ? "99+" : productsNumber}
        </span>
      )}
    </button>
  );
}
