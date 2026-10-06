import { create } from "zustand";

/**
 * GLOBAL CART STATE (Zustand) — client-side only
 * -----------------------------------------------
 * Consumers:
 *   - `cartSync.js`     → `cartProduct()` DB rows se bharta hai
 *   - `cartButton.js`   → badge count + drawer open
 *   - `cartDrawer.js`   → list, subtotal, slide panel
 *
 * Note: Add/remove API abhi yahan nahi; legacy routes `lib/cart-legacy/client/cartApi.js`
 */
const productlist = create((set) => ({
  // Mongo cart lines (populate ke baad shape): { _id, userId, productId, quantity }
  cartItems: [],
  subtotal: 0,
  // Navbar badge — abhi cart LINE count hai, total quantity nahi
  productsNumber: 0,
  cartOpen: false,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),

  /**
   * Cart data set + subtotal calculate
   * @param {Array} product — `getCartFromDb` / CartSync se aata hai
   */
  cartProduct: (product) => {
    if (!product || product.length === 0) {
      set({
        cartItems: [],
        subtotal: 0,
        productsNumber: 0,
      });
      return [];
    }

    const subtotal = product.reduce((sum, item) => {
      const price =
        item.productId?.basePrice?.sellingPrice ?? item.productId?.Price ?? 0;
      return sum + price * (item.quantity ?? 1);
    }, 0);

    set({
      cartItems: product,
      subtotal,
      productsNumber: product.length,
    });
    return product;
  },
}));

export default productlist;
