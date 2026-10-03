import AddressForm from "./AddressForm";

export default function AddressPage() {
  return (
    <main className="min-h-screen bg-body px-4 py-8 text-text sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-border pb-5 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-head">Checkout</p>
          <h1 className="mt-3 font-cantata text-3xl font-bold uppercase tracking-wide sm:text-4xl lg:text-5xl">
            Delivery address
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-text/70 sm:text-base">
            Add your contact and shipping details for your order.
          </p>
        </header>
        <AddressForm />
      </div>
    </main>
  );
}
