import { create } from "zustand";

/** UI-only cart shell — no API calls. Wire `lib/cart-legacy/client/cartApi.js` when rebuilding. */
const productlist = create((set) => ({
  cartItems: [],
  subtotal: 0,
  productsNumber: 0,
  cartOpen: false,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}));

export default productlist;
