"use client";

/**
 * Side cart panel — `client_side/layout.js` mein global mount
 * Data: Zustand cart store (server se CartSync home par bharta hai)
 * +/- / trash buttons abhi UI only — API wire baaki hai
 */

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "@/app/store/cartStore";
import CartSync from "@/app/client_side/Home_page/cartSync"

export default function CartDrawer() {
  // Zustand store se drawer state aur cart ki values lena.
  const cartOpen = useCartStore((state) => state.cartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const subtotal = useCartStore((state) => state.subtotal);
  const deleteProduct = useCartStore((state) => state.deleteProduct);

  return (
    // Drawer open/close hone par panel ko screen ke andar ya bahar slide karna.
    <div
      className={`fixed top-0 right-0 h-screen w-[500px] max-w-full bg-body border-l border-border z-50 shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {cartItems.length===0 ? <CartSync /> : []}
      {/* Header: cart title, item count, aur drawer close button. */}
      <div className="relative shrink-0 w-full px-6 py-6 border-b border-border bg-body">
        <div className="flex flex-col items-center">
          <h1 className="font-cantata text-2xl font-semibold text-text">My Cart</h1>
          <h2 className="mt-1 text-sm text-muted">
            {cartItems.length} {cartItems.length === 1 ? "Product" : "Products"}
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

      {/* Scrollable cart area: cart khaali ho to message, warna har item ka card. */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-[190px]">
        {cartItems.length === 0 ? (
          <p className="text-center text-muted text-sm py-12">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((a, index) => {
              // Check karein ki productId mein sirf ID ke bajay populated product object hai.
              const populated =
                a.productId &&
                typeof a.productId === "object" &&
                (a.productId.name != null ||
                  a.productId.Name != null ||
                  a.productId.variants != null ||
                  a.productId.basePrice != null);

              // Product object ya cart item se image, naam, price, size aur color nikaalna.
              const imageSrc =
                (populated &&
                  (a.productId.variants?.[0]?.images?.[0]?.url || a.productId.Image?.[0])) ||
                a.imageUrl ||
                a.image ||
                a.Image?.[0] ||
                null;

              const title =
                (populated && (a.productId.name || a.productId.Name)) || a.name || "Product";

              const unitPrice = populated
                ? (a.productId.basePrice?.sellingPrice ?? a.productId.Price ?? 0)
                : (a.Price ?? 0);

              const size = a.size || a.Size;
              const color = typeof a.color === "object" ? a.color?.name : (a.color || a.Color);

              // React key aur product details page ka URL taiyaar karna.
              const lineKey =
                a._id ??
                (typeof a.productId === "string" ? a.productId + color + size : a.productId?._id) ??
                `${title}-${index}` + color + size;

              const productId =
                typeof a.productId === "object" ? a.productId?._id : a.productId;

              const slug =
                (title || "product")
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "") || "product";

              const productUrl = productId
                ? `/client_side/orderPage/${slug}/${productId}`
                : "#";

              return (
                // Ek cart item ka card: image, details, quantity controls aur remove button.
                <div

                  key={lineKey}
                  className="relative flex gap-4 w-full p-3.5 bg-light border border-border rounded-2xl shadow-sm"
                >
                  <Link
                    href={productUrl}
                    onClick={() => closeCart()}
                    className="shrink-0 w-[105px] h-[105px] rounded-xl overflow-hidden bg-body relative block cursor-pointer"
                  >
                    {/* Product image ho to dikhayein, nahi to placeholder. */}
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        width={105}
                        height={105}
                        alt={title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-muted">
                        No Image
                      </div>
                    )}
                  </Link>
                  <div className="min-h-[105px] flex-1 min-w-0 flex flex-col justify-center gap-1.5 pr-7">
                    {/* Product link, selected size/color, price aur quantity controls. */}
                    <Link
                      href={productUrl}
                      onClick={() => closeCart()}
                      className="hover:underline cursor-pointer"
                    >
                      <h1 className="font-poppins font-semibold text-base text-text truncate">
                        {title}
                      </h1>
                    </Link>
                    {(size || color) && (
                      <div className="flex items-center gap-2 text-xs text-muted font-poppins">
                        {size && (
                          <span>
                            Size: <span className="font-medium text-text">{size}</span>
                          </span>
                        )}
                        {size && color && <span>•</span>}
                        {/* agr color avilable hai to sirf color dikehga */}
                        {color && (
                          <span>
                            Color: <span className="font-medium text-text capitalize">{color}</span>
                          </span>
                        )}
                      </div>
                    )}
                    <p className="font-poppins font-medium text-sm text-muted">
                      ₹
                      {unitPrice.toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-body text-text"
                      >
                        <Minus size={14} onClick={() => console.log('this is minus')} />
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
                  {/* Cart item remove button. */}
                  <button
                    type="button"
                    className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center rounded-full text-muted"
                  >
                    <Trash2 size={16} 
                     onClick={() => deleteProduct(a)} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer: store se aaya subtotal aur checkout button. */}
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
