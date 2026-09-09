"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingType, setMeetingType] = useState("virtual");
  const [meetingBooked, setMeetingBooked] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingBooked(true);
    setTimeout(() => {
      setMeetingBooked(false);
      setIsMeetingModalOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Toast Feedback */}
      {meetingBooked && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#1c1b19] text-[#faf9f6] px-6 py-4 rounded-none shadow-2xl border-l-4 border-[#715a3e] font-sans text-sm uppercase">
          ✓ Private Consultation Booking Confirmed. A partner will contact you directly.
        </div>
      )}

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
              <span className="font-bold text-lg md:text-xl text-[#1a1c1a] uppercase font-sans">
                Havenley <span className="text-[#715a3e]">Infrastructure</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-semibold uppercase font-sans">
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
              className="hidden sm:inline-flex items-center justify-center bg-[#000000] text-[#ffffff] text-[11px] font-bold uppercase px-6 py-3 hover:bg-[#715a3e] transition-all duration-300 shadow-sm font-sans"
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
          <div className="md:hidden bg-[#faf9f6] border-b border-[#cbc6bd] px-6 py-4 space-y-3 font-sans text-sm font-semibold uppercase">
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
              className="block w-full bg-[#000000] text-[#ffffff] py-3 text-center uppercase mt-2 font-bold"
            >
              Schedule Meeting
            </button>
          </div>
        )}
      </header>

      {/* Schedule Meeting Modal Popup Dialog */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 z-[99] bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-lg bg-[#faf9f6] border border-[#cbc6bd] p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setIsMeetingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#1a1c1a] hover:text-[#715a3e]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="space-y-1">
              <span className="text-sm font-bold text-[#715a3e] uppercase">
                Private Advisory
              </span>
              <h2 className="text-3xl font-bold text-[#1a1c1a]">
                Schedule Partner Consultation
              </h2>
              <p className="text-sm text-[#494740]">
                Select a virtual dialogue or physical meeting at our New Delhi atelier.
              </p>
            </div>

            <form onSubmit={handleBookMeeting} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block mb-1">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType("virtual")}
                    className={`p-3 text-sm font-bold uppercase border text-center transition-colors ${meetingType === "virtual"
                        ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/40"
                      }`}
                  >
                    Virtual Dialogue (Zoom)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType("physical")}
                    className={`p-3 text-sm font-bold uppercase border text-center transition-colors ${meetingType === "physical"
                        ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/40"
                      }`}
                  >
                    Atelier Salon Visit
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block mb-1">
                  Preferred Date & Time
                </label>
                <input
                  required
                  type="datetime-local"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full bg-[#f4f3f0] px-4 py-3 text-sm text-[#1a1c1a] border border-[#cbc6bd]/40 focus:outline-none focus:border-[#715a3e]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMeetingModalOpen(false)}
                  className="px-5 py-2.5 bg-[#f4f3f0] text-sm font-bold uppercase text-[#494740] hover:bg-[#e3e2e0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#000000] text-[#ffffff] text-sm font-bold uppercase hover:bg-[#715a3e] transition-colors"
                >
                  Confirm Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
