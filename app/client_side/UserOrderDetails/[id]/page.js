"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function getStatusBadgeClass(status) {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "shipped") return "bg-button/15 text-button";
    if (normalized === "delivered") return "bg-card text-head";
    if (normalized === "cancelled") return "bg-accent/40 text-text";
    if (normalized === "pending") return "bg-amber-100 text-amber-800";
    if (normalized === "return") return "bg-red-100 text-red-700";
    return "bg-card text-head";
}

export default function UserOrderDetails() {
    const { id } = useParams();
    const router = useRouter();

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await fetch(`/backend/GetOrderById/${id}`);
                const data = await res.json();
                if (!res.ok || !data.orderFound || !data.order) {
                    setOrderDetails(null);
                    return;
                }
                setOrderDetails(data.order);
            } catch {
                setOrderDetails(null);
            } finally {
                setLoading(false);
            }
        };
        if (id) loadOrder();
    }, [id]);

    const statusClass = getStatusBadgeClass(orderDetails?.status);
    const products = orderDetails?.mainProduct ?? [];

    return (
        <div className="min-h-screen bg-body px-4 py-6 text-text sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-3xl">
                {/* Back button & Page title */}
                <div className="mb-6 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-fit text-sm font-medium text-head hover:text-text mb-2 flex items-center gap-1"
                    >
                        ← Back to Orders
                    </button>
                    <h1 className="font-cantata text-3xl text-head sm:text-4xl">
                        Order Details
                    </h1>
                    {orderDetails?._id && (
                        <p className="break-all text-sm text-head">
                            Order ID: #{orderDetails._id}
                        </p>
                    )}
                    {orderDetails?.createdAt && (
                        <p className="text-xs text-head">
                            Placed on: {new Date(orderDetails.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </p>
                    )}
                </div>

                {loading && (
                    <p className="text-sm text-head">Loading order details…</p>
                )}

                {!loading && !orderDetails && (
                    <p className="rounded-2xl border border-custom-border bg-light p-4 text-sm text-head">
                        Order not found.
                    </p>
                )}

                {orderDetails && (
                    <div className="flex flex-col gap-4">
                        <div className="rounded-2xl border border-custom-border bg-light p-4 sm:p-5">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <h2 className="text-lg font-medium text-text">
                                    Ordered Items ({products.length})
                                </h2>
                                {orderDetails?.status && (
                                    <span
                                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
                                    >
                                        {orderDetails.status}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-5">
                                {products.map((im, index) => {
                                    const quantity = im.quantity ?? orderDetails.quantity;
                                    const details = [
                                        im.size ? `Size: ${im.size}` : null,
                                        im.color?.name ? `Color: ${im.color.name}` : null,
                                        quantity != null ? `Qty: ${quantity}` : null,
                                    ].filter(Boolean);

                                    return (
                                        <div
                                            key={im.id || im.image || im.name || index}
                                            className="flex gap-4 rounded-xl border border-custom-border bg-card/40 p-3 sm:p-4"
                                        >
                                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-custom-border bg-light sm:h-28 sm:w-28">
                                                {im.image ? (
                                                    <Image
                                                        src={im.image}
                                                        alt={im.name ?? "Product"}
                                                        width={200}
                                                        height={200}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-head">
                                                        No image
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-text">
                                                    {im.name}
                                                </h3>
                                                {details.length > 0 && (
                                                    <p className="mt-1 text-sm text-head">
                                                        {details.join(" | ")}
                                                    </p>
                                                )}
                                                {im.color?.name && (
                                                    <p className="mt-2 text-sm text-head">
                                                        Color:{" "}
                                                        <span className="font-medium text-text">
                                                            {im.color.name}
                                                        </span>
                                                    </p>
                                                )}
                                                {im.price != null && (
                                                    <p className="mt-2 text-base font-semibold text-text">
                                                        ₹{im.price}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Summary / Payment Info */}
                            <div className="mt-5 border-t border-custom-border pt-4 flex flex-col gap-2 text-sm text-head">
                                {orderDetails.paymentMethod && (
                                    <div className="flex justify-between">
                                        <span>Payment Method:</span>
                                        <span className="font-medium text-text uppercase">
                                            {orderDetails.paymentMethod}
                                        </span>
                                    </div>
                                )}
                                {orderDetails.totalPrice != null && (
                                    <div className="flex justify-between text-base font-semibold text-text border-t border-custom-border pt-2 mt-1">
                                        <span>Total Amount:</span>
                                        <span>₹{orderDetails.totalPrice}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
