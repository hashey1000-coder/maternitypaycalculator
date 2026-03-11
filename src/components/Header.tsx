"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CALCULATOR_NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.replace(/\/$/, "");
    return pathname === href || pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm text-slate-900 leading-tight tracking-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight">
                UK 2026/27
              </span>
            </div>
            <span className="sm:hidden font-bold text-sm text-slate-900">MPC</span>
          </Link>

          {/* Desktop Navigation — all calculators visible */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {CALCULATOR_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium px-2 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
                }`}
              >
                {link.shortLabel}
              </Link>
            ))}
            <div className="w-px h-4 bg-slate-200 mx-1.5" />
            <Link
              href="/guides/"
              className={`text-xs font-medium px-2 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                isActive("/guides/") ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
              }`}
            >
              Guides
            </Link>
            <Link
              href="/about/"
              className={`text-xs font-medium px-2 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                isActive("/about/") ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 animate-fade-in-up">
            <nav className="flex flex-col gap-0.5">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Calculators
              </div>
              {CALCULATOR_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium pl-5 transition-colors ${
                    isActive(link.href)
                      ? "text-violet-700 bg-violet-50"
                      : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/calculators/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors pl-5"
              >
                View All Calculators →
              </Link>
              <div className="border-t border-slate-100 my-1" />
              <Link
                href="/guides/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/guides/") ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
                }`}
              >
                Guides
              </Link>
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/about/") ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-violet-700 hover:bg-slate-50"
                }`}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
