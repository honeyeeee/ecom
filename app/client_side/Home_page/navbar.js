import { Menu, Search, UserCircle2, X } from "lucide-react";
import Link from "next/link";
// Cart icon — store se count; click par `CartDrawer` open
import CartButton from "../userProductList/cartButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-custom-border/40 bg-body px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide shrink-0 sm:text-xl md:text-2xl"
        >
          Virelle
        </Link>

        <ul className="hidden items-center gap-5 text-sm md:flex lg:gap-10">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:opacity-60 transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          <details className="group relative md:hidden">
            <summary
              className="flex cursor-pointer list-none items-center hover:opacity-60 transition [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <Menu
                size={22}
                strokeWidth={1.7}
                className="group-open:hidden"
              />
              <X
                size={22}
                strokeWidth={1.7}
                className="hidden group-open:block"
              />
            </summary>
            <ul
              className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] rounded-lg border border-custom-border bg-light py-2 text-sm shadow-sm"
            >
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-4 py-2.5 hover:bg-card/80 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <button
            type="button"
            aria-label="Search"
            className="hover:opacity-60 transition"
          >
            <Search size={20} strokeWidth={1.7} className="sm:h-[21px] sm:w-[21px]" />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="hover:opacity-60 transition"
          >
            <UserCircle2
              size={20}
              strokeWidth={1.7}
              className="sm:h-[21px] sm:w-[21px]"
            />
          </Link>

          <CartButton />
        </div>
      </nav>
    </header>
  );
}
