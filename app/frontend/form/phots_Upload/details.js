
export default function Details({ bag, setBag }) {

    return (

        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-emerald-100 p-6 md:p-8">

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-emerald-950">
                    Product Details
                </h2>

                <p className="text-sm text-emerald-700/70 mt-1">
                    Update your product information
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Product Name
                    </label>

                    <input
                        id="name"
                        value={bag.Name}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Name: e.target.value
                            })
                        }}
                        className="w-full h-11 border border-emerald-200 rounded-xl px-4 bg-white text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Enter product name"
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="category"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        value={bag.Category}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Category: e.target.value
                            })
                        }}
                        className="w-full h-11 border border-emerald-200 rounded-xl px-4 bg-white text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    >
                        <option value="">Select Category</option>
                        <option value="School Bag">School Bag</option>
                        <option value="Collage Bag">Collage Bag</option>
                        <option value="Travel Bag">Travel Bag</option>
                        <option value="Office Bag">Office Bag</option>
                        <option value="Premium Bag">Premium Bag</option>
                    </select>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="gender"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Gender
                    </label>

                    <select
                        id="gender"
                        value={bag.Gender}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Gender: e.target.value
                            })
                        }}
                        className="w-full h-11 border border-emerald-200 rounded-xl px-4 bg-white text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        value={bag.Description}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Description: e.target.value
                            })
                        }}
                        rows="4"
                        className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white text-emerald-950 outline-none resize-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Describe your product..."
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="price"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Price
                    </label>

                    <input
                        id="price"
                        value={bag.Price}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Price: e.target.value
                            })
                        }}
                        className="w-full h-11 border border-emerald-200 rounded-xl px-4 bg-white text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="₹ 0"
                    />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="stock"
                        className="text-sm font-medium text-emerald-950"
                    >
                        Stock
                    </label>

                    <input
                        id="stock"
                        value={bag.Stock}
                        onChange={(e) => {
                            setBag({
                                ...bag,
                                Stock: e.target.value
                            })
                        }}
                        className="w-full h-11 border border-emerald-200 rounded-xl px-4 bg-white text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Enter stock quantity"
                    />
                </div>

            </div>
        </div>
    )
}

