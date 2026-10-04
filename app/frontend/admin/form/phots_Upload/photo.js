
export default function Upload({ images, setBag, bag }) {

    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">

            <label
                id="lab"
                className="w-full sm:w-[90%] h-48 sm:h-56 lg:h-60 border-2 border-dashed border-custom-border bg-light/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-3 sm:p-5 transition hover:border-accent hover:bg-light"
                htmlFor="image"
            >

                {
                    images.length > 0 && images.length <= 10
                        ?
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full h-full overflow-y-auto p-1">

                            {images.map((a, i) =>
                                <div
                                    className="relative cursor-pointer rounded-lg overflow-hidden group aspect-square"
                                    key={i}
                                >

                                    <img
                                        src={URL.createObjectURL(a)}
                                        alt={`Preview ${i + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />

                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-button/80 hover:bg-red-600 text-white text-xs font-semibold transition"
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

                        <div className="flex flex-col items-center text-center font-poppins">

                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-light border border-custom-border flex items-center justify-center text-accent text-xl sm:text-2xl font-semibold">
                                ↑
                            </div>

                            <p className="text-xs sm:text-sm font-semibold text-text mt-2 sm:mt-3">
                                Drop your image here or browse
                            </p>

                            <p className="text-[10px] sm:text-xs text-muted mt-1">
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

