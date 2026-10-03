"use client";

import { useState } from "react";

const fields = [
  { name: "Full name", type: "text", span: "sm:col-span-1", autoComplete: "name" },
  { name: "Phone number", type: "tel", span: "sm:col-span-1", autoComplete: "tel" },
  { name: "Email address", type: "email", span: "sm:col-span-2", autoComplete: "email" },
  { name: "Street address", type: "text", span: "sm:col-span-2", autoComplete: "street-address" },
  { name: "Apartment, suite, etc. (optional)", type: "text", span: "sm:col-span-2", autoComplete: "address-line2" },
  { name: "City", type: "text", span: "sm:col-span-1", autoComplete: "address-level2" },
  { name: "State / Province", type: "text", span: "sm:col-span-1", autoComplete: "address-level1" },
  { name: "Postal code", type: "text", span: "sm:col-span-1", autoComplete: "postal-code" },
  { name: "Country / Region", type: "text", span: "sm:col-span-1", autoComplete: "country-name" },
];

export default function AddressForm() {
  const [submittedAddress, setSubmittedAddress] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmittedAddress(Object.fromEntries(formData.entries()));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      <section className="rounded-2xl border border-border bg-white/60 p-5 shadow-sm sm:p-8">
        <h2 className="font-cantata text-xl font-semibold sm:text-2xl">Contact & shipping information</h2>
        <p className="mt-2 text-sm text-text/65">Fields marked with * are required.</p>

        <form
          className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {fields.map((field) => (
            <label key={field.name} className={`flex flex-col gap-2 ${field.span}`}>
              <span className="text-sm font-medium">
                {field.name}{field.name !== "Apartment, suite, etc. (optional)" && <span className="text-head"> *</span>}
              </span>
              <input
                type={field.type}
                name={field.name}
                autoComplete={field.autoComplete}
                required={field.name !== "Apartment, suite, etc. (optional)"}
                className="h-12 w-full rounded-lg border border-border bg-body px-4 text-sm outline-none transition placeholder:text-text/40 focus:border-head focus:ring-2 focus:ring-head/20"
              />
            </label>
          ))}
          <button
            type="submit"
            className="rounded-lg bg-head px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:col-span-2"
          >
            Show delivery details
          </button>
        </form>
      </section>

      <aside className="h-fit rounded-2xl border border-border bg-bg p-6 text-body sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-body/65">Your details</p>
        <h2 className="mt-3 font-cantata text-2xl font-semibold">Where should we deliver?</h2>
        <p className="mt-3 text-sm leading-6 text-body/75">
          Share a phone number so the delivery team can reach you if needed. Your address will be used for this order.
        </p>
        <div className="mt-7 border-t border-body/20 pt-5">
          <p className="text-sm font-medium">Delivery address</p>
          {submittedAddress ? (
            <div className="mt-2 space-y-1 text-sm text-body/75">
              {Object.entries(submittedAddress)
                .filter(([, value]) => value.trim())
                .map(([label, value]) => (
                  <p key={label}>
                    <span className="font-medium">{label}:</span> {value}
                  </p>
                ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-body/65">Your completed address will appear here after you submit the form.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
