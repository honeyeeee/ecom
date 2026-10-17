import { Menu, UserCircle2, X } from "lucide-react";
import Link from "next/link";
// Cart icon — store se count; click par `CartDrawer` open
import CartButton from "../userProductList/cartButton";
import FetchSearch from "./productFetch/searchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
];

export default function Navbar() {



  return (
    <header className="sticky top-0 z-40 border-b border-black/20 bg-button text-light shadow-[0_4px_20px_-2px_rgba(0,0,0,0.18)] px-4 py-2.5 sm:px-6 sm:py-3 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 text-light">
        <Link
          href="/"
          className="text-xl font-bold tracking-wider font-cantata shrink-0 sm:text-2xl text-light hover:text-white transition drop-shadow-sm"
        >
          Virelle
        </Link>

        <ul className="hidden items-center gap-1 lg:gap-2 whitespace-nowrap text-sm md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-1.5 rounded-full text-light/85 hover:text-white hover:bg-white/10 font-medium transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 text-light">
          <details className="group relative md:hidden">
            <summary
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 cursor-pointer list-none text-light hover:text-white transition shadow-sm [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <Menu
                size={19}
                strokeWidth={2}
                className="group-open:hidden"
              />
              <X
                size={19}
                strokeWidth={2}
                className="hidden group-open:block"
              />
            </summary>
            <ul
              className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] rounded-xl border border-custom-border/40 bg-button py-2 text-sm text-light shadow-xl backdrop-blur-md"
            >
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-4 py-2.5 text-light/90 hover:bg-button-hover hover:text-light transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <FetchSearch />

          <Link
            href="/account"
            aria-label="Account"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-light hover:text-white transition shadow-sm"
          >
            <UserCircle2
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          <CartButton />
        </div>
      </nav>
    </header>
  );
}
