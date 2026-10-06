import { create } from "zustand";

/**
 * LEGACY / unused — live cart `cartSection/productList.js` use karta hai.
 * Koi import nahi mila to delete safe hai; abhi reference ke liye rakha hai.
 */

const useCartStore = create((set) => ({
  cartItems: [],

  addProduct: (product) => {
    set((state) => ({
      cartItems: [...state.cartItems, product],
    }));
  },
}));

export default useCartStore;