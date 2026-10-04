'use client'

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { z } from 'zod'
import Types from "./elements/fronttype"
import Occa from "./elements/occasion"

/* =============================================================================
   VALIDATION — har "Add section" (color block) submit se pehle check
   ============================================================================= */
const sectionSchema = z.array(z.object({
    color: z.string().min(1, 'min one color'),
    id: z.number().min(1),
    image: z.array(z.any()).min(1, "At least one image required"),
    variants: z.array(z.object({
        size: z.string().min(1, 'please provide size'),
        stock: z.preprocess(
            (val) => (val === undefined || val === null || val === '' ? 1 : Number(val)),
            z.number().min(1, 'stock is not avilable')
        ),
    })).min(1)
})).min(1, 'at least provide one size')

/* =============================================================================
   CONSTANTS — UI labels / classes
   ============================================================================= */
const HOMEPAGE_TAG_OPTIONS = [
    { value: 'newArrival', label: 'New Arrival' },
    { value: 'trending', label: 'Trending' },
    { value: 'bestSeller', label: 'Best Seller' },
]

// /* Theme: coffee outline (border-head), black-gray text (text-bg), responsive width */
const inputClass = "w-full sm:w-80 h-11 sm:h-12 border-2 border-head/60 rounded-xl px-4 py-2 font-poppins text-bg bg-white/90 focus:outline-none focus:border-head text-sm sm:text-base transition"
const labelClass = "uppercase text-xs sm:text-sm font-semibold tracking-wider text-bg font-poppins"

// /* Theme: coffee outline border on sections and titles */
const sectionTitleClass = "font-cantata text-base sm:text-lg font-semibold uppercase tracking-wide border-b-2 border-head/40 text-bg pb-2"
const sectionWrapClass = "flex flex-col gap-4 rounded-2xl border-2 border-head/30 bg-white/60 p-4 sm:p-6 shadow-sm"

