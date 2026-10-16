'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Status badge styles matching UserAdminOrder
function getStatusBadgeClass(status) {
    const normalized = String(status || "").toLowerCase()
    if (normalized === "shipped") return "bg-button/15 text-button"
    if (normalized === "delivered") return "bg-card text-head"
    if (normalized === "cancelled") return "bg-accent/40 text-text"
    if (normalized === "pending") return "bg-amber-100 text-amber-800"
    if (normalized === "return") return "bg-red-100 text-red-700"
    return "bg-card text-head"
}

export default function UserOrdersList() {
    const buttons = ['all', 'pending', 'shipped', 'delivered', 'cancelled', 'return']

    const [orders, setOrders] = useState([])
    const [val, setval] = useState("all")
    const router = useRouter()

    async function handleData() {
        try {
            const data = await fetch('/backend/GetOrderApi', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const response = await data.json()
            console.log("response hai form data:", response)
            setOrders(response.orders || [])
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }

    useEffect(() => {
        handleData()
    }, [])

    // Function to get count of each status
    function getStatusCount(status) {
        if (status === 'all') return (orders || []).length
        return (orders || []).filter(im => im.status?.toLowerCase() === status.toLowerCase()).length
    }

    // Filtered orders list based on selected button
    const filteredOrders = val === "all" || !val
        ? (orders || [])
        : (orders || []).filter(im => im.status?.toLowerCase() === val.toLowerCase())

    return (
        <div className="min-h-screen bg-body px-4 py-6 text-text sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-5xl">

                {/* Section: Page heading & description */}
                <div className="mb-6">
                    <h1 className="font-cantata text-3xl text-head sm:text-4xl">
                        My Orders
                    </h1>
                    <p className="mt-2 text-sm text-head">
                        View and manage all your orders at one place.
                    </p>
                </div>

                {/* Section: Filter chips with live order counts */}
                <div className="hide-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
                    {buttons.map((item) => {
                        const count = getStatusCount(item)
                        const isSelected = val === item

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setval(item)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 capitalize ${
                                    isSelected
                                        ? "bg-button text-light shadow-sm"
                                        : "border border-custom-border bg-light text-text hover:bg-card"
                                }`}
                            >
                                <span>{item === 'all' ? 'All Orders' : item}</span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                        isSelected
                                            ? "bg-white/25 text-light"
                                            : "bg-card text-head"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Section: Orders list — UserAdminOrder style */}
                <div className="flex w-full flex-col gap-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((a) => (
                            <div
                                key={a._id}
                                className="rounded-2xl border border-custom-border bg-light p-4 sm:p-5"
                            >
                                <div className="flex flex-col gap-5">
                                    {(a.mainProduct && a.mainProduct.length > 0 ? a.mainProduct : [null]).map((im, pIndex) => {
                                        if (!im) {
                                            // Fallback for orders without mainProduct array
                                            const statusClass = getStatusBadgeClass(a.status)
                                            return (
                                                <div key={pIndex} className="flex flex-col gap-3">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-medium text-text">Order #{a._id}</h3>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
                                                            {a.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-head">
                                                        Payment: {a.paymentMethod} | Total: ₹{a.totalPrice}
                                                    </p>
                                                    <div className="mt-2 flex sm:justify-end">
                                                        <button
                                                            type="button"
                                                            className="w-full rounded-full bg-button px-5 py-3 text-sm font-medium text-light transition-colors hover:bg-button-hover sm:w-auto"
                                                            onClick={() => router.push(`/client_side/UserOrderDetails/${a._id}`)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        const originalPrice = im.mrp ?? im.originalPrice
                                        const quantity = im.quantity ?? a.quantity
                                        const details = [
                                            im.size ? `Size: ${im.size}` : null,
                                            im.color?.name ? `Color: ${im.color.name}` : null,
                                            quantity != null ? `Qty: ${quantity}` : null,
                                        ].filter(Boolean)
                                        const statusClass = getStatusBadgeClass(a.status)

                                        return (
                                            <div key={im.id || im._id || im.image || pIndex}>
                                                {/* Row: image + product info + desktop status */}
                                                <div className="flex gap-4">
                                                    {/* Product thumbnail */}
                                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-custom-border bg-card sm:h-28 sm:w-28">
                                                        {im.image ? (
                                                            <Image
                                                                src={im.image}
                                                                alt={im.name || "Product"}
                                                                width={200}
                                                                height={200}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full bg-card flex items-center justify-center text-xs text-head">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <h3 className="font-medium text-text">
                                                                {im.name}
                                                            </h3>
                                                            {/* Status badge — desktop */}
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
                                                            ₹{im.price || a.totalPrice}
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

                                                {/* Order ID & date — mobile */}
                                                <div className="mt-3 text-sm text-head sm:hidden">
                                                    <p className="break-all">Order ID: #{a._id}</p>
                                                    {a.createdAt && (
                                                        <p>
                                                            Ordered on: {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* CTA: View Details */}
                                                <div className="mt-4 flex sm:justify-end">
                                                    <button
                                                        type="button"
                                                        className="w-full rounded-full bg-button px-5 py-3 text-sm font-medium text-light transition-colors hover:bg-button-hover sm:w-auto"
                                                        onClick={() => router.push(`/client_side/UserOrderDetails/${a._id}`)}
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-custom-border bg-light p-12 text-center text-head">
                            <p className="text-base font-medium">No orders found</p>
                            <p className="mt-1 text-sm text-head/70">
                                There are no orders with status &ldquo;{val}&rdquo;.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

