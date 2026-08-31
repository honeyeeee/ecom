
export default function Upload({ images, setBag, bag }) {

    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">

            <label
                id="lab"
                className="w-[90%] h-[220px] border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-5 transition hover:border-emerald-500 hover:bg-emerald-50"
                htmlFor="image"
            >

                {
                    images.length > 0 && images.length <= 10
                        ?
                        <div className="grid grid-cols-3 gap-2 w-full h-full overflow-y-auto p-1">

                            {images.map((a, i) =>
                                <div
                                    className="relative cursor-pointer rounded-lg overflow-hidden group"
                                    key={i}
                                >

                                    <img
                                        src={URL.createObjectURL(a)}
                                        alt={`Preview ${i + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />

                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-950/80 hover:bg-red-600 text-white text-xs font-semibold transition"
                                        onClick={() =>
                                            setBag({
                                                ...bag,
                                                Image: images.filter((a, b) => b != i)
                                            })
                                        }
                                    >
                                        X
                                    </button>

                                </div>
                            )}

                        </div>

                        :

                        <div className="flex flex-col items-center text-center">

                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl font-semibold">
                                ↑
                            </div>

                            <p className="text-sm font-semibold text-emerald-950 mt-3">
                                Drop your image here or browse
                            </p>

                            <p className="text-xs text-emerald-700/60 mt-1">
                                PNG, JPG, WEBP
                            </p>

                        </div>
                }

            </label>

            <input
                className="hidden"
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setBag({
                        ...bag,
                        Image: [
                            ...images,
                            ...Array.from(e.target.files)
                        ]
                    })
                }}
            />

        </div>
    )
}

