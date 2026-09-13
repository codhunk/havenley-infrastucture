"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 13, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Overview",
      content: `Havenley Infrastructure ("we," "our," or "us") is dedicated to safeguarding the privacy and confidential information of our clients, atelier visitors, and website users. As a premier architectural, structural engineering, and luxury interior atelier, we maintain strict standards regarding the collection, storage, and processing of personal data. This Privacy Policy outlines our data governance practices across all digital platforms, project inquiries, and client engagements.`,
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      content: `We collect information necessary to deliver bespoke structural engineering, architectural design, and civil construction services:`,
      bullets: [
        "Personal Identification Data: Name, email address, telephone number, corporate entity details, and project location.",
        "Technical Project Specifications: Site plans, architectural blueprints, interior design preferences, and budget parameters submitted via our inquiry forms.",
        "Automated Telemetry: IP addresses, browser types, device identifiers, and page interaction metrics collected via secure analytics to optimize site performance.",
        "Communication Records: Transcripts of consultations, email exchanges, and scheduled meeting requests.",
      ],
    },
    {
      id: "information-use",
      title: "3. How We Use Your Information",
      content: `Your data is utilized strictly for professional architectural and civil engineering purposes:`,
      bullets: [
        "To evaluate structural feasibility, prepare architectural proposals, and schedule design consultations.",
        "To manage ongoing construction projects, client communication, and site inspections.",
        "To send curated updates regarding our journal, monographs, and atelier developments (only with your explicit consent).",
        "To comply with statutory regulations, building codes, and municipal permitting requirements across jurisdictions.",
      ],
    },
    {
      id: "data-protection",
      title: "4. Data Security & Confidentiality",
      content: `We employ enterprise-grade encryption protocols, secure MongoDB infrastructure with SSL/TLS encryption, and restricted internal access controls. Project blueprints and client financial details are treated as confidential assets protected under non-disclosure agreements (NDAs) where applicable.`,
    },
    {
      id: "third-party-sharing",
      title: "5. Third-Party Sharing & Disclosure",
      content: `Havenley Infrastructure does not sell, rent, or trade personal information to third parties. We may disclose data only under the following limited circumstances:`,
      bullets: [
        "Vetted Subcontractors & Consultants: Licensed structural engineers, MEP specialists, and master craftsmen bound by identical confidentiality standards.",
        "Regulatory Authorities: Municipal authorities, urban planning boards, or legal entities when required by law or official permit procedures.",
        "Cloud Service Providers: Secure cloud infrastructure providers (e.g., Cloudinary, MongoDB Atlas) that process data under strict data protection agreements.",
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies & Tracking Technologies",
      content: `Our website utilizes essential cookies and minimal analytical tools to enhance your browsing experience and remember preferences. You can adjust your browser settings to disable cookies, though certain site features may be affected.`,
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Data Choices",
      content: `You have the right to request access to, correction of, or deletion of your personal data stored in our systems. You may also unsubscribe from marketing communications at any time by contacting our privacy officer at havenleyinfrastructure@gmail.com.`,
    },
    {
      id: "contact",
      title: "8. Contact Us",
      content: `For any inquiries, privacy concerns, or data access requests regarding this policy, please contact our Legal & Compliance Team:`,
      details: [
        "Havenley Infrastructure Atelier & Headquarters",
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
              Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1a] font-sans">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-[#494740] font-normal leading-relaxed">
              Our commitment to protecting your privacy, personal data, and confidential architectural project specifications.
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
                Policy Navigation
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
                  Schedule Legal Consultation
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
                Have Questions Regarding Your Data?
              </h3>
              <p className="text-xs sm:text-sm text-[#a39f99] leading-relaxed">
                Our legal and data compliance specialists are available to answer any questions regarding non-disclosure agreements, data protection, or client confidentiality.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="mailto:havenleyinfrastructure@gmail.com"
                  className="inline-flex items-center gap-2 bg-[#715a3e] text-[#ffffff] text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#cbb392] hover:text-[#121110] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Email Privacy Desk
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#faf9f6]/10 text-[#ffffff] border border-[#faf9f6]/20 text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#faf9f6] hover:text-[#121110] transition-colors"
                >
                  Contact Atelier
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
