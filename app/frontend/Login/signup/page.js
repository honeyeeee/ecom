'use client'

import { useReducer } from "react";
import {
    Eye,
    EyeClosed,
    Mail,
    Lock,
    ArrowRight,
    ShoppingBag
} from "lucide-react";

export default function LogIn() {

    async function request(params) {
        const send = await fetch('/backend/Auth/login', {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.data)
        })
    }

    const initialState = {
        data: {
            email: "",
            password: ""
        },
        buttonHide: false
    }

    function reducer(state, action) {
        switch (action.type) {

            case 'changeEmail':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        email: action.payload
                    }
                }

            case 'changePassword':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        password: action.payload
                    }
                }

            case 'reset':
                return initialState

            case 'hide':
                return {
                    ...state,
                    buttonHide: !state.buttonHide
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="min-h-screen bg-body flex items-center justify-center px-4 py-8">

            <form
                className="w-full max-w-6xl min-h-[680px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                onSubmit={async (e) => {
                    e.preventDefault()

                    console.log(state.data)

                    await request()

                    dispatch({
                        type: 'reset'
                    })
                }}
            >

                {/* LEFT SIDE */}

                <div className="lg:w-1/2 bg-light relative overflow-hidden">

                    <div className="relative min-h-[680px] h-full">

                        <img
                            src="/image.png"
                            alt="Shopping experience"
                            className="absolute inset-0 w-full h-full object-cover object-right"
                        />

                        {/* Overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-button/80 via-button/10 to-transparent" />

                        {/* Left Content */}

                        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">

                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                                <ShoppingBag size={24} />
                            </div>

                            <h2 className="font-cantata text-4xl sm:text-5xl font-bold leading-tight">
                                Welcome
                                <br />
                                Back.
                            </h2>

                            <div className="w-20 h-px bg-white/60 mt-6 mb-5" />

                            <p className="max-w-md text-white/90 leading-relaxed">
                                Sign in to continue your premium
                                shopping experience.
                            </p>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="lg:w-1/2 flex items-center justify-center px-7 sm:px-12 lg:px-16 py-12">

                    <div className="w-full max-w-md">

                        {/* BRAND */}

                        <div className="flex items-center gap-3 mb-12">

                            <div className="w-12 h-12 rounded-xl bg-button flex items-center justify-center">

                                <ShoppingBag
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold text-text">
                                    Shop<span className="text-accent">Ease</span>
                                </h1>

                                <p className="text-sm text-muted">
                                    Your style. Your way.
                                </p>

                            </div>

                        </div>


                        {/* HEADING */}

                        <div className="mb-9">

                            <h2 className="font-cantata text-4xl font-bold text-text">
                                Sign In
                            </h2>

                            <p className="mt-2 text-muted">
                                Enter your credentials to access your account.
                            </p>

                        </div>


                        {/* EMAIL */}

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-text mb-2">
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    value={state.data.email}
                                    required
                                    minLength={5}
                                    placeholder="Enter your email"
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'changeEmail',
                                            payload: e.target.value
                                        })
                                    }}
                                    className="w-full h-14 rounded-xl border border-border bg-white pl-12 pr-4 text-text outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="mb-3">

                            <label className="block text-sm font-medium text-text mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    type={
                                        state.buttonHide
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={state.data.password}
                                    minLength={8}
                                    required
                                    placeholder="Enter your password"
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'changePassword',
                                            payload: e.target.value
                                        })
                                    }}
                                    className="w-full h-14 rounded-xl border border-border bg-white pl-12 pr-14 text-text outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                                />

                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition"
                                    onClick={() => {
                                        dispatch({
                                            type: 'hide'
                                        })
                                    }}
                                >
                                    {state.buttonHide
                                        ? <Eye size={20} />
                                        : <EyeClosed size={20} />
                                    }
                                </button>

                            </div>

                        </div>


                        {/* FORGOT PASSWORD */}

                        <div className="flex justify-end mb-7">

                            <button
                                type="button"
                                className="text-sm text-accent font-medium hover:underline"
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* LOGIN */}

                        <button
                            type="submit"
                            className="w-full h-14 rounded-xl bg-button text-white font-semibold flex items-center justify-center gap-3 transition hover:bg-accent"
                        >
                            Sign In
                            <ArrowRight size={19} />
                        </button>


                        {/* SIGN UP */}

                        <p className="text-center text-sm text-muted mt-7">

                            Don't have an account?

                            <span className="ml-1 text-accent font-semibold cursor-pointer hover:underline">
                                Sign Up
                            </span>

                        </p>

                    </div>

                </div>

            </form>

        </div>
    )
}