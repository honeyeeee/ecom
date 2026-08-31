'use client'
import { deleteProduct } from "./action"
import { useRouter } from "next/navigation" // 1. useRouter import karein

export default function Comp({ sure, setsure, id }) {
  const router = useRouter(); // 2. router instance banayein

  async function delte() {
    await deleteProduct(id);

    console.log("kuch aya");

    router.refresh(); // 3. Server se fresh state fetch karne ke liye refresh hit karein
    setsure(false);
  }

  return (
    sure ? (
      <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
        <div className="w-full max-w-md bg-body rounded-2xl border border-border shadow-2xl p-6 md:p-8">
          <div className="flex flex-col items-center text-center">

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <span className="text-2xl text-red-600">!</span>
            </div>

            {/* Heading */}
            <h1 className="text-xl md:text-2xl font-semibold text-text">
              Are you sure?
            </h1>

            {/* Description */}
            <p className="text-sm text-muted mt-2 max-w-sm">
              Do you really want to delete this product?
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex w-full gap-3 mt-7">
              <button
                onClick={() => {
                  setsure(false)
                }}
                className="flex-1 py-3 rounded-xl border border-border bg-white text-text font-medium hover:bg-light transition"
              >
                No
              </button>

              <button
                onClick={() => {
                  delte()
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    ) : null
  )
}