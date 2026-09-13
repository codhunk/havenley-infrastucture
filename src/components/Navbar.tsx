"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-[#715a3e]/40 shrink-0 relative bg-[#1c1b19]">
                <Image
                  src="/logo.svg"
                  alt="Havenley Infrastructure Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
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
