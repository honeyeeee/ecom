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
    const productInfo = userUiState((state) => state.productInfo)

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
        // LAYOUT: Page shell — 5×6 grid, full viewport
        // =====================================================================
        <div className="w-full h-screen grid grid-cols-5 grid-rows-6 gap-4 flex flex-col bg-[#F4F0E9] text-[#292524] p-4">

            {/* =================================================================
                SECTION: Order Details (col 1–3, rows 1–4)
                - Header
                - Scrollable product line items (from items[])
                - Footer total
               ================================================================= */}
            <div className="col-span-3 row-span-4 border border-[#E7E0D6] rounded-xl h-full flex flex-col justify-between bg-white shadow-[0_1px_3px_rgba(41,37,36,0.06)] overflow-hidden">
                {/* Order Details — header */}
                <h1 className="text-xl font-medium p-4 text-[#292524] font-cantata">Order Details</h1>
                <div className="w-full h-px bg-[#E7E0D6]" aria-hidden />

                {/* Order Details — product list (scroll) */}
                <div className="flex flex-col gap-3 h-[60%] overflow-y-auto hide-scrollbar px-4 py-3 bg-[#F4F0E9]/40">
                    {items.length === 0 ? (
                        <p className="text-sm text-[#57534E] py-6 text-center">No items in this order yet.</p>
                    ) : (
                        items.map((item) => {
                            const price = item.Price ?? item.price ?? 0
                            const qty = item.quantity ?? 1
                            const key = item.productId ?? item.id ?? item.name

                            return (
                                /* Single product row — image, meta, line total */
                                <div
                                    key={key}
                                    className="w-full min-h-[100px] border border-[#E7E0D6] rounded-xl p-3 bg-white flex flex-row items-center gap-4 shadow-[0_1px_2px_rgba(41,37,36,0.04)]"
                                >
                                    {item.image ? (
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E7E0D6] bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.name ?? "Product"}
                                                width={80}
                                                height={80}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-20 w-20 shrink-0 rounded-lg bg-white border border-[#E7E0D6]" />
                                    )}
                                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                                        <h2 className="text-sm font-semibold text-[#292524] truncate">{item.name}</h2>
                                        <div className="flex flex-wrap gap-2 text-xs text-[#57534E]">
                                            {item.color && <span>Color: {item.color}</span>}
                                            {item.size && <span>Size: {item.size}</span>}
                                            <span>Qty: {qty}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-[#292524] shrink-0">
                                        ₹{(price * qty).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Order Details — total footer */}
                <div className="w-full h-[20%] bg-white flex justify-between items-center px-5 py-4 border-t border-[#E7E0D6]">
                    <h2 className="text-base font-medium text-[#292524]">Total Price</h2>
                    <p className="text-lg font-semibold text-[#292524]">₹{total.toLocaleString("en-IN")}</p>
                </div>
            </div>

            {/* =================================================================
                SECTION: Shop with confidence (col 1–3, row 5)
                - Static trust icons from confidenceItems
               ================================================================= */}
            <div className="col-start-1 col-end-4 row-start-5 row-end-6 border border-[#E7E0D6] rounded-xl bg-white px-4 py-3 flex flex-col justify-center gap-2 shadow-[0_1px_3px_rgba(41,37,36,0.06)]">
                <h1 className="text-sm font-semibold uppercase tracking-wide text-[#292524]">Shop with confidence</h1>
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 sm:gap-6">
                    {confidenceItems.map(({ icon: Icon, label, success }) => (
                        <div key={label} className="flex flex-row items-center gap-3 text-xs sm:text-sm text-[#57534E]">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#E7E0D6]">
                                <Icon className={`h-6 w-6 ${success ? "text-[#4D8057]" : "text-[#956B45]"}`} />
                            </span>
                            <span className={`font-medium ${success ? "text-[#4D8057]" : ""}`}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* =================================================================
                SECTION: Delivery Address (col 4–5, rows 1–2)
                - Placeholder until address step / API is wired
               ================================================================= */}
            <div className="col-start-4 col-end-6 row-start-1 row-end-3 border border-[#E7E0D6] rounded-xl bg-white shadow-[0_1px_3px_rgba(41,37,36,0.06)] flex flex-col overflow-hidden">
                <h1 className="text-xl font-medium p-4 text-[#292524] font-cantata">Address</h1>
                <div className="w-full h-px bg-[#E7E0D6]" aria-hidden />

                <div className="flex-1 p-4 flex flex-col gap-3">
                    <div className="flex flex-row items-start gap-3 rounded-xl border border-[#E7E0D6] bg-[#F4F0E9]/30 p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E7E0D6]">
                            <MapPin className="h-5 w-5 text-[#956B45]" />
                        </span>
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#292524]">Delivery address</p>
                            <p className="text-sm text-[#57534E] leading-relaxed">
                                Your saved address will appear here after you complete the address step.
                            </p>
                            {/* Address placeholders — replace with real fields from store/API */}
                            <div className="mt-1 flex flex-col gap-1.5 text-sm text-[#57534E]/80">
                                <span className="h-9 rounded-lg border border-dashed border-[#E7E0D6] bg-white px-3 flex items-center">
                                    Full name
                                </span>
                                <span className="h-9 rounded-lg border border-dashed border-[#E7E0D6] bg-white px-3 flex items-center">
                                    Street, city, state — PIN
                                </span>
                                <span className="h-9 rounded-lg border border-dashed border-[#E7E0D6] bg-white px-3 flex items-center">
                                    Phone number
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================================
                SECTION: Payment Method (col 4–5, rows 3–6)
                - COD option (selected)
                - Purchase CTA (wire onClick when checkout API ready)
               ================================================================= */}
            <div className="col-start-4 col-end-6 row-start-3 row-end-6 border border-[#E7E0D6] rounded-xl bg-white shadow-[0_1px_3px_rgba(41,37,36,0.06)] flex flex-col overflow-hidden">
                <h1 className="text-xl font-medium p-4 text-[#292524] font-cantata">Payment Method</h1>
                <div className="w-full h-px bg-[#E7E0D6]" aria-hidden />

                <div className="flex flex-1 flex-col gap-3 p-4">
                    {/* Payment — COD radio (currently only option) */}
                    <label
                        className="flex flex-row items-center gap-3 rounded-xl border border-[#956B45] bg-[#F1E8DC] p-4 cursor-default shadow-[0_1px_2px_rgba(41,37,36,0.04)]"
                    >
                        <input type="radio" name="payment" checked readOnly className="accent-[#956B45] h-4 w-4" />
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E7E0D6]">
                            <Banknote className="h-5 w-5 text-[#956B45]" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-[#292524]">Cash on Delivery (COD)</span>
                            <span className="text-xs text-[#57534E]">Pay when your order arrives</span>
                        </div>
                    </label>

                    {/* Payment — submit */}
                    <button
                        type="button"
                        className="mt-auto w-full rounded-xl bg-button py-3.5 text-sm font-semibold tracking-wide text-light shadow-sm transition hover:bg-button-hover active:scale-[0.98]"
                    >
                        Purchase
                    </button>
                </div>
            </div>

        </div>
    )
}
