"use client";

import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import productlist from "@/app/store/cartSection/productList";

export default function CartDrawer() {
  const cartOpen = productlist((state) => state.cartOpen);
  const closeCart = productlist((state) => state.closeCart);
  const cartItems = productlist((state) => state.cartItems);
  const subtotal = productlist((state) => state.subtotal);
  const productsNumber = productlist((state) => state.productsNumber);

  return (
    

    <div
      className={`fixed top-0 right-0 h-screen w-[500px] max-w-full bg-body border-l border-border z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      >
      <div className="relative shrink-0 w-full px-6 py-6 border-b border-border bg-body">
        <div className="flex flex-col items-center">
          <h1 className="font-cantata text-2xl font-semibold text-text">My Cart</h1>
          <h2 className="mt-1 text-sm text-muted">
            {productsNumber} {productsNumber === 1 ? "Product" : "Products"}
          </h2>
        </div>
        <button
          type="button"
          className="absolute top-5 right-5 h-9 w-9 rounded-full flex items-center justify-center text-muted hover:bg-light hover:text-text transition"
          onClick={() => closeCart()}
          >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-[190px]">
        {cartItems.length === 0 ? (
          <p className="text-center text-muted text-sm py-12">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((a) => (
              <div
              key={a._id}
              className="relative flex gap-4 w-full p-3.5 bg-light border border-border rounded-2xl shadow-sm"
              >
                <div className="shrink-0 w-[105px] h-[105px] rounded-xl overflow-hidden bg-body relative">
                  {a.productId?.variants?.[0]?.images?.[0]?.url || a.productId?.Image?.[0] ? (
                    <Image
                    src={
                      a.productId?.variants?.[0]?.images?.[0]?.url || a.productId?.Image?.[0]
                    }
                    width={105}
                    height={105}
                    alt={a.productId?.name || a.productId?.Name || "Product"}
                    className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-muted">
                      No Image
                    </div>
                  )}
                </div>
                <div className="min-h-[105px] flex-1 min-w-0 flex flex-col justify-center gap-2 pr-7">
                  <h1 className="font-poppins font-semibold text-base text-text truncate">
                    {a.productId?.name || a.productId?.Name || "Product"}
                  </h1>
                  <p className="font-poppins font-medium text-sm text-muted">
                    ₹
                    {(a.productId?.basePrice?.sellingPrice ?? a.productId?.Price ?? 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-body text-text"
                      >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[28px] text-center text-sm font-semibold text-text">
                      {a.quantity}
                    </span>
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-body text-text"
                      >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center rounded-full text-muted"
                  >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-body border-t border-border shadow-[0_-10px_30px_rgba(2,44,34,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-poppins font-semibold text-lg text-text">Subtotal</h1>
            <p className="text-xs text-muted mt-0.5">Shipping calculated at checkout</p>
          </div>
          <h1 className="font-poppins font-bold text-xl text-text">
            ₹{subtotal.toLocaleString("en-IN")}
          </h1>
        </div>
        <button
          type="button"
          className="w-full h-[58px] rounded-2xl bg-button text-white font-poppins font-medium flex items-center justify-center gap-2 shadow-md hover:bg-accent hover:shadow-lg transition-all"
          >
          <span className="font-semibold">Buy Now</span>
          <span className="opacity-50">•</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </button>
      </div>
    </div>
          
  );
}
