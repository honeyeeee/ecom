'use client'

import { useReducer } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShoppingBag } from "lucide-react"
import { z } from "zod"

export default function Singnup() {

    async function request(params) {
        const data = await fetch('/backend/Auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.data)
        })
    }

    const check = z.object({
        name: z.string().min(1),
        email: z.string().email().min(8),
        password: z.string().min(8)
    })

    const initialState = {
        data: {
            name: "",
            email: "",
            password: ""
        },
        loading: false,
        success: false,
        showPassword: true,
        stopButton: false,
        error: ""
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'changeName':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        name: action.payload
                    }
                }

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

            case 'hide':
                return {
                    ...state,
                    showPassword: !state.showPassword
                }

            case "stopButton":
                return {
                    ...state,
                    stopButton: true
                }

            case "startButton":
                return {
                    ...state,
                    stopButton: false
                }

            case 'reset':
                return initialState

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="min-h-screen bg-body flex items-center justify-center px-4 py-8">

            <form
                onSubmit={async (e) => {
                    e.preventDefault()

                    const data = check.safeParse(state.data)

                    if (data.success) {

                        dispatch({
                            type: 'stopButton'
                        })

                        await request()

                        dispatch({
                            type: 'reset'
                        })
                    } else {
                        console.log(data.error.issues)
                    }
                }}
                className="w-full max-w-6xl min-h-[680px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >

                {/* LEFT SIDE */}
                <div className="lg:w-1/2 bg-light relative overflow-hidden flex flex-col justify-between">

                    {/* Shopping Image */}
                    <div
                        className="h-[430px] lg:h-[500px] bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85')"
                        }}
                    />

                    {/* Soft overlay */}
                    <div className="absolute top-[360px] lg:top-[420px] left-0 right-0 h-40 bg-gradient-to-t from-light via-light/90 to-transparent" />

                    {/* Left content */}
                    <div className="relative px-10 pb-12 text-center">

                        <div className="mx-auto -mt-10 mb-5 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                            <ShoppingBag
                                size={28}
                                className="text-accent"
                            />
                        </div>

                        <h2 className="font-cantata text-3xl font-bold text-text">
                            Shop. Enjoy. Repeat.
                        </h2>

                        <p className="mt-3 max-w-md mx-auto text-muted leading-relaxed">
                            Find everything you love and more.
                            Enjoy a seamless shopping experience made just for you.
                        </p>

                        {/* <div className="flex justify-center gap-2 mt-7">
                            <span className="w-3 h-3 rounded-full bg-button" />
                            <span className="w-3 h-3 rounded-full bg-border" />
                            <span className="w-3 h-3 rounded-full bg-border" />
                        </div> */}
                    </div>
                </div>


                {/* RIGHT SIDE */}
                <div className="lg:w-1/2 flex items-center justify-center px-7 sm:px-12 lg:px-16 py-12">

                    <div className="w-full max-w-md">

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-10">

                            <div className="w-12 h-12 rounded-2xl bg-button flex items-center justify-center">
                                <ShoppingBag
                                    size={25}
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


                        {/* Heading */}
                        <div className="mb-8">

                            <h2 className="font-cantata text-4xl font-bold text-text">
                                Create Account 🌿
                            </h2>

                            <p className="mt-2 text-muted">
                                Join us and start your shopping journey.
                            </p>

                        </div>


                        {/* NAME */}
                        <div className="mb-5">

                            <label className="block text-sm font-medium text-text mb-2">
                                Full name
                            </label>

                            <div className="relative">

                                <User
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    value={state.data.name}
                                    minLength={1}
                                    required
                                    placeholder="Enter your name"
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'changeName',
                                            payload: e.target.value
                                        })
                                    }}
                                    className="w-full h-14 rounded-xl border border-border bg-white pl-12 pr-4 text-text outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                                />

                            </div>

                        </div>


                        {/* EMAIL */}
                        <div className="mb-5">

                            <label className="block text-sm font-medium text-text mb-2">
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    value={state.data.email}
                                    minLength={8}
                                    type="email"
                                    required
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
                        <div className="mb-6">

                            <label className="block text-sm font-medium text-text mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    value={state.data.password}
                                    required
                                    minLength={8}
                                    type={
                                        state.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Create a password"
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
                                    onClick={() => {
                                        dispatch({
                                            type: 'hide'
                                        })
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition"
                                >
                                    {state.showPassword ? (
                                        <Eye size={21} />
                                    ) : (
                                        <EyeOff size={21} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={state.stopButton}
                            className="w-full h-14 rounded-xl bg-button text-white font-semibold flex items-center justify-center gap-3 transition hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed"
                        >

                            {state.stopButton ? (
                                "Creating account..."
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={20} />
                                </>
                            )}

                        </button>


                        {/* LOGIN */}
                        <p className="text-center text-sm text-muted mt-7">
                            Already have an account?
                            <span className="ml-1 text-accent font-semibold cursor-pointer hover:underline">
                                Sign in
                            </span>
                        </p>

                    </div>

                </div>

            </form>

        </div>
    )
}