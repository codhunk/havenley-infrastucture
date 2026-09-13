"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Subscription failed. Please check your email.");
        setIsSubmitting(false);
        return;
      }

      setSubscribeMessage(data.message || "Subscribed to Havenley Journal.");
      setSubscribed(true);
      setNewsletterEmail("");
      setIsSubmitting(false);

      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to subscribe.");
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#121110] text-[#faf9f6] pt-14 pb-8 border-t border-[#282522] font-sans relative">
      {/* Toast Feedback */}
      {subscribed && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#cbb392] text-[#121110] px-6 py-4 text-sm font-bold  shadow-2xl border-l-4 border-[#715a3e]">
          ✓ {subscribeMessage || "Subscribed to Havenley Journal."}
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Brand & Indian Address */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-[#715a3e]/50 shrink-0 relative bg-[#1c1b19]">
                <Image
                  src="/images/logo.png"
                  alt="Havenley Infrastructure Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-base sm:text-lg  text-[#ffffff]">
                Havenley <span className="text-[#cbb392]">Infrastructure</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#a39f99] leading-relaxed max-w-md">
              Premier civil construction, structural engineering, and luxury architectural transformations in India.
            </p>
            <div className="text-xs sm:text-sm text-[#d4d0c8] space-y-1 pt-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#cbb392]  block tracking-wider">
                Delhi Atelier & Headquarters
              </span>
              <p className="text-xs sm:text-sm text-[#a39f99]">
                Barakhamba Road, Connaught Place, New Delhi – 110001, India
              </p>
              <p className="text-xs sm:text-sm text-[#a39f99]">
                Phone: +91 11 4152 8800 • Email:{" "}
                <a
                  href="mailto:havenleyinfrastructure@gmail.com"
                  className="text-[#cbb392] font-semibold hover:underline"
                >
                  havenleyinfrastructure@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#cbb392]  block tracking-wider">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#a39f99]">
              <li>
                <Link href="/" className="hover:text-[#ffffff] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#ffffff] transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ffffff] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ffffff] transition-colors">
                  Inquiries & Consult
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#cbb392] text-[#cbb392]/90 font-medium transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social Media Icons */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#cbb392]  block tracking-wider">
              Subscribe to Journal
            </span>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-xs">
              <input
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full min-w-0 bg-[#1c1b19] border border-[#383430] px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-sm text-[#ffffff] placeholder:text-[#86827a] focus:outline-none focus:border-[#cbb392] transition-colors rounded-lg"
                placeholder="Enter email address"
                type="email"
                required
              />
              <button
                disabled={isSubmitting}
                className="bg-[#715a3e] text-[#ffffff] text-[10px] sm:text-xs font-bold  px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-[#cbb392] hover:text-[#121110] transition-all duration-300 shrink-0 tracking-wider"
                type="submit"
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </form>
            {errorMsg && (
              <p className="text-xs text-red-400 font-bold mt-1">⚠ {errorMsg}</p>
            )}

            <div className="pt-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#cbb392]  block mb-3 tracking-wider">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-9 h-9 rounded-full bg-[#282522] text-[#cbb392] border border-[#383430] flex items-center justify-center hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#282522] text-[#cbb392] border border-[#383430] flex items-center justify-center hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-[#282522] text-[#cbb392] border border-[#383430] flex items-center justify-center hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter / X"
                  className="w-9 h-9 rounded-full bg-[#282522] text-[#cbb392] border border-[#383430] flex items-center justify-center hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Single Copyright */}
        <div className="pt-6 border-t border-[#282522] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#86827a]">
          <p>© 2025 Havenley Infrastructure, New Delhi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-[#cbb392] text-[#d4d0c8] font-semibold transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
              <span>Admin</span>
            </Link>
            <a href="#" className="hover:text-[#ffffff] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#ffffff] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
