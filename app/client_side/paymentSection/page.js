"use client"

// =============================================================================
// SECTION: Imports
// =============================================================================
import Image from "next/image";
import userUiState from "@/app/store/userUiState";
import { ShieldCheck, Truck, RotateCcw, MapPin, Banknote } from "lucide-react";

// =============================================================================
// SECTION: PaymentSection (main page)
// Grid layout: left = order + confidence | right = address + payment
// =============================================================================
export default function PaymentSection() {
    // -------------------------------------------------------------------------
    // DATA: Zustand — cart / product info (source: userUiState.productInfo)
    // -------------------------------------------------------------------------
    const addressInfo = userUiState((state) => state.savedAddresses)
    const productInfo = userUiState((state) => state.productInfo)
    console.log("addressInfo", addressInfo)
    console.log("productInfo", productInfo)
    // 
    // -------------------------------------------------------------------------
    // DATA: Normalize productInfo → items[] (handles array or single object)
    // Debug: console.log("payment items", items) if list is empty/wrong
    // -------------------------------------------------------------------------
    const items = Array.isArray(productInfo)
        ? productInfo.filter((item) => item && (item.productId || item.name))
        : productInfo?.productId || productInfo?.name
            ? [productInfo]
            : []

    // -------------------------------------------------------------------------
    // DATA: Order total (Price/price × quantity per line)
    // -------------------------------------------------------------------------
    const total = items.reduce((acc, item) => {
        const price = item.Price ?? item.price ?? 0
        const qty = item.quantity ?? 1
        return acc + price * qty
    }, 0)



    const handlePurchase = async () => {
        const response = await fetch("/backend/ordersBackendApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: items,
                address: addressInfo,
                paymentMethod: "COD",
            }),
        })
    }
    // -------------------------------------------------------------------------
    // CONFIG: Trust badges row ("Shop with confidence")
    // -------------------------------------------------------------------------
    const confidenceItems = [
        { icon: ShieldCheck, label: "Secure checkout", success: true },
        { icon: Truck, label: "Fast delivery" },
        { icon: RotateCcw, label: "Easy returns" },
    ]

    return (
        // =====================================================================
        // LAYOUT: Mobile/tablet stack (flex) | lg+ = 5×6 grid
        // =====================================================================
        <div className="w-full min-h-screen flex flex-col gap-3 bg-payment-page-bg text-payment-text p-3 pb-6 sm:gap-4 sm:p-4 lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:gap-4 lg:h-screen lg:pb-4 lg:overflow-hidden">

            {/* =================================================================
                SECTION: Order Details (col 1–3, rows 1–4)
                - Header
                - Scrollable product line items (from items[])
                - Footer total
               ================================================================= */}
            <div className="order-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-payment-border bg-white shadow-payment-card lg:order-none lg:col-span-3 lg:row-span-4 lg:h-full">
                {/* Order Details — header */}
                <h1 className="p-3 text-lg font-medium text-payment-text font-cantata sm:p-4 sm:text-xl">Order Details</h1>
                <div className="w-full h-px bg-payment-border" aria-hidden />

                {/* Order Details — product list (scroll) */}
                <div className="flex min-h-[200px] max-h-[50vh] flex-col gap-3 overflow-y-auto hide-scrollbar bg-payment-page-bg/40 px-3 py-3 sm:max-h-[55vh] sm:px-4 lg:h-[60%] lg:max-h-none">
                    {items.length === 0 ? (
                        <p className="text-sm text-payment-muted py-6 text-center">No items in this order yet.</p>
                    ) : (
                        items.map((item) => {
                            const price = item.Price ?? item.price ?? 0
                            const size = item.size ?? ""
                            const color = item.color ?? ""
                            const qty = item.quantity ?? 1
                            const key = item.productId ?? item.id ?? item.name

                            return (
                                /* Single product row — image, meta, line total */
                                <div
                                    key={key}
                                    className="flex w-full min-h-[88px] flex-row items-center gap-3 rounded-xl border border-payment-border bg-white p-2.5 shadow-payment-row sm:min-h-[100px] sm:gap-4 sm:p-3"
                                >
                                    {item.image ? (
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-payment-border bg-white sm:h-20 sm:w-20">
                                            <Image
                                                src={item.image}        
                                                alt={item.name ?? "Product"}
                                                width={80}
                                                height={80}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-16 w-16 shrink-0 rounded-lg border border-payment-border bg-white sm:h-20 sm:w-20" />
                                    )}
                                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                                        <h2 className="text-sm font-semibold text-payment-text truncate">{item.name}</h2>
                                        <div className="flex flex-wrap gap-2 text-xs text-payment-muted">
                                            {item.color.name && <span>Color: {item.color.name}</span>}
                                            {item.size && <span>Size: {item.size}</span>}
                                            <span>Qty: {qty}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-payment-text shrink-0">
                                        ₹{(price * qty).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Order Details — total footer */}
                <div className="flex w-full shrink-0 items-center justify-between border-t border-payment-border bg-white px-4 py-3 sm:px-5 sm:py-4 lg:h-[20%]">
                    <h2 className="text-sm font-medium text-payment-text sm:text-base">Total Price</h2>
                    <p className="text-base font-semibold text-payment-text sm:text-lg">₹{total.toLocaleString("en-IN")}</p>
                </div>
            </div>

            {/* =================================================================
                SECTION: Shop with confidence (col 1–3, row 5)
                - Static trust icons from confidenceItems
               ================================================================= */}
            <div className="order-4 flex flex-col justify-center gap-2 rounded-xl border border-payment-border bg-white px-3 py-3 shadow-payment-card sm:px-4 lg:order-none lg:col-start-1 lg:col-end-4 lg:row-start-5 lg:row-end-6">
                <h1 className="text-xs font-semibold uppercase tracking-wide text-payment-text sm:text-sm">Shop with confidence</h1>
                <div className="flex flex-row flex-nowrap items-center justify-between gap-2 sm:gap-4">
                    {confidenceItems.map(({ icon: Icon, label, success }) => (
                        <div key={label} className="flex min-w-0 flex-row items-center gap-2 text-xs text-payment-muted sm:gap-2.5 sm:text-sm">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-payment-border bg-white sm:h-12 sm:w-12">
                                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${success ? "text-payment-success" : "text-payment-accent"}`} />
                            </span>
                            <div className="flex min-w-0 flex-col">
                                <span className={`font-medium leading-tight ${success ? "text-payment-success" : ""}`}>{label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =================================================================
                SECTION: Delivery Address (col 4–5, rows 1–2)
                - Placeholder until address step / API is wired
               ================================================================= */}
            <div className="order-2 flex flex-col overflow-hidden rounded-xl border border-payment-border bg-white shadow-payment-card lg:order-none lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-3">
                <h1 className="p-3 text-lg font-medium text-payment-text font-cantata sm:p-4 sm:text-xl">Address</h1>
                
            </div>

            {/* =================================================================
                SECTION: Payment Method (col 4–5, rows 3–6)
                - COD option (selected)
                - Purchase CTA (wire onClick when checkout API ready)
               ================================================================= */}
            <div className="order-3 flex flex-col overflow-hidden rounded-xl border border-payment-border bg-white shadow-payment-card lg:order-none lg:col-start-4 lg:col-end-6 lg:row-start-3 lg:row-end-6">
                <h1 className="p-3 text-lg font-medium text-payment-text font-cantata sm:p-4 sm:text-xl">Payment Method</h1>
                <div className="w-full h-px bg-payment-border" aria-hidden />

                <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
                    {/* Payment — COD radio (currently only option) */}
                    <label
                        className="flex cursor-default flex-row items-center gap-2.5 rounded-xl border border-payment-accent bg-payment-accent-soft p-3 shadow-payment-row sm:gap-3 sm:p-4"
                    >
                        <input type="radio" name="payment" checked readOnly className="accent-payment-accent h-4 w-4" />
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-payment-border">
                            <Banknote className="h-5 w-5 text-payment-accent" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-payment-text">Cash on Delivery (COD)</span>
                            <span className="text-xs text-payment-muted">Pay when your order arrives</span>
                        </div>
                    </label>

                    {/* Payment — submit */}
                    <button
                        type="button"
                        className="mt-2 w-full rounded-xl bg-button py-3.5 text-sm font-semibold tracking-wide text-light shadow-sm transition hover:bg-button-hover active:scale-[0.98] sm:mt-auto"
                        onClick={handlePurchase}
                    >
                        Purchase
                    </button>
                </div>
            </div>

        </div>
    )
}
