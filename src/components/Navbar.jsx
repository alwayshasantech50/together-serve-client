"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        <Logo />



        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <Link href="/upcoming-events" className="hover:text-green-600">
            Upcoming Events
          </Link>

          <Link
            href="/login"
            className="btn rounded-full border-0 bg-green-700 px-6 text-white hover:bg-green-800"
          >
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />



          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>




      {/* Mobile navigation */}
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

          <Link
            href="/login"
            onClick={closeMenu}
            className="btn rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;