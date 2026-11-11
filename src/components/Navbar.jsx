"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Logo />

        

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <Link
            href="/upcoming-events"
            className="hover:text-green-600"
          >
            Upcoming Events
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="btn btn-ghost btn-circle md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>


       
        <div className="flex w-full justify-end border-t border-base-300 pt-3 md:w-auto md:border-0 md:pt-0">
          <UserMenu />
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 border-t border-base-300 px-6 py-5 md:hidden"
        >
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/upcoming-events" onClick={closeMenu}>
            Upcoming Events
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;