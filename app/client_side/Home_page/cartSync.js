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

