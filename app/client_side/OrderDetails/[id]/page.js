"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

function getStatusBadgeClass(status) {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "shipped") return "bg-button/15 text-button";
    if (normalized === "delivered") return "bg-card text-head";
    if (normalized === "cancelled") return "bg-accent/40 text-text";
    return "bg-card text-head";
}

export default function OrderDetails() {
    const { id } = useParams();

    const [changeStatus, setChangeStatus] = useState("");
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
                if (data.order.status) {
                    setChangeStatus(data.order.status);
                }
            } catch {
                setOrderDetails(null);
            } finally {
                setLoading(false);
            }
        };
        if (id) loadOrder();
    }, [id]);

    const handleChangeStatus = async () => {
        const response = await fetch(`/backend/OrderDetailChange/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: changeStatus }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok && data.orders) {
            setOrderDetails(data.orders);
            setChangeStatus(data.orders.status);
        }
    };

    const statusClass = getStatusBadgeClass(orderDetails?.status);
    const products = orderDetails?.mainProduct ?? [];

    return (
        <div className="min-h-screen bg-body px-4 py-6 text-text sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-6">
                    <h1 className="font-cantata text-3xl text-head sm:text-4xl">
                        Status Update
                    </h1>
                    {orderDetails?._id && (
                        <p className="mt-2 break-all text-sm text-head">
                            Order ID: #{orderDetails._id}
                        </p>
                    )}
                </div>

                {loading && (
                    <p className="text-sm text-head">Loading order…</p>
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
                                    Products
                                </h2>
                                <span
                                    className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
                                >
                                    {orderDetails.status}
                                </span>
                            </div>

                            <div className="flex flex-col gap-5">
                                {products.map((im) => {
                                    const quantity =
                                        im.quantity ?? orderDetails.quantity;
                                    const details = [
                                        im.size ? `Size: ${im.size}` : null,
                                        im.color?.name
                                            ? `Color: ${im.color.name}`
                                            : null,
                                        quantity != null
                                            ? `Qty: ${quantity}`
                                            : null,
                                    ].filter(Boolean);

                                    return (
                                        <div
                                            key={im.id || im.image || im.name}
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

                            {orderDetails.totalPrice != null && (
                                <p className="mt-5 border-t border-custom-border pt-4 text-right text-base font-semibold text-text">
                                    Total: ₹{orderDetails.totalPrice}
                                </p>
                            )}
                        </div>

                        <div className="rounded-2xl border border-custom-border bg-light p-4 sm:p-5">
                            <h2 className="mb-3 text-lg font-medium text-text">
                                Update status
                            </h2>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <select
                                    value={changeStatus}
                                    onChange={(e) =>
                                        setChangeStatus(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-custom-border bg-body px-3 py-2 text-sm text-text sm:max-w-xs"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">
                                        Processing
                                    </option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="return">Return</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleChangeStatus()}
                                    className="w-full rounded-full bg-button px-5 py-3 text-sm font-medium text-light transition-colors hover:bg-button-hover sm:w-auto"
                                >
                                    Change Status
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
