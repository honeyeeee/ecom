'use client'

// =============================================================================
// Imports
// =============================================================================
import lists from "@/app/store/userUiState"
import { Globe, Mail, MapPin, Phone } from "lucide-react"

// =============================================================================
// Shared button styles (header/footer actions)
// =============================================================================
const addNewBtnClass =
    "inline-flex h-11 items-center justify-center rounded-full border border-custom-border bg-light/80 px-6 text-sm font-semibold tracking-wide text-head transition hover:border-button hover:bg-card active:scale-[0.98]"

const proceedBtnClass =
    "inline-flex h-11 w-full items-center justify-center rounded-full bg-button px-6 text-sm font-semibold tracking-wide text-light shadow-sm transition hover:bg-button-hover active:scale-[0.98] sm:w-auto sm:min-w-[200px]"

// =============================================================================
// ExistingAddressCheck — checkout step: pick a saved delivery address
// =============================================================================
export default function ExistingAddressCheck() {
    // Zustand store: list of user's saved addresses (populated elsewhere, e.g. API)
    const savedAddresses = lists((state) => state.savedAddresses)
    console.log('savedAddresses', savedAddresses)

    return (
        // Page shell: full-width layout, theme background
        <main className="min-h-screen overflow-x-hidden bg-body px-4 py-8 text-text sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto w-full max-w-4xl">

                {/* -----------------------------------------------------------------
                    Header: page title, subtitle, desktop-only "Add New Address"
                ----------------------------------------------------------------- */}
                <header className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                    <div className="min-w-0 text-center lg:text-left">
                        <h1 className="font-cantata text-3xl font-bold tracking-wide text-head sm:text-4xl">
                            Select Delivery Address
                        </h1>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted/80 sm:text-base lg:mx-0">
                            Choose one of your saved addresses or add a new address.
                        </p>
                    </div>
                    <button type="button" className={`${addNewBtnClass} hidden shrink-0 lg:inline-flex`}>
                        Add New Address
                    </button>
                </header>

                {/* -----------------------------------------------------------------
                    Address list: one radio-selectable card per saved address
                ----------------------------------------------------------------- */}
                <section className="w-full">
                    <div className="flex w-full flex-col gap-4 sm:gap-5">
                        {savedAddresses.map((a, index) => (
                            <article
                                key={a._id}
                                className="w-full rounded-2xl border border-custom-border bg-card/60 p-4 shadow-sm transition duration-200 has-[:checked]:border-button has-[:checked]:bg-light has-[:checked]:shadow-md sm:p-5"
                            >
                                <div className="flex gap-3 sm:gap-4">
                                    {/* Radio: single selection group "delivery-address" */}
                                    <div className="flex shrink-0 pt-1">
                                        <input
                                            type="radio"
                                            name="delivery-address"
                                            value={a._id}
                                            defaultChecked={index === 0}
                                            aria-label={`Select address for ${a.name}`}
                                            className="h-4 w-4 cursor-pointer border-custom-border text-button accent-button focus:ring-2 focus:ring-button/25"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        {/* Name, default badge, Edit (placeholder action) */}
                                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="font-cantata text-xl font-bold capitalize text-text sm:text-2xl">
                                                    {a.name}
                                                </p>
                                                {(a.isDefault || a.default) && (
                                                    <span className="mt-1 inline-block rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-head">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                className="shrink-0 rounded-full border border-custom-border bg-light/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-head transition hover:border-button hover:bg-card"
                                            >
                                                Edit
                                            </button>
                                        </div>

                                        {/* Contact & location rows with icons */}
                                        <ul className="flex flex-col gap-3 text-base text-text sm:text-lg">
                                            <li className="flex items-start gap-3">
                                                <span
                                                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-custom-border bg-light"
                                                    aria-hidden
                                                >
                                                    <MapPin className="h-4 w-4 text-button" />
                                                </span>
                                                <div className="flex min-w-0 flex-col gap-0.5 pt-1">
                                                    <p>{a.address}</p>
                                                    <p>
                                                        {[a.city, a.state, a.zip].filter(Boolean).join(', ')}
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-custom-border bg-light"
                                                    aria-hidden
                                                >
                                                    <Phone className="h-4 w-4 text-button" />
                                                </span>
                                                <p className="min-w-0">{a.phone}</p>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-custom-border bg-light"
                                                    aria-hidden
                                                >
                                                    <Mail className="h-4 w-4 text-button" />
                                                </span>
                                                <p className="min-w-0 break-all">{a.email}</p>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-custom-border bg-light"
                                                    aria-hidden
                                                >
                                                    <Globe className="h-4 w-4 text-button" />
                                                </span>
                                                <p className="min-w-0">{a.country}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* -----------------------------------------------------------------
                    Footer: mobile/tablet "Add New" + primary "Proceed to Payment"
                ----------------------------------------------------------------- */}
                <footer className="mt-8 flex flex-col gap-3 border-t border-custom-border pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <button type="button" className={`${addNewBtnClass} w-full sm:w-auto`}>
                        Add New Address
                    </button>
                    <button type="button" className={proceedBtnClass}>
                        Proceed to Payment
                    </button>
                </footer>
            </div>
        </main>
    )
}
