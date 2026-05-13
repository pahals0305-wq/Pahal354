"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Lists", href: "/lists" },
  { label: "Areas", href: "/areas" },
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2520] bg-[#0c0a08]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <span className="text-[#c9a84c] font-serif text-xl tracking-tight">
            Bombay Platelist
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#8a7f72] hover:text-[#f5f0e8] transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            className="text-[#8a7f72] hover:text-[#f5f0e8] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <a
            href="/join"
            className="hidden md:inline-flex items-center px-4 py-1.5 text-xs font-medium tracking-widest uppercase border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0c0a08] transition-all"
          >
            Join
          </a>
          <button
            className="md:hidden text-[#8a7f72] hover:text-[#f5f0e8]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0c0a08] border-t border-[#2a2520] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#8a7f72] hover:text-[#f5f0e8] tracking-wide uppercase py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/join"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-widest uppercase border border-[#c9a84c] text-[#c9a84c]"
          >
            Join
          </a>
        </div>
      )}
    </header>
  );
}
