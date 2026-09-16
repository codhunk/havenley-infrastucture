"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedStudio, setSelectedStudio] = useState("delhi");
  const [attachedFiles, setAttachedFiles] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingConfirmationData, setBookingConfirmationData] = useState<any | null>(null);

  const [meetingForm, setMeetingForm] = useState({
    name: "",
    email: "",
    phone: "",
    meetingDate: "",
    meetingType: "virtual",
    notes: "",
  });

  const [meetingFieldErrors, setMeetingFieldErrors] = useState<Record<string, string[]>>({});
  const [meetingApiError, setMeetingApiError] = useState<string | null>(null);
  const [isMeetingSubmitting, setIsMeetingSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    typology: "turnkey-construction",
    location: "",
    area: "300-800",
    investment: "tier-2",
    phase: "concept",
    vision: "",
    nda: true,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const openMeetingModal = () => {
    setMeetingForm({
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      meetingDate: "",
      meetingType: "virtual",
      notes: "",
    });
    setMeetingFieldErrors({});
    setMeetingApiError(null);
    setIsMeetingModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length === 1) {
        setAttachedFiles(e.target.files[0].name);
      } else {
        setAttachedFiles(`${e.target.files.length} documents attached`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSubmitting(false);
        setApiError(data.error || "Submission failed. Please check the entered data.");
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setApiError(err.message || "Network error. Please try again.");
    }
  };

  const handleBookMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMeetingSubmitting(true);
    setMeetingApiError(null);
    setMeetingFieldErrors({});

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingForm),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsMeetingSubmitting(false);
        setMeetingApiError(data.error || "Meeting booking failed. Please review entered data.");
        if (data.fieldErrors) {
          setMeetingFieldErrors(data.fieldErrors);
        }
        return;
      }

      setIsMeetingSubmitting(false);
      setIsMeetingModalOpen(false);
      setBookingConfirmationData(data.data);
      setShowBookingConfirmation(true);
    } catch (err: any) {
      setIsMeetingSubmitting(false);
      setMeetingApiError(err.message || "Network error. Please try again.");
    }
  };

  const studios = {
    delhi: {
      city: "Delhi Main Office",
      address: "Barakhamba Road, Connaught Place, New Delhi – 110001, India",
      phone: "+91 11 4152 8800",
      email: "delhi@havenley-infra.com",
      hours: "Monday – Saturday: 09:30 – 18:30 IST",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBm72o-CDzr69ox7faqdQzjgmH3sRGcYIq0LKvAvpdRvNww3NV1AnVO0G4htjOlPC9PFfrCdWXrTjDHADmnlh_1-HkK3f3xsAWzJMDE_JLfrjAW68vTuMlny0PnYPhlDOsQCEHuRME_UBXY-Is5X4wycXY9jDRMYxAgJnK50MepVfMiispTUPtegWjtJpz9QFUu1lB_SbzRBGPVKUyPS1HOp64vEgQO_JzLfVOcGJUJmQvBWhQvuusn",
      desc: "Our main Delhi office features physical marble and tile sample displays, custom woodwork models, and consultation rooms.",
    },
    gurugram: {
      city: "Gurugram Office",
      address: "DLF Cyber City, Phase 2, Gurugram, Haryana – 122002, India",
      phone: "+91 124 480 9200",
      email: "gurugram@havenley-infra.com",
      hours: "Monday – Saturday: 09:30 – 18:30 IST",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfxfXWnRuHscYPmVdbE38LprVTn4oS_DNuhSXxMG5Ztm4vGGVfrohwQ1Xbk2L5OSwSFVqgWs28Lk5msH7C-fRg8H2rrEx7nKxw_N-khjReu3bXeuVspv5-Bnk2M7Kl2OiGxlH3_EsqeNcjTmS11LegNz4VtVIH2HeUOO_ca0jjn4_o_QOyryT-o8oCLEIx90t1txjypXaPyT_rweuCX_WQkgzBMWvDFaW-rz3EGakyh0Q8YjQ3pGB6",
      desc: "Houses our 2D/3D CAD design team, civil project managers, and office partition planning team.",
    },
    mumbai: {
      city: "Mumbai Office",
      address: "Bandra Kurla Complex (BKC), Mumbai, Maharashtra – 400051, India",
      phone: "+91 22 6120 7700",
      email: "mumbai@havenley-infra.com",
      hours: "Monday – Saturday: 09:30 – 18:30 IST",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAp4dCo_4cESxlT24LckIZkRFb9venWeo79Dgd3sB5yaRyy1v-EqE0sVIBVkoMYSLSiBqC-UZlMOFoqVuRYuixC8SnXixU8JkVF97M7YP8v2IkXoXL45RXF6G0rITyiFnZQr9sQPIkNZU5KujN7cqTx3mCnLMdp5cV91m6zOjXsyCqzag7Va01WVKhogrhfy_PnqtxBrybJcgLA7cGDydn7FnYz4rPqHGcMTPMsUIvMovoZBElfZsVX",
      desc: "Specializes in residential home interiors, apartment renovations, and villa construction management.",
    },
    bengaluru: {
      city: "Bengaluru Office",
      address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka – 560038, India",
      phone: "+91 80 4312 6600",
      email: "bengaluru@havenley-infra.com",
      hours: "Monday – Saturday: 09:30 – 18:30 IST",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8xd0L9h7FkPneOvDNJGN6dUrKZ1ShGpXCyXN5O8blY4yPaXK9dCbFFZ0gPIZXNeA8vqFBi3KeD5YrkNCMqZKBgZ3SKUDD826WocRinSbS7MePiAg2TWx6YXNdlVmSLV4vQHExnBEiq9V02LuNkGOWZltbjYiL4jh8lL01hJUgLsEBE1F38hiFyUNY1V2lo_A10ZvS8_GH8eIXW3T70uYyp7pChDuFF7MYATVBEP3-GE5wzutJ_w20",
      desc: "Focuses on smart home lighting setup, modular furniture design, and commercial office space planning.",
    },
  };

  const faqs = [
    {
      q: "What types of construction and interior projects do you handle?",
      a: "We handle complete civil construction projects (foundation excavation, RCC columns, brick masonry, plastering, waterproofing) and full interior work (POP false ceilings, modular kitchens, custom wardrobes, wall decor, electrical & plumbing fittings) for homes, villas, offices, and commercial spaces.",
    },
    {
      q: "How long does a typical construction or interior project take?",
      a: "Turnkey interior setup for apartments or offices usually takes 4 to 8 weeks. Ground-up civil construction for villas and commercial buildings typically ranges from 6 to 14 months depending on project size and municipal approvals.",
    },
    {
      q: "Do you provide transparent cost estimates before starting?",
      a: "Yes. After a site survey and initial planning, we provide a clear, detailed cost estimation covering materials, labor, and timeline with no hidden charges.",
    },
    {
      q: "Do you supply modular kitchens and custom furniture?",
      a: "Yes. We manufacture and install modular kitchens, floor-to-ceiling wardrobes, TV units, executive office desks, and custom wood furniture directly from our workshop.",
    },
    {
      q: "Are client project details and privacy protected?",
      a: "Yes. We strictly respect client privacy and sign Non-Disclosure Agreements (NDAs) whenever requested.",
    },
    {
      q: "Can you manage ground-up civil construction work?",
      a: "Yes. Our experienced civil engineers manage foundation excavation, pile capping, RCC framing, brickwork, plastering, waterproofing, and complete building envelope construction.",
    },
    {
      q: "Do you use high-quality and durable materials?",
      a: "We use Grade-A reinforced steel, high-grade cement, imported Italian marble, seasoned teak wood, waterproof plywood, and zero-VOC interior paints for long-lasting quality.",
    },
    {
      q: "What warranty or post-handover support do you provide?",
      a: "Every project includes a complete inspection, testing of electrical & plumbing networks, and a post-handover warranty and maintenance support plan.",
    },
  ];

  const currentStudio = studios[selectedStudio as keyof typeof studios];

  return (
    <div className="w-full bg-[#faf9f6] text-[#1a1c1a] min-h-screen relative font-sans">
      {/* HEADER NAVIGATION */}
      <Navbar />

      <main className="w-full pt-20 font-sans">
        {/* 1. HERO INTAKE BANNER */}
        <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-16 pb-20 border-b border-[#cbc6bd]/40">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-[1px] bg-[#715a3e]" />
                  <span className="text-sm font-semibold text-[#715a3e] ">
                    Get In Touch
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[3rem] text-[#1a1c1a]">
                  Contact Us For Your Project
                </h1>
              </div>
              <div className="max-w-md pb-2">
                <p className="text-sm text-[#494740] font-normal">
                  Contact Havenley Infrastructure to discuss your civil construction build or interior design requirements. Our team is ready to assist you.
                </p>
              </div>
            </div>

            {/* Studio Presence Metric Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#f4f3f0] border border-[#cbc6bd]/40 shadow-sm">
              <div>
                <span className="text-[10px] font-semibold text-[#715a3e]  block mb-1">
                  Delhi Headquarters
                </span>
                <p className="text-xl font-semibold text-[#1a1c1a]">
                  Connaught Place
                </p>
                <span className="text-sm text-[#494740]">
                  Barakhamba Road, New Delhi
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#715a3e]  block mb-1">
                  Gurugram Studio
                </span>
                <p className="text-xl font-semibold text-[#1a1c1a]">
                  DLF Cyber City
                </p>
                <span className="text-sm text-[#494740]">
                  Phase 2, Gurugram
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#715a3e]  block mb-1">
                  Response SLA
                </span>
                <p className="text-xl font-semibold text-[#1a1c1a]">
                  48 Hours
                </p>
                <span className="text-sm text-[#494740]">
                  Direct Partner Protocol
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#715a3e]  block mb-1">
                  Privacy Protocol
                </span>
                <p className="text-xl font-semibold text-[#1a1c1a]">
                  Tier-1 NDA
                </p>
                <span className="text-sm text-[#494740]">
                  Encrypted Blueprint Vault
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EMERGENCY STRUCTURAL ADVISORY HOTLINE BANNER */}
        <section className="w-full bg-[#1c1b19] text-[#ffffff] py-6 px-5 md:px-12 lg:px-20 border-b border-[#715a3e]/40">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#fdddb9] text-2xl">
                domain_verification
              </span>
              <div>
                <span className="text-sm font-semibold text-[#fdddb9]  block">
                  Active Site & Emergency Engineering Hotline
                </span>
                <p className="text-sm text-[#868380]">
                  For urgent structural site audits or historical building stabilization: <strong className="text-[#ffffff]">+91 11 4152 8800</strong> (Delhi NCR) | <strong className="text-[#ffffff]">+91 22 6120 7700</strong> (Mumbai)
                </p>
              </div>
            </div>
            <button
              onClick={openMeetingModal}
              className="px-5 py-2.5 bg-[#715a3e] text-[#ffffff] text-sm font-semibold  hover:bg-[#fdddb9] hover:text-[#281803] transition-colors shrink-0"
            >
              Book Partner Meeting
            </button>
          </div>
        </section>

        {/* 3. MAIN CONTENT GRID */}
        <section className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN: Interactive Studio Selector & FAQs (5 Columns) */}
            <div className="lg:col-span-5 space-y-12">
              {/* Studio Locations Switcher */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold text-[#715a3e]  block mb-1">
                    Ateliers & Salons Privés
                  </span>
                  <h2 className="text-3xl font-semibold text-[#1a1c1a]">
                    Global Presences & Ateliers
                  </h2>
                </div>

                {/* City Selector Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(studios).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedStudio(key)}
                      className={`px-4 py-2.5 text-sm font-semibold  transition-all border text-left ${selectedStudio === key
                        ? "bg-[#000000] text-[#ffffff] border-[#000000] shadow-sm"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                        }`}
                    >
                      {studios[key as keyof typeof studios].city}
                    </button>
                  ))}
                </div>

                {/* Selected Studio Card */}
                <div className="bg-[#f4f3f0] p-6 border border-[#cbc6bd]/40 shadow-sm space-y-4">
                  <div className="w-full h-52 overflow-hidden border border-[#cbc6bd]/30">
                    <img
                      alt={currentStudio.city}
                      src={currentStudio.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1a1c1a]">
                    {currentStudio.city}
                  </h3>
                  <p className="text-sm text-[#494740] font-medium">
                    {currentStudio.address}
                  </p>
                  <p className="text-sm text-[#494740]">
                    {currentStudio.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#cbc6bd]/30 text-sm">
                    <div className="flex items-center gap-2 text-[#494740]">
                      <span className="material-symbols-outlined text-lg text-[#715a3e]">
                        call
                      </span>
                      <a
                        href={`tel:${currentStudio.phone}`}
                        className="font-semibold text-[#1a1c1a] hover:text-[#715a3e] transition-colors"
                      >
                        {currentStudio.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#494740]">
                      <span className="material-symbols-outlined text-lg text-[#715a3e]">
                        mail
                      </span>
                      <a
                        href={`mailto:${currentStudio.email}`}
                        className="font-semibold text-[#715a3e] hover:underline"
                      >
                        {currentStudio.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#494740] pt-1">
                      <span className="material-symbols-outlined text-lg text-[#715a3e]">
                        schedule
                      </span>
                      <span>{currentStudio.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Commission FAQ Accordion */}
              <div className="space-y-4 pt-4">
                <div>
                  <span className="text-sm font-semibold text-[#715a3e]  block mb-1">
                    Advisory Inquiries
                  </span>
                  <h2 className="text-3xl font-semibold text-[#1a1c1a]">
                    Commission FAQ & Guidelines
                  </h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f4f3f0] border border-[#cbc6bd]/40 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <span className="font-semibold text-sm text-[#1a1c1a]">
                          {faq.q}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[#715a3e] shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""
                            }`}
                        >
                          expand_more
                        </span>
                      </button>
                      {openFaq === idx && (
                        <div className="px-4 pb-4 text-[#494740] text-sm border-t border-[#cbc6bd]/30 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Bespoke Project Intake Form (7 Columns) */}
            <div className="lg:col-span-7 bg-[#f4f3f0] p-6 md:p-10 border border-[#cbc6bd]/40 shadow-sm space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#715a3e] ">
                    Project Intake
                  </span>
                  <span className="text-[10px] font-semibold text-[#494740] bg-[#faf9f6] px-3 py-1  border border-[#cbc6bd]/40">
                    Encrypted Protocol
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1a1c1a]">
                  Commission Request & Scope Intake
                </h2>
                <p className="text-sm text-[#494740] mt-2">
                  Please detail your spatial intentions and project parameters for civil construction engineering, structural builds, or luxury interior commissions. A partner architect will respond within two business days.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {apiError && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 text-sm font-semibold mb-4 shadow-sm flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-600 text-xl">error</span>
                      <div>
                        <p className="font-semibold">{apiError}</p>
                        <p className="text-xs font-normal text-red-700 mt-0.5">Please check your inputs and try again.</p>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Principal Identification */}
                  <div className="space-y-4">
                    <span className="text-sm font-semibold text-[#715a3e]  block border-b border-[#cbc6bd]/40 pb-2">
                      01. Principal & Entity Details
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Principal Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: [] });
                          }}
                          placeholder="e.g. Lord Sterling"
                          className={`w-full bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border shadow-sm ${fieldErrors.name?.length ? "border-red-600 bg-red-50/20" : "border-[#cbc6bd]/40"}`}
                        />
                        {fieldErrors.name?.length ? (
                          <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                            <span>⚠</span> {fieldErrors.name[0]}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Family Office / Firm Entity
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organization: e.target.value,
                            })
                          }
                          placeholder="Optional / Private Family Trust"
                          className="w-full bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border border-[#cbc6bd]/40 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Direct Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: [] });
                          }}
                          placeholder="name@domain.com"
                          className={`w-full bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border shadow-sm ${fieldErrors.email?.length ? "border-red-600 bg-red-50/20" : "border-[#cbc6bd]/40"}`}
                        />
                        {fieldErrors.email?.length ? (
                          <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                            <span>⚠</span> {fieldErrors.email[0]}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Direct Telephone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: [] });
                          }}
                          placeholder="+1 (000) 000-0000"
                          className={`w-full bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border shadow-sm ${fieldErrors.phone?.length ? "border-red-600 bg-red-50/20" : "border-[#cbc6bd]/40"}`}
                        />
                        {fieldErrors.phone?.length ? (
                          <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                            <span>⚠</span> {fieldErrors.phone[0]}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Project Parameters */}
                  <div className="space-y-4 pt-2">
                    <span className="text-sm font-semibold text-[#715a3e]  block border-b border-[#cbc6bd]/40 pb-2">
                      02. Project Typology & Location
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Project Typology *
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.typology}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                typology: e.target.value,
                              })
                            }
                            className="w-full appearance-none bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] focus:outline-none focus:bg-[#ffffff] transition-colors border border-[#cbc6bd]/40 shadow-sm cursor-pointer pr-10"
                          >
                            <option value="turnkey-civil-construction">
                              Ground-Up Civil Build (Foundation, RCC, Masonry & Plastering)
                            </option>
                            <option value="interior-finishing-furnishing">
                              Complete Interior Work (POP, False Ceilings, Furniture & Kitchens)
                            </option>
                            <option value="residential-construction-interiors">
                              Residential Villa & Apartment Build & Interiors
                            </option>
                            <option value="commercial-office-interiors">
                              Commercial & Office Interior Execution
                            </option>
                            <option value="renovation-waterproofing-civil">
                              Civil Renovation, Waterproofing & Exterior Finishing
                            </option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-[#494740] text-lg">
                            unfold_more
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Project Location (City, Country) *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g. Saint-Moritz, Switzerland"
                          className="w-full bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border border-[#cbc6bd]/40 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Scale & Budget Allocation */}
                  <div className="space-y-4 pt-2">
                    <span className="text-sm font-semibold text-[#715a3e]  block border-b border-[#cbc6bd]/40 pb-2">
                      03. Estimated Scale & Investment Allocation
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Estimated Surface Area *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["under-300", "300-800", "800-plus"].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, area: val })
                              }
                              className={`p-3 text-center transition-colors text-[10px]  font-semibold border shadow-sm ${formData.area === val
                                ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                                : "bg-[#faf9f6] text-[#494740] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                                }`}
                            >
                              {val === "under-300"
                                ? "< 300 m²"
                                : val === "300-800"
                                  ? "300–800 m²"
                                  : "800+ m²"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                          Investment Tier *
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.investment}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                investment: e.target.value,
                              })
                            }
                            className="w-full appearance-none bg-[#faf9f6] px-4 py-3.5 text-sm text-[#1a1c1a] focus:outline-none focus:bg-[#ffffff] transition-colors border border-[#cbc6bd]/40 shadow-sm cursor-pointer pr-10"
                          >
                            <option value="tier-1">$250,000 – $500,000</option>
                            <option value="tier-2">$500,000 – $1,500,000</option>
                            <option value="tier-3">$1,500,000 – $3,000,000</option>
                            <option value="tier-4">$3,000,000 + (Masterworks)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-[#494740] text-lg">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Narrative & CAD Upload */}
                  <div className="space-y-4 pt-2">
                    <span className="text-sm font-semibold text-[#715a3e]  block border-b border-[#cbc6bd]/40 pb-2">
                      04. Spatial Vision & Blueprint Files
                    </span>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                        Spatial Narrative & Site Context *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.vision}
                        onChange={(e) => {
                          setFormData({ ...formData, vision: e.target.value });
                          if (fieldErrors.vision) setFieldErrors({ ...fieldErrors, vision: [] });
                        }}
                        placeholder="Describe physical context, material preferences (e.g. Navona travertine, smoked oak, unlacquered bronze), daylight objectives, and lifestyle intentions..."
                        className={`w-full bg-[#faf9f6] p-4 text-sm text-[#1a1c1a] placeholder:text-[#494740]/40 focus:outline-none focus:bg-[#ffffff] transition-colors border resize-none shadow-sm ${fieldErrors.vision?.length ? "border-red-600 bg-red-50/20" : "border-[#cbc6bd]/40"}`}
                      />
                      {fieldErrors.vision?.length ? (
                        <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                          <span>⚠</span> {fieldErrors.vision[0]}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-[#1a1c1a]  block">
                        CAD Drawings, Floorplans, or PDFs (Optional)
                      </label>
                      <div className="relative bg-[#faf9f6] p-6 text-center cursor-pointer hover:bg-[#ffffff] transition-all border border-dashed border-[#cbc6bd] shadow-sm">
                        <input
                          type="file"
                          multiple
                          id="file-upload"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[#715a3e] text-3xl">
                            architecture
                          </span>
                          <div className="text-sm font-semibold text-[#1a1c1a]">
                            {attachedFiles ||
                              "Drag & drop CAD elevations, DWG blueprints, or PDF mood boards"}
                          </div>
                          <span className="text-[10px] text-[#494740]">
                            Supported: PDF, DWG, DXF, TIFF, PNG (Max 50MB)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Mutual NDA Discretion Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      required
                      type="checkbox"
                      id="nda-agree"
                      checked={formData.nda}
                      onChange={(e) =>
                        setFormData({ ...formData, nda: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded-none accent-[#000000] cursor-pointer"
                    />
                    <label
                      htmlFor="nda-agree"
                      className="text-sm text-[#494740] select-none"
                    >
                      I agree to the execution of bilateral non-disclosure agreements prior to schematic presentations. Client identity and CAD blueprints remain encrypted and strictly confidential.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#000000] text-[#ffffff] text-sm font-semibold  py-4 hover:bg-[#715a3e] transition-colors duration-300 flex items-center justify-center gap-3 shadow-md"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Dossier to Partner Vault...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <span className="material-symbols-outlined text-base">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="material-symbols-outlined text-[16px] text-[#715a3e]">
                        verified_user
                      </span>
                      <span className="text-[10px] text-[#494740]">
                        Encrypted 256-bit Transmission • Partner Review Guarantee
                      </span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success Confirmation Box */
                <div className="p-8 bg-[#fdddb9] text-[#786044] shadow-sm border border-[#e0c29f] space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#715a3e] text-3xl">
                      check_circle
                    </span>
                    <h4 className="text-2xl font-semibold text-[#1a1c1a]">
                      Commission Intake Confirmed
                    </h4>
                  </div>
                  <p className="text-sm text-[#494740]">
                    Thank you for submitting your spatial parameters. A senior partner architect from our New Delhi atelier will review your blueprint documents and contact you within 48 hours to schedule an initial dialogue.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-3 bg-[#000000] text-[#ffffff] text-sm font-semibold "
                  >
                    Submit Another Project Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. MATERIALITY & CRAFT BANNER */}
        <section className="w-full bg-[#e9e8e5] py-16 border-t border-[#cbc6bd]/40">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[#715a3e] ">
                  Monastic Precision
                </span>
                <h3 className="text-2xl font-semibold text-[#1a1c1a]">
                  Material Permanence & Provenance
                </h3>
                <p className="text-sm text-[#494740]">
                  Every Havenley Infrastructure build is derived from the elemental character of raw stone, post-tensioned structural integrity, and acoustic spatial resonance.
                </p>
              </div>
              <div className="relative h-64 overflow-hidden shadow-sm border border-[#cbc6bd]/30">
                <img
                  alt="Travertine Craft"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqIZZtUcBW-K0qyPR0_U2SHBrcPPus1QB99YVmi0svB-7g9vUTn0bux8IQkbQOG0fqdhXsRojB0dIiMF0-sZCfn0iJiI9w9CSF_ZhMTd7ro98vS4X_7-4elU4m0Xv10mQo5FfGqCZF8FIyHvr5_RRj3I_5DTYGf4-AaMyC_QM42WE6NUbVmJQzN8yJiOT0Yv5BTGSz44bbqyXNzVsm9mSiyYszdDUOhhTMZSlopDhlUx3hiDdUd9Do"
                />
              </div>
              <div className="relative h-64 overflow-hidden shadow-sm border border-[#cbc6bd]/30">
                <img
                  alt="Walnut Model Craft"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbpPsmUPhvPGPXKTZk0EOQ5vtkZtloB_6I8iYc0m4Evs5LbkrtdedAnb3pM0DQi2uvkprtE3xTHbmS1-0I-2j7eBAOLNvSXrTwsmEKfrD6P3FAkLIYHwWx4ZaQy1fT78hrXz94D_5PxYgtN1UfIW0PBgmOme0jhBAJ4jKsF_X8qhcj6z0nyD0WCewssLXloNc-XsFicJtK-rRm1TKKeKkdMkEOq_zutQ3Ja9IlT8XzZmJ0YVz1bCjT"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Schedule Meeting Modal Component */}
      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        initialData={{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }}
      />
    </div>
  );
}
