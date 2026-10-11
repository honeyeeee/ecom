import { create } from "zustand";

// =============================================================================
// HELPERS — product / variant identity (delete & match ke liye)
// =============================================================================

const getProductId = (item) => {
  const productId = item?.productId;
  const id = typeof productId === "object" ? productId?._id : productId;

  return id == null ? "" : String(id);
};

const getVariantValue = (value) =>
  typeof value === "object" ? value?.name ?? "" : value ?? "";

// =============================================================================
// HELPERS — subtotal & cart snapshot (items change par state update)
// =============================================================================

const getSubtotal = (items) =>
  items.reduce((total, item) => {
    const price = Number(
      item.Price ??
        item.productId?.basePrice?.sellingPrice ??
        item.productId?.Price ??
        0
    );
    const quantity = Number(item.quantity ?? 1);

    return total + price * quantity;
  }, 0);

const createCartState = (cartItems) => ({
  cartItems,
  subtotal: getSubtotal(cartItems),
  productsNumber: cartItems.length,
});

// =============================================================================
// CART STORE — global cart state (Zustand)
// =============================================================================

const useCartStore = create((set) => ({
  // --- Initial values ---
  cartItems: [],
  subtotal: 0,
  productsNumber: 0,
  cartOpen: false,

  // --- Cart drawer UI ---
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),

  // --- Cart list actions ---
  setCartItems: (items) => {
    const cartItems = Array.isArray(items) ? items : [];
    set(createCartState(cartItems));
  },

  addProduct: (product) => {
    if (!product) return;

    set((state) =>
      createCartState([...state.cartItems, product])
    );
  },

  deleteProduct: (itemToDelete) => {
    set((state) =>
      createCartState(
        state.cartItems.filter((item) => {
          if (item._id && itemToDelete?._id) {
            return String(item._id) !== String(itemToDelete._id);
          }

          return !(
            getProductId(item) === getProductId(itemToDelete) &&
            getVariantValue(item.color ?? item.Color) ===
              getVariantValue(itemToDelete?.color ?? itemToDelete?.Color) &&
            getVariantValue(item.size ?? item.Size) ===
              getVariantValue(itemToDelete?.size ?? itemToDelete?.Size)
          );
        })
      )
    );
  },
}));

// =============================================================================
// EXPORT
// =============================================================================

export default useCartStore;
