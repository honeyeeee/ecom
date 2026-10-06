"use client";

/**
 * Navbar cart icon + item count badge
 * Count `productList.productsNumber` se aata hai (CartSync / cartProduct se update)
 */

import { ShoppingBag } from "lucide-react";
import productlist from "@/app/store/cartSection/productList";

export default function CartButton() {
  const openCart = productlist((state) => state.openCart);
  const productsNumber = productlist((state) => state.productsNumber);

  return (
    <button
      type="button"
      aria-label="Open cart"
      onClick={() => openCart()} // `cartDrawer.js` — cartOpen true
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
