'use state'
import lists from "@/app/store/userUiState"
// import lists from "@/app/store/userUiState"
import { useEffect } from "react"
export default function Occa({ product, setproduct }) {
    const fest = lists((state) => state.fest)
    const items = lists((state) => state.itmes)

    useEffect(() => {
        async function call() {
            await items()
        }
        call()
    }, [])
    return (
        <div className="flex flex-col gap-2">
            {/* Theme: text-bg */}
            <label htmlFor="occasion" className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-bg font-poppins">occasion</label>
            {/* Theme: coffee outline border-head/60, text-bg */}
            <select
                id="occasion"
                onChange={(e) => {
                    setproduct((prev) => ({
                        ...prev,
                        occasion: e.target.value
                    }))
                }}
                className="occasion w-full sm:w-80 h-11 sm:h-12 border-2 border-head/60 rounded-xl px-4 py-2 font-poppins text-bg bg-white/90 focus:outline-none focus:border-head text-sm sm:text-base transition"
            >
                <option value="">select</option>
                {fest.map(a => <option key={a._id} value={a.occasion} >{a.occasion}</option>)}
            </select>
        </div>
    )
}