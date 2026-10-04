
export default function Types({ types2, product, setproduct }) {

    return (
        <div className="flex gap-2 flex-col">
            {/* Theme: text-bg */}
            <label htmlFor="types" className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-bg font-poppins">product category</label>
            {/* Theme: coffee outline border-head/60, text-bg */}
            <select
                id="types"
                className="types w-full sm:w-80 h-11 sm:h-12 border-2 border-head/60 rounded-xl px-4 py-2 font-poppins text-bg bg-white/90 focus:outline-none focus:border-head text-sm sm:text-base transition"
                onChange={(e) => {
                    setproduct((prev) => ({
                        ...prev,
                        productCategory: e.target.value
                    }))
                }}
            >
                <option value="">product type</option>
                {types2.map(a => <option value={a._id} key={a._id} >{a.name}</option>)}
            </select>
        </div>
    )
}