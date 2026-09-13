"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  const lastUpdated = "September 13, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing, browsing, or utilizing the website, digital portals, or architectural consultation services provided by Havenley Infrastructure ("Atelier," "Company," "we," or "us"), you agree to be bound by these Terms of Service. If you do not accept these terms in full, you must refrain from using our platforms and services.`,
    },
    {
      id: "scope-of-services",
      title: "2. Scope of Services & Architectural Consultations",
      content: `Havenley Infrastructure provides civil engineering, structural design, general contracting, and luxury architectural interior transformations across residential, commercial, and infrastructure sectors.`,
      bullets: [
        "Proposals & Quotations: Project scopes, cost estimates, and timelines provided on this website or in initial consultations are preliminary and subject to formal contract execution.",
        "Engineering & Permitting: Structural engineering drawings are subject to site condition verification, soil testing, and municipal approvals.",
        "3D Renderings & Visualizations: Digital models and monographs displayed on our portfolio are artistic representations. Final executed finishes may vary based on quarried stone variations and custom millwork.",
      ],
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      content: `All content, architectural blueprints, structural design frameworks, custom joinery details, 3D renderings, photographs, trademarks, and monographs featured on this website are the exclusive intellectual property of Havenley Infrastructure. You may not reproduce, modify, distribute, or create derivative works without prior written authorization.`,
    },
    {
      id: "client-obligations",
      title: "4. Client Obligations & Site Access",
      content: `For executed construction projects and structural design contracts, clients agree to provide timely site access, necessary permits, accurate land titles, and prompt review of engineering submittals as specified in project contracts.`,
    },
    {
      id: "payment-billing",
      title: "5. Fees, Retainers & Billing",
      content: `Consultation retainers, design fee schedules, and construction milestone payments are governed by individual architectural service agreements. Invoices are payable in accordance with agreed progress billing schedules.`,
    },
    {
      id: "limitation-liability",
      title: "6. Limitation of Liability",
      content: `Havenley Infrastructure shall not be liable for any indirect, incidental, consequential, or punitive damages arising from site access delays, third-party material delivery disruptions, or unauthorized site modifications performed by unapproved contractors.`,
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Dispute Resolution",
      content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any legal proceedings or disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.`,
    },
    {
      id: "contact",
      title: "8. Legal Contact Information",
      content: `If you have questions regarding these Terms of Service or wish to request formal contract documentation, please contact our Legal Atelier:`,
      details: [
        "Havenley Infrastructure Legal & Contracts Desk",
        "Barakhamba Road, Connaught Place, New Delhi – 110001, India",
        "Phone: +91 11 4152 8800",
        "Email: havenleyinfrastructure@gmail.com",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-sans flex flex-col">
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-32 pb-16 px-5 md:px-12 lg:px-20 bg-[#f4f3f0] border-b border-[#cbc6bd]/40">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-[#1c1b19] text-[#cbb392] text-xs font-bold px-3.5 py-1.5 uppercase tracking-widest rounded-md">
              Legal & Terms
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1a] font-sans">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-[#494740] font-normal leading-relaxed">
              General terms, contractual guidelines, and intellectual property provisions governing our architectural and structural engineering services.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#715a3e] font-semibold">
              <span>Last Updated: {lastUpdated}</span>
              <span>•</span>
              <span>Havenley Infrastructure Atelier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 px-5 md:px-12 lg:px-20 flex-1">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Quick Navigation Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 bg-[#ffffff] border border-[#cbc6bd]/40 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#715a3e] uppercase tracking-wider">
                Terms Navigation
              </h3>
              <nav className="space-y-2 text-xs font-semibold">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-3 text-[#494740] hover:text-[#1a1c1a] hover:bg-[#faf9f6] rounded-lg transition-colors"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="pt-4 border-t border-[#cbc6bd]/30">
                <Link
                  href="/contact"
                  className="block text-center bg-[#000000] text-[#ffffff] text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-[#715a3e] transition-colors"
                >
                  Book Inquiries & Consult
                </Link>
              </div>
            </div>
          </aside>

          {/* Policy Detail Content Body */}
          <main className="lg:col-span-8 space-y-12 max-w-3xl">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 bg-[#ffffff] border border-[#cbc6bd]/40 p-8 rounded-2xl shadow-sm space-y-4"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#1a1c1a] font-sans">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base text-[#494740] leading-relaxed">
                  {section.content}
                </p>

                {section.bullets && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-[#494740] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.details && (
                  <div className="bg-[#faf9f6] border border-[#cbc6bd]/40 p-4 rounded-xl space-y-1 pt-3 text-xs sm:text-sm text-[#1a1c1a] font-medium">
                    {section.details.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {/* Bottom Support Banner */}
            <div className="bg-[#1c1b19] text-[#faf9f6] p-8 rounded-2xl space-y-4 shadow-md">
              <h3 className="text-lg font-bold text-[#ffffff]">
                Require Architectural Proposal Clarifications?
              </h3>
              <p className="text-xs sm:text-sm text-[#a39f99] leading-relaxed">
                Contact our contracts desk to discuss bespoke residential estate engineering agreements, commercial interior fitout scope documents, or structural design retainers.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="mailto:havenleyinfrastructure@gmail.com"
                  className="inline-flex items-center gap-2 bg-[#715a3e] text-[#ffffff] text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#cbb392] hover:text-[#121110] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Email Contracts Desk
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#faf9f6]/10 text-[#ffffff] border border-[#faf9f6]/20 text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#faf9f6] hover:text-[#121110] transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}