export default function Photo() {

    /* -------------------------------------------------------------------------
       STATE — product (top form) + color sections (sec)
       ------------------------------------------------------------------------- */
    const [data, setdata] = useState([])
    const [subcategory, setcattegory] = useState([])
    const [types2, settypes2] = useState([])
    const [sec, setsec] = useState([])
    const [size] = useState(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'])
    const [product, setproduct] = useState({
        name: '',
        category: '',
        productType: '',
        productCategory: '',
        occasion: '',
        description: '',
        slug: '',
        features: '',
        mrp: '',
        sellingPrice: '',
        status: 'draft',
        homepageTags: [],
    })
    const [its, setits] = useState()

    /* -------------------------------------------------------------------------
       API — category list load (page open)
       ------------------------------------------------------------------------- */
    useEffect(() => {
        async function loadCategories() {
            const res = await fetch('/backend/formUpload/category/send')
            const json = await res.json()
            setdata(json.response)
        }
        loadCategories()
    }, [])

    /* -------------------------------------------------------------------------
       API — subcategory + types (category select ke baad chain)
       ------------------------------------------------------------------------- */
    async function sunCat(categoryId) {
        const res = await fetch(`/backend/formUpload/subCategory/send?id=${categoryId}`, { method: 'GET' })
        const json = await res.json()
        setcattegory(json.ans || [])
        return json
    }

    async function types(subCategoryId) {
        const res = await fetch(`/backend/formUpload/typeProduct/lists?id=${subCategoryId}`)
        const json = await res.json()
        settypes2(json.response || [])
        return json
    }

    /* -------------------------------------------------------------------------
       HELPERS — homepage tag toggle + FormData upload
       ------------------------------------------------------------------------- */
    function toggleHomepageTag(tag) {
        setproduct((prev) => {
            const has = prev.homepageTags.includes(tag)
            return {
                ...prev,
                homepageTags: has
                    ? prev.homepageTags.filter((t) => t !== tag)
                    : [...prev.homepageTags, tag],
            }
        })
    }

    async function upload(currentProduct, sections) {
        const formdata = new FormData()

        formdata.append('name', currentProduct.name)
        formdata.append('category', currentProduct.category)
        formdata.append('productType', currentProduct.productType)
        formdata.append('productCategory', currentProduct.productCategory)
        if (currentProduct.occasion) {
            formdata.append('occasion', currentProduct.occasion)
        }
        formdata.append('description', currentProduct.description)
        if (currentProduct.slug) {
            formdata.append('slug', currentProduct.slug)
        }
        formdata.append('mrp', currentProduct.mrp)
        formdata.append('sellingPrice', currentProduct.sellingPrice)
        formdata.append('status', currentProduct.status)

        const features = currentProduct.features
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean)
        formdata.append('features', JSON.stringify(features))
        formdata.append('homepageTags', JSON.stringify(currentProduct.homepageTags))

        sections.forEach((variants) => {
            formdata.append('variants', JSON.stringify({
                id: variants.id,
                color: variants.color,
                hexCode: variants.hexCode || '',
                sizes: variants.variants
            }))
            variants.image.forEach((img) => {
                formdata.append(`image ${variants.id}`, img)
            })
        })

        const res = await fetch('/backend/formUpload/upload/post', {
            method: 'POST',
            body: formdata
        })
        const json = await res.json()
        if (!json.success) {
            alert(json.message || 'Upload failed')
            return
        }
        alert('Product saved')
    }

    /* -------------------------------------------------------------------------
       SUBMIT — product fields + zod on sec + upload API
       ------------------------------------------------------------------------- */
    async function handleSubmit() {
        if (!product.mrp || !product.sellingPrice) {
            alert('MRP and selling price required')
            return
        }
        if (!product.name || !product.category || !product.productType || !product.productCategory) {
            alert('Fill name and all categories')
            return
        }

        const result = sectionSchema.safeParse(sec)
        if (!result.success) {
            const msg = result.error.issues.map((i) => i.message).join('\n')
            alert(msg || 'Check color sections: images, sizes, stock')
            return
        }

        const finalProduct = { ...product, variants: sec }
        setits(finalProduct)
        await upload(product, sec)
    }

    return (
        /* Theme: Center entire portion horizontally with bg-body from globals.css */
        <div className="min-h-screen w-full bg-body flex flex-col items-center py-6 sm:py-10 px-4">
            <div className="flex flex-col gap-8 max-w-3xl w-full font-poppins text-bg">

            {/* ========== 1. PRODUCT NAME ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>1. Product name</h2>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="name">name</label>
                    <input
                        id="name"
                        placeholder="NAME"
                        className={`name uppercase ${inputClass}`}
                        onChange={(e) => setproduct((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </div>
            </section>

            {/* ========== 2. PRICING ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>2. Pricing</h2>
                {/* Theme: Responsive side-by-side grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass} htmlFor="mrp">mrp *</label>
                        <input
                            id="mrp"
                            type="number"
                            min="0"
                            placeholder="1999"
                            className={inputClass}
                            onChange={(e) => setproduct((prev) => ({ ...prev, mrp: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass} htmlFor="sellingPrice">selling price *</label>
                        <input
                            id="sellingPrice"
                            type="number"
                            min="0"
                            placeholder="1499"
                            className={inputClass}
                            onChange={(e) => setproduct((prev) => ({ ...prev, sellingPrice: e.target.value }))}
                        />
                    </div>
                </div>
            </section>

            {/* ========== 3. DESCRIPTION & SEO ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>3. Description &amp; features</h2>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="description">description</label>
                    {/* Theme: coffee outline border-head, text-bg */}
                    <textarea
                        id="description"
                        rows={3}
                        placeholder="Product details..."
                        className="w-full max-w-xl border-2 border-head/60 rounded-xl p-3 sm:p-4 font-poppins text-bg bg-white/90 focus:outline-none focus:border-head text-sm sm:text-base transition"
                        onChange={(e) => setproduct((prev) => ({ ...prev, description: e.target.value }))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="features">features (comma separated)</label>
                    {/* Theme: coffee outline border-head, text-bg */}
                    <input
                        id="features"
                        placeholder="100% Cotton, Bio-wash, Oversized fit"
                        className="w-full max-w-xl border-2 border-head/60 rounded-xl p-3 sm:p-4 font-poppins text-bg bg-white/90 focus:outline-none focus:border-head text-sm sm:text-base transition"
                        onChange={(e) => setproduct((prev) => ({ ...prev, features: e.target.value }))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="slug">slug (optional)</label>
                    <input
                        id="slug"
                        placeholder="oversized-black-tee"
                        className={inputClass}
                        onChange={(e) => setproduct((prev) => ({ ...prev, slug: e.target.value }))}
                    />
                </div>
            </section>

            {/* ========== 4. PUBLISH & HOMEPAGE ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>4. Publish &amp; homepage</h2>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="status">status</label>
                    <select
                        id="status"
                        className={inputClass}
                        value={product.status}
                        onChange={(e) => setproduct((prev) => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="draft">draft</option>
                        <option value="active">active</option>
                        <option value="archived">archived</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <span className={labelClass}>homepage tags</span>
                    <div className="flex flex-wrap gap-4">
                        {HOMEPAGE_TAG_OPTIONS.map((opt) => (
                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer font-poppins text-sm text-bg">
                                <input
                                    type="checkbox"
                                    checked={product.homepageTags.includes(opt.value)}
                                    onChange={() => toggleHomepageTag(opt.value)}
                                    /* Theme: coffee accent on checkboxes */
                                    className="h-4 w-4 sm:h-5 sm:w-5 accent-head rounded"
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== 5. CATEGORIES (refs) ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>5. Categories</h2>
                <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="category">category</label>
                    <select
                        id="category"
                        className={`category ${inputClass}`}
                        onChange={async (e) => {
                            await sunCat(e.target.value)
                            setproduct((prev) => ({ ...prev, category: e.target.value }))
                        }}
                    >
                        <option value="">select</option>
                        {data.map((out) => (
                            <option key={out._id} value={out._id}>{out.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="subcat" className={labelClass}>product type</label>
                    <select
                        id="subcat"
                        className={`subcat ${inputClass}`}
                        onChange={(e) => {
                            types(e.target.value)
                            setproduct((prev) => ({ ...prev, productType: e.target.value }))
                        }}
                    >
                        <option value="">product category</option>
                        {subcategory.map((oot) => (
                            <option value={oot._id} key={oot._id}>{oot.name}</option>
                        ))}
                    </select>
                </div>
                <Types types2={types2} product={product} setproduct={setproduct} />
                <Occa product={product} setproduct={setproduct} />
            </section>

            {/* ========== 6. COLOR SECTIONS (variants) — Add section ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>6. Color sections (variants)</h2>
                {sec.map((a) => (
                    /* Theme: Coffee outline border-head/40 on variant card */
                    <div className="relative flex flex-col gap-4 sm:gap-6 rounded-xl border-2 border-head/40 bg-white/70 p-4 sm:p-5 shadow-sm" key={a.id}>
                        <h3 className="text-sm sm:text-base font-semibold uppercase text-bg font-cantata">Color block</h3>

                        {/* 6a. color name + hex */}
                        {/* Theme: coffee outline border-head/60, text-bg, responsive sm:flex-row */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                onChange={(e) => {
                                    setsec((prev) => prev.map((col) => col.id === a.id ? { ...col, color: e.target.value } : col))
                                }}
                                placeholder="COLOR NAME"
                                className="uppercase p-3 sm:p-4 w-full sm:w-60 h-11 sm:h-12 border-2 border-head/60 rounded-xl font-poppins text-bg bg-white focus:outline-none focus:border-head text-sm sm:text-base transition"
                            />
                            <input
                                onChange={(e) => {
                                    setsec((prev) => prev.map((col) => col.id === a.id ? { ...col, hexCode: e.target.value } : col))
                                }}
                                placeholder="HEX (OPTIONAL) #000000"
                                className="p-3 sm:p-4 w-full sm:w-60 h-11 sm:h-12 border-2 border-head/60 rounded-xl font-poppins text-bg bg-white focus:outline-none focus:border-head text-sm sm:text-base transition"
                            />
                        </div>

                        {/* 6b. size checkbox + stock */}
                        {/* Theme: Responsive grid for sizes & stock */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
                            {size.map((l, index) => (
                                <div className="flex flex-col items-center text-center gap-2 p-2 rounded-xl bg-white/80 border border-head/30 shadow-xs" key={index}>
                                    <h4 className="font-poppins font-semibold text-xs sm:text-sm text-bg">{l}</h4>
                                    <input
                                        checked={a.variants.some((p) => p.size === l)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setsec((prev) => prev.map((stk) => stk.id === a.id
                                                    ? { ...stk, variants: [...stk.variants, { size: e.target.value, stock: 1 }] }
                                                    : stk))
                                            } else {
                                                setsec((prev) => prev.map((stk) => stk.id === a.id
                                                    ? { ...stk, variants: stk.variants.filter((cc) => cc.size !== e.target.value) }
                                                    : stk))
                                            }
                                        }}
                                        value={l}
                                        type="checkbox"
                                        className="w-5 h-5 sm:w-6 sm:h-6 accent-head cursor-pointer"
                                    />
                                    <select
                                        disabled={!a.variants.some((p) => p.size === l)}
                                        value={a.variants.find((p) => p.size === l)?.stock ?? 1}
                                        onChange={(e) => {
                                            setsec((prev) => prev.map((check) => check.id === a.id
                                                ? { ...check, variants: check.variants.map((st) => st.size === l ? { ...st, stock: Number(e.target.value) } : st) }
                                                : check))
                                        }}
                                        className="border border-head/50 rounded-lg w-full p-1 sm:p-1.5 text-xs sm:text-sm bg-white font-poppins text-bg disabled:opacity-40"
                                    >
                                        {Array.from({ length: 40 }, (_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* 6c. images + remove section */}
                        <div>
                            <input
                                type="file"
                                multiple
                                className="w-full sm:w-[300px] h-[80px] border-2 border-dashed border-head/60 rounded-2xl p-2 bg-white/40 cursor-pointer font-poppins text-xs sm:text-sm text-bg"
                                onChange={(e) => {
                                    const img = Array.from(e.target.files)
                                    setsec((prev) => prev.map((s) => s.id === a.id ? { ...s, image: img } : s))
                                }}
                            />
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-bg hover:text-red-600 transition"
                                onClick={() => setsec((prev) => prev.filter((section) => section.id !== a.id))}
                            >
                                <X size={28} className="cursor-pointer" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Theme: Coffee color button (bg-head) */}
                <button
                    type="button"
                    onClick={() => {
                        setsec((prev) => [...prev, {
                            id: Date.now(),
                            color: '',
                            hexCode: '',
                            image: [],
                            variants: []
                        }])
                    }}
                    className="h-fit w-fit px-4 py-2.5 sm:px-5 sm:py-3 bg-head hover:opacity-90 text-white font-semibold rounded-xl text-xs sm:text-sm transition font-poppins shadow-sm"
                >
                    + Add section
                </button>
            </section>

            {/* ========== 7. SUBMIT ========== */}
            <section className={sectionWrapClass}>
                <h2 className={sectionTitleClass}>7. Save product</h2>
                {/* Theme: Coffee color button (bg-head) */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={sec.length === 0}
                    className="w-full sm:w-fit disabled:bg-gray-400 disabled:cursor-not-allowed bg-head hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition font-poppins text-sm sm:text-base shadow-sm"
                >
                    {sec.length === 0 ? 'Please add section' : 'Submit Product'}
                </button>
            </section>

            </div>
        </div>
    )
}
