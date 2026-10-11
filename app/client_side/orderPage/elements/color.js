'use client'

/**
 * Order page: color + size picker.
 * Props: `response` = product API data, `id` = productId.
 * Zustand (`userUiState`) ko selected variant + cart/checkout ke liye productInfo sync karta hai.
 */

import { useEffect, useState } from "react"
import lists from "@/app/store/userUiState"
import { Ruler } from "lucide-react"

// Backend color object { name, hexCode } ya purana string format — UI ke liye sirf naam nikalna
function colorName(color) {
    if (!color) return ""
    if (typeof color === "string") return color
    return color.name ?? ""
}

export default function Colors({ response, id }) {
    // --- Zustand actions: global selected variant + product snapshot (buy button, etc.) ---
    const selectVarinat = lists((state) => state.setVert)
    const ProdInfo = lists((state) => state.setProduct)

    // --- API se derived (re-render par fresh) ---
    const firstVariant = response?.variants?.[0]
    const baseSelling = response?.basePrice?.sellingPrice ?? 0
    console.log('ye hai baseselling',baseSelling)
    const image = response?.variants?.[0]?.images?.[0]?.url
    console.log('ye hai image',image)
    console.log('ye hai response', response)

    // --- Local UI state ---
    // colorObj: user ne jo variant (color) choose kiya; null = abhi first variant default
    const [colorObj, setcolor] = useState(null)
    const [selectedColorName, setSelectedColorName] = useState(
        () => colorName(firstVariant?.color)
    )
    const [selectedSize, setSelectedSize] = useState("")

    // Cart/checkout ke liye ek object — har color/size change par update
    const [productInfo, setProductInfo] = useState({
        productId: id,
        name: response?.name,
        image: image,
        color: colorName(firstVariant?.color),
        size: "",
        Price: baseSelling,
        quantity: 1,
    })

    // productInfo change → store me push (Add to cart / buy flow isse padhta hai)
    useEffect(() => {
        ProdInfo(productInfo)
    }, [productInfo])

    // Mount par: agar user ne color nahi chuna, pehla variant global store me set
    useEffect(() => {
        if (!colorObj && firstVariant) {
            selectVarinat(firstVariant)
        }
    }, [colorObj])

    // Active variant = selected color ya default first; iski sizes list size buttons ke liye
    const activeVariant = colorObj ?? firstVariant
    const sizes = activeVariant?.sizes ?? []

    // Size row par extra charge: base selling + additionalPrice
    const priceForSize = (sizeRow) =>
        baseSelling + (sizeRow?.additionalPrice ?? 0)

    return (
        <div className="flex w-full flex-col gap-6">
            {/* COLOR UI: har variant = ek swatch; hexCode backend se background */}
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
                        const hex = a.color?.hexCode
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
                                    // Naya color: variant store + local state; size reset, price base par wapas
                                    setcolor(a)
                                    selectVarinat(a)
                                    setSelectedColorName(name)
                                    setSelectedSize("")
                                    setProductInfo((prev) => ({
                                        ...prev,
                                        color: name,
                                        image: a.images?.[0]?.url ?? image,
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

            {/* SIZE UI: active variant ki sizes; stock 0 = disabled */}
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
                                    // Size select → productInfo me size + size-specific price
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
