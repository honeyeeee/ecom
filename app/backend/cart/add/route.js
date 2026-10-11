/**
 * POST /backend/cart/add
 * Add to cart: pehle logged-in user verify, phir product verify,
 * phir same user+product+size+color line hai to quantity badhao, nahi to nayi Cart line banao.
 *
 * Body: { productId, quantity?, size?, color?, imageUrl? }
 * Auth: cookie `token` — `../auth.js` → getAuthenticatedUser()
 */

import connectDb from "../../db/db";
import Cart from "../../db/cart";
import Prod from "../../db/productSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../auth";

export async function POST(request) {
  try {
    // Mongo connection (har request par — project ka existing pattern)
    await connectDb();

    // Step 1 — User verify: JWT cookie se user nikalna; invalid / no login → 401/404
    const auth = await getAuthenticatedUser();
    if (auth.error) return auth.error;

    // Client se product + optional variant / qty
    // Fix #2 — invalid / empty / null JSON body par 500 ki jagah 400
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }
    const { productId, quantity = 1, size = "", color = "", imageUrl = "" } = body;

    // Step 2a — productId format check (galat string par DB query waste na ho)
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "Invalid product id" },
        { status: 400 }
      );
    }

    // quantity number honi chahiye, kam se kam 1
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 }
      );
    }

    // Step 2b — Product DB mein exist? (Prod collection = productSchema)
    const product = await Prod.findById(productId, { _id: 1 });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Cart line unique key: userId + productId + size + color (cart.js compound index)
    const userId = auth.user._id;
    const normalizedSize = String(size).trim();
    const normalizedColor = String(color).trim();
    const normalizedImageUrl = String(imageUrl).trim();

    const existingLine = await Cart.findOne({
      userId,
      productId: product._id,
      size: normalizedSize,
      color: normalizedColor,
      
    });

    // Step 3 — Pehle se cart mein yahi variant → quantity increase, nayi line nahi
    if (existingLine) {
      existingLine.quantity += qty;
      if (normalizedImageUrl && !existingLine.imageUrl) {
        existingLine.imageUrl = normalizedImageUrl;
      }
      await existingLine.save();

      return NextResponse.json({
        success: true,
        action: "incremented",
        message: "Cart quantity updated",
        cartLine: existingLine,
      });
    }

    // Step 4 — Naya variant / pehli baar add → Cart collection mein naya document
    // Fix #1 — race: 2 request ne ek saath create kiya to unique index (11000) rok degi;
    // tab findOne karke quantity increment kar do, 500 mat bhejo
    let cartLine;
    try {
      cartLine = await Cart.create({
        userId,
        productId: product._id,
        quantity: qty,
        size: normalizedSize,
        color: normalizedColor,
        imageUrl: normalizedImageUrl,
      });
    } catch (error) {
      if (error?.code !== 11000) throw error.message;

      const racedLine = await Cart.findOne({
        userId,
        productId: product._id,
        size: normalizedSize,
        color: normalizedColor,
      });
      if (!racedLine) throw error;

      racedLine.quantity += qty;
      await racedLine.save();

      return NextResponse.json({
        success: true,
        action: "incremented",
        message: "Cart quantity updated",
        cartLine: racedLine,
      });
    }

    return NextResponse.json({
      success: true,
      action: "created",
      message: "Product added to cart",
      cartLine,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
