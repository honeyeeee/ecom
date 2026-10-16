'use client'

// ——— Imports ———
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ——— Constants: order status filter labels (UI only; click handler abhi nahi) ———
const filters = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"]

// ——— Status badge ke liye Tailwind classes (order status ke hisaab se) ———
function getStatusBadgeClass(status) {
    const normalized = String(status || "").toLowerCase()
    if (normalized === "shipped") return "bg-button/15 text-button"
    if (normalized === "delivered") return "bg-card text-head"
    if (normalized === "cancelled") return "bg-accent/40 text-text"
    return "bg-card text-head"
}

// ——— Main component: User orders page ———
export default function UserOrders() {
    // ——— State: API se aayi orders list ———
    const [orders, setOrders] = useState([])
    const router = useRouter()
    // ——— Mount par orders fetch karna (/backend/GetOrderApi) ———
    useEffect(() => {
        const getOrders = async () => {
            const data = await fetch('/backend/GetOrderApi')
            console.log("data", data)
            const response = await data.json()
            console.log("response", response)
            setOrders(response.orders)
        }
        getOrders()
    }, [])

    return (
        <div className="min-h-screen bg-body px-4 py-6 text-text sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-5xl">

                {/* ——— Section: Page heading & description ——— */}
                <div className="mb-6">
                    <h1 className="font-cantata text-3xl text-head sm:text-4xl">
                        My Orders
                    </h1>
                    <p className="mt-2 text-sm text-head">
                        View all your orders at one place.
                    </p>
                </div>

                {/* ——— Section: Horizontal status filter chips (visual; filter logic pending) ——— */}
                <div className="hide-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
                    {filters.map((label, index) => (
                        <button
                            key={label}
                            type="button"
                            className={
                                index === 0
                                    ? "shrink-0 rounded-full bg-button px-4 py-2 text-sm font-medium text-light"
                                    : "shrink-0 rounded-full border border-custom-border bg-light px-4 py-2 text-sm font-medium text-text"
                            }
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ——— Section: Orders list — har order ek card ——— */}
                <div className="flex w-full flex-col gap-4">
                    {orders.map(a => (
                        <div
                            key={a._id}
                            className="rounded-2xl border border-custom-border bg-light p-4 sm:p-5"
                        >
                            {/* Ek order ke andar multiple line items (mainProduct) */}
                            <div className="flex flex-col gap-5">
                                {a.mainProduct.map(im => {
                                    // Product line: price, qty, size, color derive karna
                                    const originalPrice = im.mrp ?? im.originalPrice
                                    const quantity = im.quantity ?? a.quantity
                                    const details = [
                                        im.size ? `Size: ${im.size}` : null,
                                        im.color?.name ? `Color: ${im.color.name}` : null,
                                        quantity != null ? `Qty: ${quantity}` : null,
                                    ].filter(Boolean)
                                    const statusClass = getStatusBadgeClass(a.status)

                                    return (
                                        <div key={im.id || im.image}>
                                            {/* Row: image + product info + desktop status */}
                                            <div className="flex gap-4">
                                                {/* Product thumbnail */}
                                                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-custom-border bg-card sm:h-28 sm:w-28">
                                                    <Image
                                                        src={im.image}
                                                        alt={im.name}
                                                        width={200}
                                                        height={200}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="font-medium text-text">
                                                            {im.name}
                                                        </h3>
                                                        {/* Status badge — desktop (sm+) */}
                                                        <span className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-medium sm:inline-flex ${statusClass}`}>
                                                            {a.status}
                                                        </span>
                                                    </div>

                                                    {/* Size | Color | Qty */}
                                                    {details.length > 0 && (
                                                        <p className="mt-1 text-sm text-head">
                                                            {details.join(" | ")}
                                                        </p>
                                                    )}

                                                    {/* Selling price + strikethrough MRP */}
                                                    <p className="mt-2 text-base font-semibold text-text">
                                                        ₹{im.price}
                                                        {originalPrice != null && (
                                                            <span className="ml-2 text-sm font-normal text-head line-through">
                                                                ₹{originalPrice}
                                                            </span>
                                                        )}
                                                    </p>

                                                    {/* Status badge — mobile */}
                                                    <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium sm:hidden ${statusClass}`}>
                                                        {a.status}
                                                    </span>

                                                    {/* Order ID & date — desktop */}
                                                    <div className="mt-3 hidden text-sm text-head sm:block">
                                                        <p>Order ID: #{a._id}</p>
                                                        {a.createdAt && (
                                                            <p>
                                                                Ordered on: {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order ID & date — mobile (alag block layout ke liye) */}
                                            <div className="mt-3 text-sm text-head sm:hidden">
                                                <p className="break-all">Order ID: #{a._id}</p>
                                                {a.createdAt && (
                                                    <p>
                                                        Ordered on: {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                                    </p>
                                                )}
                                            </div>

                                            {/* CTA: View Details (action abhi wire nahi) */}
                                            <div className="mt-4 flex sm:justify-end">
                                                <button
                                                    type="button"
                                                    className="w-full rounded-full bg-button px-5 py-3 text-sm font-medium text-light transition-colors hover:bg-button-hover sm:w-auto"
                                                    onClick={() => router.push(`/client_side/OrderDetails/${a._id}`)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
