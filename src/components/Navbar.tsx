"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#cbc6bd]/30 shadow-sm font-sans">
        <div className="h-20 max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group text-left">
              <div className="w-9 h-9 bg-[#1c1b19] rounded-lg flex items-center justify-center text-[#cbb392] shadow-sm border border-[#715a3e]/40 group-hover:bg-[#715a3e] group-hover:text-[#ffffff] transition-all duration-300 shrink-0">
                <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V3M5 21V3M5 12h14M3 21h18M3 3h18" />
                </svg>
              </div>
              <span className="font-bold text-sm sm:text-lg md:text-xl text-[#1a1c1a] font-sans">
                Havenley <span className="text-[#715a3e]">Infrastructure</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-semibold font-sans">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 transition-colors ${isActive
                    ? "text-[#000000] font-bold border-b-2 border-[#715a3e]"
                    : "text-[#494740] hover:text-[#1a1c1a]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => setIsMeetingModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center bg-[#000000] text-[#ffffff] text-[11px] font-bold px-6 py-3 hover:bg-[#715a3e] transition-all duration-300 shadow-sm font-sans"
            >
              Schedule Meeting
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#1a1c1a] p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#faf9f6] border-b border-[#cbc6bd] px-6 py-4 space-y-3 font-sans text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 ${isActive ? "text-[#000000] font-bold" : "text-[#494740]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMeetingModalOpen(true);
              }}
              className="block w-full bg-[#000000] text-[#ffffff] py-2.5 text-xs sm:text-sm text-center mt-2 font-bold tracking-wider rounded-lg"
            >
              Schedule Meeting
            </button>
          </div>
        )}
      </header>

      {/* Reusable Schedule Meeting Modal Popup Component */}
      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      />
    </>
  );
}
