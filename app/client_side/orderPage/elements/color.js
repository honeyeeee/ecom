'use client'

import { useEffect, useState } from "react"
import lists from "@/app/store/userUiState"
import { Ruler } from "lucide-react"

function colorName(color) {
    if (!color) return ""
    if (typeof color === "string") return color
    return color.name ?? ""
}

function colorHex(color) {
    if (!color) return "#816447"
    if (typeof color === "object" && color.hexCode) return color.hexCode
    if (typeof color === "object" && color.hex) return color.hex
    if (typeof color === "string") {
        if (color.startsWith("#") || color.startsWith("rgb")) return color
        const colorMap = {
            black: "#1F1F1F",
            white: "#F5EBDD",
            red: "#B2533E",
            green: "#4F6F52",
            blue: "#3D5A80",
            navy: "#1D2D44",
            beige: "#D8C7B5",
            brown: "#76583D",
            grey: "#8D99AE",
            gray: "#8D99AE",
            pink: "#DEB6AB",
            olive: "#606C38",
            cream: "#F5EBDD",
            tan: "#C9B39A"
        }
        return colorMap[color.toLowerCase()] || "#816447"
    }
    return "#816447"
}

export default function Colors({ response, id }) {
    const selectVarinat = lists((state) => state.setVert)
    const ProdInfo = lists((state) => state.setProduct)
    const firstVariant = response?.variants?.[0]
    const baseSelling = response?.basePrice?.sellingPrice ?? 0

    const [colorObj, setcolor] = useState(null)
    const [selectedColorName, setSelectedColorName] = useState(
        () => colorName(firstVariant?.color)
    )
    const [selectedSize, setSelectedSize] = useState("")

    const [productInfo, setProductInfo] = useState({
        productId: id,
        name: response?.name,
        color: colorName(firstVariant?.color),
        size: "",
        Price: baseSelling,
        quantity: 1,
    })

    useEffect(() => {
        ProdInfo(productInfo)
    }, [productInfo])

    useEffect(() => {
        if (!colorObj && firstVariant) {
            selectVarinat(firstVariant)
        }
    }, [colorObj])

    const activeVariant = colorObj ?? firstVariant
    const sizes = activeVariant?.sizes ?? []

    const priceForSize = (sizeRow) =>
        baseSelling + (sizeRow?.additionalPrice ?? 0)

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Color Section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-head">
                        Select Color
                    </p>
                    {selectedColorName && (
                        <span className="text-xs font-medium capitalize text-head/80">
                            {selectedColorName}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {response?.variants?.map((a, i) => {
                        const name = colorName(a.color)
                        const hex = colorHex(a.color)
                        const isSelected = selectedColorName === name

                        return (
                            <button
                                type="button"
                                key={i}
                                title={name || `Color ${i + 1}`}
                                aria-label={name || `Color ${i + 1}`}
                                className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${isSelected
                                    ? "ring-2 ring-button ring-offset-2 ring-offset-body scale-110 shadow-sm"
                                    : "border border-custom-border/60 hover:scale-105 hover:border-button/60 opacity-90 hover:opacity-100"
                                    }`}
                                style={{ backgroundColor: hex }}
                                onClick={() => {
                                    setcolor(a)
                                    selectVarinat(a)
                                    setSelectedColorName(name)
                                    setSelectedSize("")
                                    setProductInfo((prev) => ({
                                        ...prev,
                                        color: name,
                                        size: "",
                                        Price: baseSelling,
                                    }))
                                }}
                            >
                                {isSelected && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-light/90 shadow-sm" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Size Section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-head">
                        Size
                    </h3>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-head/90 hover:text-text transition cursor-pointer"
                    >
                        <Ruler className="h-3.5 w-3.5 text-button" />
                        <span>Size Guide</span>
                    </button>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {sizes.map((row, index) => {
                        const label = row.size
                        const isSelected = selectedSize === label
                        const isOutOfStock = row.stock === 0

                        return (
                            <button
                                type="button"
                                key={index}
                                disabled={isOutOfStock}
                                className={`flex h-10 min-w-[54px] sm:min-w-[58px] items-center justify-center rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${isSelected
                                    ? "bg-button text-light border-button shadow-sm scale-105"
                                    : "bg-light border-custom-border text-text hover:bg-card hover:border-button disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-light disabled:hover:border-custom-border"
                                    }`}
                                onClick={() => {
                                    setSelectedSize(label)
                                    setProductInfo((prev) => ({
                                        ...prev,
                                        size: label,
                                        Price: priceForSize(row),
                                    }))
                                }}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
