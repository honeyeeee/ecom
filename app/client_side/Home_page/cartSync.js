"use client";

/**
 * CART SYNC (Server → Client bridge)
 * ---------------------------------
 * Home page server component DB se cart laata hai (`getCartFromDb` in page.js).
 * Zustand store client-only hai, isliye yeh chhota component props se data lekar
 * store mein daalta hai. UI render nahi karta (`return null`).
 *
 * Debug tip: Agar navbar/drawer mein cart empty dikhe lekin DB mein data ho,
 * check karo `cartProducts` prop yahan aa raha hai ya nahi (login + token cookie).
 */

import { useEffect } from "react";
import productlist from "@/app/store/cartSection/productList";

export default function CartSync({ cartProducts }) {
  // Zustand action: cart items + subtotal + badge count set karta hai
  const cartProduct = productlist((state) => state.cartProduct);

  useEffect(() => {
    // Server se aaya hua cart array store mein sync — page refresh / revalidate par dubara chalega
    cartProduct(cartProducts ?? []);
  }, [cartProducts, cartProduct]);

  return null;
}
