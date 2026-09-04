'use client'

import { useEffect, useReducer, useRef } from "react"

import Image from "next/image";

import { X, Minus, Plus, Trash2 } from "lucide-react";

import useCartStore from "@/app/store/cartStore";


const initialStat = {

    cartOpen: false,

    product: [],

    subTotal: 0

}

export default function CartButton() {

    const ref = useRef(null)

    const cartItems = useCartStore((state) => state.cartItems)


    function reducer(state, action) {

        switch (action.type) {

            case 'showCart':
                return {
                    ...state,
                    cartOpen: true
                }

            case "closeCart":
                return {
                    ...state,
                    cartOpen: false
                }

            case "increase":
                return {
                    ...state,
                    product: action.payload
                }

            case 'subtotal':
                return {
                    ...state,
                    subTotal: state.product.reduce((total, a) => {
                        return total + (a.productId.Price * a.quantity)
                    }, 0)
                }

            default:
                return state
        }
    }


    const [state, dispatch] = useReducer(reducer, initialStat)


    async function getproduct() {

        async function pro() {

            const data = await fetch('/backend/backendCart/cartProducts', {
                credentials: "include"
            })

            const response = await data.json()

            console.log(
                'array products ',
                response.products[0].productId.Image[0]
            )

            // console.log('array products ' ,response.products)

            return response.products

        }

        const productList = await pro()

        return productList

    }


    console.log('check state', state.product)


    return (
        <div>

            {/* CART BUTTON */}

            <button
                className="relative h-11 w-11 shrink-0 rounded-xl bg-button text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
                onClick={async () => {

                    const produts = await getproduct()

                    dispatch({
                        type: 'showCart'
                    })

                    dispatch({
                        type: 'increase',
                        payload: produts
                    })

                    dispatch({
                        type: 'subtotal'
                    })

                }}
            >

                🛒

                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-body">
                    {cartItems.length}
                </span>

            </button>


            {/* CART DRAWER */}

            <div
                className={`fixed top-0 right-0 h-screen w-[500px] max-w-full bg-body border-l border-border z-10 shadow-2xl flex flex-col transition-transform duration-300 ${
                    state.cartOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }`}
            >


                {/* CART HEADER */}

                <div className="relative shrink-0 w-full px-6 py-6 border-b border-border bg-body">

                    <div className="flex flex-col items-center">

                        <h1 className="font-cantata text-2xl font-semibold text-text">
                            My Cart
                        </h1>

                        <h2 className="mt-1 text-sm text-muted">
                            {cartItems.length}{" "}
                            {cartItems.length === 1 ? "Product" : "Products"}
                        </h2>

                    </div>


                    {/* CLOSE BUTTON */}

                    <button
                        className="absolute top-5 right-5 h-9 w-9 rounded-full flex items-center justify-center text-muted hover:bg-light hover:text-text transition"
                        onClick={() => {

                            dispatch({
                                type: "closeCart"
                            })

                        }}
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* CART SECTION */}

                <div className="flex-1 overflow-y-auto px-5 py-5 pb-[190px]">

                    <div className="space-y-3">

                        {state.product.map((a, i) => {

                            return (

                                <div
                                    key={a._id}
                                    className="relative flex gap-4 w-full p-3.5 bg-light border border-border rounded-2xl shadow-sm hover:shadow-md transition"
                                >


                                    {/* PRODUCT IMAGE */}

                                    <div className="shrink-0 w-[105px] h-[105px] rounded-xl overflow-hidden bg-body">

                                        <Image
                                            src={a.productId.Image[0]}
                                            width={105}
                                            height={105}
                                            alt={a.productId.Name}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>


                                    {/* PRODUCT DETAILS */}

                                    <div className="min-h-[105px] flex-1 min-w-0 flex flex-col justify-center gap-2 pr-7">


                                        {/* PRODUCT NAME */}

                                        <h1 className="font-poppins font-semibold text-base text-text truncate">
                                            {a.productId.Name}
                                        </h1>


                                        {/* PRODUCT PRICE */}

                                        <p className="font-poppins font-medium text-sm text-muted">
                                            ₹{a.productId.Price.toLocaleString("en-IN")}
                                        </p>


                                        {/* QUANTITY */}

                                        <div className="flex items-center gap-2">

                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-body text-text hover:bg-button hover:text-white transition"
                                            >
                                                <Minus size={14} />
                                            </button>


                                            <span className="min-w-[28px] text-center text-sm font-semibold text-text">
                                                {a.quantity}
                                            </span>


                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-body text-text hover:bg-button hover:text-white transition"
                                            >
                                                <Plus size={14} />
                                            </button>

                                        </div>

                                    </div>


                                    {/* REMOVE BUTTON */}

                                    <button
                                        className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:bg-red-50 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>

                            )

                        })}

                    </div>

                </div>


                {/* BOTTOM SUMMARY */}

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-body border-t border-border shadow-[0_-10px_30px_rgba(2,44,34,0.08)]">


                    {/* SUBTOTAL */}

                    <div className="flex items-center justify-between mb-4">

                        <div>

                            <h1 className="font-poppins font-semibold text-lg text-text">
                                Subtotal
                            </h1>

                            <p className="text-xs text-muted mt-0.5">
                                Shipping calculated at checkout
                            </p>

                        </div>


                        <h1 className="font-poppins font-bold text-xl text-text">
                            ₹{state.subTotal.toLocaleString("en-IN")}
                        </h1>

                    </div>


                    {/* BUY NOW BUTTON */}

                    <button
                        className="w-full h-[58px] rounded-2xl bg-button text-white font-poppins font-medium flex items-center justify-center gap-2 shadow-md hover:bg-accent hover:shadow-lg transition-all"
                    >

                        <span className="font-semibold">
                            Buy Now
                        </span>

                        <span className="opacity-50">
                            •
                        </span>

                        <span>
                            ₹{state.subTotal.toLocaleString("en-IN")}
                        </span>

                    </button>

                </div>

            </div>

        </div>
    )
}