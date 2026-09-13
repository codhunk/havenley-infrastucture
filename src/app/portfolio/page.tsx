"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [dossierRequested, setDossierRequested] = useState(false);

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let res = await fetch("/api/projects");
      let data = await res.json();

      if (data.success && data.data.length === 0) {
        await fetch("/api/seed");
        res = await fetch("/api/projects");
        data = await res.json();
      }

      if (data.success && data.data.length > 0) {
        setProjectsList(data.data);
      } else {
        setProjectsList(defaultProjects);
      }
    } catch (err) {
      console.error("Failed to fetch API projects:", err);
      setProjectsList(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const defaultProjects = [
    {
      id: "vasant-vihar",
      code: "DEL — 01",
      title: "Vasant Vihar Luxury Villa",
      category: "residences millwork",
      type: "Turnkey Villa & Interiors • 2024",
      location: "New Delhi, India",
      surface: "650 m²",
      image: "/images/villa_miramar.jpg",
      description:
        "Turnkey civil construction and luxury interior transformation featuring Italian marble flooring, teak wood cabinetry, and open-plan acoustic design.",
      tags: ["Italian Marble", "Teak Woodwork", "Acoustics"],
      details: [
        "Reinforced concrete civil foundation and pillar structure",
        "Imported Bottochino Italian marble flooring in living areas",
        "Custom teak wood wall panelling and false ceiling cove lighting",
      ],
    },
    {
      id: "cyber-city",
      code: "GUR — 02",
      title: "Cyber City Corporate Suite",
      category: "infrastructure millwork",
      type: "Commercial Office Fitout • 2024",
      location: "Gurugram, India",
      surface: "480 m²",
      image: "/images/tribeca_penthouse.jpg",
      description:
        "Complete commercial interior workspace design featuring double-glazed acoustic glass partitions, warm timber wall paneling, and LED chandeliers.",
      tags: ["Acoustic Glass", "Solid Timber", "Smart HVAC"],
      details: [
        "Double-glazed acoustic glass cabins for executive privacy",
        "Custom solid wood reception desk with statement lighting",
        "Integrated smart climate control and biometric access control",
      ],
    },
    {
      id: "golf-course",
      code: "GUR — 03",
      title: "Golf Course Road Penthouse",
      category: "residences millwork",
      type: "Penthouse Transformation • 2023",
      location: "Gurugram, India",
      surface: "380 m²",
      image: "/images/maison_saint_germain.jpg",
      description:
        "High-end luxury apartment redesign with false ceiling light coves, quartz kitchen island, concealed storage millwork, and smart automation.",
      tags: ["Calacatta Quartz", "Fluted Wood", "Automation"],
      details: [
        "Monolithic Calacatta quartz kitchen island with brass highlights",
        "Concealed pivot doors seamlessly integrated in fluted paneling",
        "Complete mobile app automation for lighting and curtains",
      ],
    },
  ];

  const displayProjects = projectsList.length > 0 ? projectsList : defaultProjects;

  const filteredProjects = displayProjects.filter((project) => {
    if (activeFilter === "all") return true;
    const cat = project.category || project.tag || "";
    return cat.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const handleRequestDossier = () => {
    setDossierRequested(true);
    setTimeout(() => setDossierRequested(false), 4000);
  };

  return (
    <div className="w-full bg-[#faf9f6] text-[#1a1c1a] min-h-screen relative">
      {/* Toast Feedback */}
      {dossierRequested && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b19] text-[#faf9f6] px-6 py-4 rounded-none shadow-2xl border-l-4 border-[#715a3e] font-sans text-sm uppercase">
          ✓ Architectural Dossier Download link transmitted to your email.
        </div>
      )}

      {/* HEADER NAVIGATION */}
      <Navbar />

      <main className="w-full pt-20">
        <div className="flex flex-col w-full">
          {/* Architectural Manifesto & Hero Intro */}
          <section className="relative w-full px-5 md:px-12 lg:px-20 pt-16 pb-20 bg-[#faf9f6]">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div className="max-w-4xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-[#715a3e]" />
                    <span className="text-sm font-semibold text-[#715a3e] uppercase">
                      Portfolio Index
                    </span>
                    <span className="text-sm text-[#494740]">/ Vol. IV</span>
                  </div>
                  <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1a]">
                    Selected Works & Spatial Studies
                  </h1>
                  <p className="text-sm font-semibold text-[#715a3e] uppercase pt-2">
                    Archival Monograph • 2018—2025
                  </p>
                </div>

                <div className="max-w-md space-y-3 bg-[#f4f3f0] p-6 shadow-sm border border-[#cbc6bd]/30 transform-gpu isolate">
                  <p className="text-sm text-[#494740]">
                    We engineer and build end-to-end architectural environments spanning civil infrastructure, turnkey commercial developments, and bespoke luxury interiors with rigorous structural excellence and unhurried artisanal craftsmanship.
                  </p>
                  <div className="flex items-center gap-6 pt-2 text-sm text-[#1a1c1a] flex-wrap sm:flex-nowrap">
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={28} />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Global Sites</span>
                    </div>
                    <div className="w-px h-6 bg-[#e3e2e0] shrink-0" />
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={6} />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Capitals</span>
                    </div>
                    <div className="w-px h-6 bg-[#e3e2e0] shrink-0" />
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={100} suffix="%" />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Bespoke Millwork</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Controls & View Switcher */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 bg-[#f4f3f0] px-6 py-3 shadow-sm border border-[#cbc6bd]/40">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 ${activeFilter === "all"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    All Works <span className="opacity-60 ml-1">(28)</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter("residences")}
                    className={`px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 ${activeFilter === "residences"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Civil & Structural Builds{" "}
                    <span className="opacity-60 ml-1">(14)</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter("hospitality")}
                    className={`px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 ${activeFilter === "hospitality"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Commercial & Residential{" "}
                    <span className="opacity-60 ml-1">(8)</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter("heritage")}
                    className={`px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 ${activeFilter === "heritage"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Infrastructure Projects{" "}
                    <span className="opacity-60 ml-1">(6)</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter("millwork")}
                    className={`px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 ${activeFilter === "millwork"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Luxury Turnkey Interiors{" "}
                    <span className="opacity-60 ml-1">(12)</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-[#e9e8e5] p-1 self-end md:self-auto border border-[#cbc6bd]/40">
                  <button
                    aria-label="Grid View"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid"
                      ? "bg-[#faf9f6] text-[#000000] shadow-xs"
                      : "text-[#494740] hover:text-[#000000]"
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      grid_view
                    </span>
                  </button>
                  <button
                    aria-label="List View"
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list"
                      ? "bg-[#faf9f6] text-[#000000] shadow-xs"
                      : "text-[#494740] hover:text-[#000000]"
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      view_agenda
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Project Showcase Container */}
          <section className="w-full px-5 md:px-12 lg:px-20 pb-28 bg-[#faf9f6]">
            <div className="max-w-[1600px] mx-auto">
              {/* Grid Mode Display */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <article
                      key={project._id || project.id || project.slug || index}
                      onClick={() => setSelectedProject(project)}
                      className="group flex flex-col bg-[#ffffff] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#cbc6bd]/40 cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#efeeeb]">
                        <img
                          alt={project.title}
                          src={project.image}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-[#faf9f6]/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase text-[#1a1c1a]">
                          {project.code || "ARCH"}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-[#000000]/90 backdrop-blur-sm text-[#ffffff] px-3 py-1 text-[10px] uppercase font-semibold">
                          {project.surface || project.footprint}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between bg-[#f4f3f0] space-y-4">
                        <div>
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-[10px] font-semibold text-[#715a3e] uppercase">
                              {project.type || project.scope || project.tag}
                            </span>
                            <span className="text-[10px] text-[#494740]">
                              {project.location}
                            </span>
                          </div>
                          <h2 className="font-sans font-bold text-xl text-[#1a1c1a] group-hover:text-[#715a3e] transition-colors">
                            {project.title}
                          </h2>
                          <p className="text-sm text-[#494740] mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-2 space-y-3">
                          <div className="flex items-center justify-between pt-2 border-t border-[#cbc6bd]/30">
                            <span className="text-[11px] font-semibold uppercase text-[#000000] group-hover:underline underline-offset-4">
                              Explore Monograph &rarr;
                            </span>
                            <span className="material-symbols-outlined text-sm text-[#715a3e]">
                              north_east
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* Architectural List Mode Display */
                <div className="flex flex-col divide-y divide-[#e3e2e0] bg-[#ffffff] shadow-sm border border-[#cbc6bd]/40">
                  <div className="grid grid-cols-12 px-6 py-4 text-[11px] font-semibold text-[#715a3e] uppercase bg-[#f4f3f0]">
                    <span className="col-span-1">Ref</span>
                    <span className="col-span-4">Project / Typology</span>
                    <span className="col-span-3">Location & Year</span>
                    <span className="col-span-2">Surface Area</span>
                    <span className="col-span-2 text-right">Action</span>
                  </div>

                  {filteredProjects.map((project, index) => (
                    <div
                      key={project._id || project.id || project.slug || index}
                      onClick={() => setSelectedProject(project)}
                      className="grid grid-cols-12 items-center px-6 py-5 hover:bg-[#f4f3f0] transition-colors group cursor-pointer"
                    >
                      <span className="col-span-1 text-sm text-[#494740]">
                        {project.code}
                      </span>
                      <div className="col-span-4">
                        <h3 className="font-sans font-bold text-xl text-[#1a1c1a] group-hover:text-[#715a3e] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-[#494740]">
                          {project.type}
                        </p>
                      </div>
                      <div className="col-span-3 text-sm text-[#494740]">
                        {project.location}
                      </div>
                      <div className="col-span-2 text-sm font-semibold text-[#000000]">
                        {project.surface}
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-sm font-semibold uppercase text-[#715a3e] group-hover:underline">
                          View File &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div> 
              )}
            </div>
          </section>

          {/* Deep Dive Case Study Feature: Vasant Vihar Villa */}
          <section className="w-full bg-[#f4f3f0] py-24 px-5 md:px-12 lg:px-20 border-t border-[#cbc6bd]/40">
            <div className="max-w-[1600px] mx-auto space-y-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#e3e2e0]">
                <div>
                  <span className="text-sm font-semibold text-[#715a3e] uppercase block mb-2">
                    Monographic Deep Dive • 01/28
                  </span>
                  <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1a1c1a]">
                    Spatial Anatomy: Vasant Vihar Villa
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#494740]">
                  <span>Typology: Heritage & Monolithic Millwork</span>
                  <span>•</span>
                  <span className="text-[#715a3e] font-semibold">
                    Full Dossier
                  </span>
                </div>
              </div>

              {/* Asymmetric Editorial Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Visual Showcase */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="relative w-full aspect-[16/11] bg-[#faf9f6] overflow-hidden shadow-md border border-[#cbc6bd]/40">
                    <img
                      alt="Vasant Vihar Villa Salon"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPHdz16ZrKWe2oYrGElDyCweHsWf9bRE_oTD7OKH2lL-s51oIRZiOGTWrvav3MNErLUXsyXAUlPJKSAc1nKacWT4q575zVH0RnRmrYWAT0OtReARAwD7I1K7nnha5wxD7eihbQb1CINVr7o_OGRfJQ87mu7RUSbcBRLUfE22DHNZOz4Zb56k1uUffFTulZ3cyCZBVQ6Qb3-1dQpEbnROU4fDKcXyvpD_OuNFCpEw9mFbO2HEvZ4soV"
                    />
                    <div className="absolute top-6 left-6 bg-[#faf9f6]/90 backdrop-blur-md px-4 py-2 text-sm uppercase text-[#1a1c1a] shadow-xs">
                      Primary Living Pavilion • Level 01
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 bg-[#000000]/95 text-[#ffffff] p-4 backdrop-blur-md flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#715a3e]">
                          architecture
                        </span>
                        <div>
                          <div className="text-sm uppercase font-semibold">
                            Axonometric Distribution Scheme
                          </div>
                          <div className="text-[11px] text-[#868380]">
                            Radial solar axis aligned with cour d'honneur
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-[#715a3e] uppercase font-semibold">
                        Plate 14-B
                      </span>
                    </div>
                  </div>

                  {/* SVG Floorplan Spatial Distribution Diagram */}
                  <div className="bg-[#efeeeb] p-6 shadow-xs flex flex-col space-y-3 border border-[#cbc6bd]/40">
                    <div className="flex items-center justify-between text-sm uppercase text-[#1a1c1a] font-semibold">
                      <span>Spatial Partition & Circulation Diagram</span>
                      <span className="text-[#715a3e]">Scale 1:100</span>
                    </div>
                    <div className="w-full h-44 bg-[#faf9f6] p-4 flex items-center justify-center overflow-hidden border border-[#cbc6bd]/30">
                      <svg
                        className="w-full h-full text-[#1a1c1a]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        viewBox="0 0 700 180"
                      >
                        <rect
                          x="20"
                          y="15"
                          width="660"
                          height="150"
                          strokeDasharray="4 4"
                          strokeOpacity="0.3"
                        />
                        <rect
                          x="30"
                          y="25"
                          width="220"
                          height="130"
                          strokeWidth="1.8"
                        />
                        <text
                          x="140"
                          y="95"
                          fill="currentColor"
                          stroke="none"
                          fontFamily="var(--font-poppins), 'Poppins', sans-serif"
                          fontSize="10"
                          letterSpacing="1"
                          textAnchor="middle"
                        >
                          GRAND LIVING SALON (CUSTOM TEAK WOODWORK)
                        </text>
                        <circle
                          cx="340"
                          cy="90"
                          r="45"
                          strokeWidth="1.5"
                          strokeOpacity="0.8"
                        />
                        <text
                          x="340"
                          y="93"
                          fill="currentColor"
                          stroke="none"
                          fontFamily="var(--font-poppins), 'Poppins', sans-serif"
                          fontSize="9"
                          letterSpacing="1.5"
                          textAnchor="middle"
                        >
                          CALACATTA FORUM
                        </text>
                        <rect
                          x="430"
                          y="25"
                          width="240"
                          height="60"
                          strokeWidth="1.5"
                        />
                        <text
                          x="550"
                          y="60"
                          fill="currentColor"
                          stroke="none"
                          fontFamily="var(--font-poppins), 'Poppins', sans-serif"
                          fontSize="9"
                          letterSpacing="1"
                          textAnchor="middle"
                        >
                          MASTER APARTMENT
                        </text>
                        <rect
                          x="430"
                          y="95"
                          width="240"
                          height="60"
                          strokeWidth="1.5"
                        />
                        <text
                          x="550"
                          y="130"
                          fill="currentColor"
                          stroke="none"
                          fontFamily="var(--font-poppins), 'Poppins', sans-serif"
                          fontSize="9"
                          letterSpacing="1"
                          textAnchor="middle"
                        >
                          ARCHIVAL LIBRARY & ATELIER
                        </text>
                        <line
                          x1="20"
                          y1="90"
                          x2="680"
                          y2="90"
                          stroke="#715a3e"
                          strokeWidth="1"
                          strokeDasharray="2 3"
                        />
                        <circle
                          cx="340"
                          cy="90"
                          r="3"
                          fill="#715a3e"
                          stroke="none"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#494740]">
                      <span>• Dual-aspect light ingress (North/South)</span>
                      <span>
                        • Concealed service spine & structural storage
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytical Pillars */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e] uppercase block mb-2">
                        01 / The Challenge
                      </span>
                      <h3 className="font-sans font-bold text-xl text-[#1a1c1a] mb-2">
                        Preserving Heritage Under Seismic Code
                      </h3>
                      <p className="text-sm text-[#494740]">
                        The classified 1740s timber framing had sustained two centuries of structural deflection. Installing 6 metric tons of sculpted Italian stone required an independent steel cradle concealed within acoustic subflooring.
                      </p>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e] uppercase block mb-2">
                        02 / Spatial Strategy
                      </span>
                      <h3 className="font-sans font-bold text-xl text-[#1a1c1a] mb-2">
                        Radial Volume & Unbroken Horizons
                      </h3>
                      <p className="text-sm text-[#494740]">
                        By purging late-19th-century partitioned corridors, an uninterrupted 32-meter optical axis was generated, framing views from the private garden courtyards straight through to the grand salon facade.
                      </p>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e] uppercase block mb-2">
                        03 / Material Symphony
                      </span>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] uppercase">
                            Stone
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Calacatta Viola
                          </div>
                        </div>
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] uppercase">
                            Timber
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Fumed French Oak
                          </div>
                        </div>
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] uppercase">
                            Metal
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Hand-Aged Brass
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e] uppercase block mb-2">
                        04 / The Outcome
                      </span>
                      <p className="text-sm text-[#494740]">
                        An unapologetically monastic interior that respects the dignity of French neoclassicism while providing absolute acoustic serenity and state-of-the-art ambient thermal regulation.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#efeeeb] flex items-center justify-between border border-[#cbc6bd]/40">
                    <div>
                      <span className="text-sm uppercase font-semibold text-[#1a1c1a] block">
                        Request Architectural Dossier
                      </span>
                      <span className="text-[11px] text-[#494740]">
                        Includes high-res material schedules & specifications
                      </span>
                    </div>
                    <button
                      onClick={handleRequestDossier}
                      className="px-5 py-3 bg-[#000000] text-[#ffffff] text-sm font-semibold uppercase hover:bg-[#715a3e] transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>
                      <span>Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Curated Inquiries Call to Action */}
          <section className="w-full bg-[#000000] text-[#ffffff] py-24 px-5 md:px-12 lg:px-20 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center lg:text-left max-w-2xl">
                <span className="text-sm font-semibold text-[#fdddb9] uppercase block">
                  Commissions • 2025 / 2026
                </span>
                <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#ffffff]">
                  Have an architectural space in development? Let's discuss your spatial ambitions.
                </h2>
                <p className="text-sm text-[#868380] max-w-xl">
                  Havenley Infrastructure accepts a selective calendar of civil construction, structural developments, and luxury turnkey interior commissions to safeguard uncompromising material execution.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-[#715a3e] text-[#ffffff] text-sm font-semibold uppercase hover:bg-[#fdddb9] hover:text-[#281803] transition-all duration-300 shadow-md"
                >
                  Initiate Consultation
                </Link>
                <Link
                  href="/#philosophy"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-transparent text-[#ffffff] border border-[#ffffff]/20 text-sm font-semibold uppercase hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-300"
                >
                  Studio Philosophy
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Case Study Monograph Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#faf9f6] border border-[#cbc6bd] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-[#1a1c1a] hover:text-[#715a3e]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#715a3e] uppercase">
                {selectedProject.code} • {selectedProject.location}
              </span>
              <h2 className="font-sans font-bold text-3xl text-[#1a1c1a]">
                {selectedProject.title}
              </h2>
              <p className="font-sans text-base text-[#494740] italic font-semibold">
                {selectedProject.type}
              </p>
            </div>

            <div className="w-full h-72 relative overflow-hidden border border-[#cbc6bd]/40">
              <img
                alt={selectedProject.title}
                src={selectedProject.image}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#494740]">
              {selectedProject.description}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-semibold text-[#715a3e] uppercase">
                Engineering & Material Architectural Highlights:
              </h4>
              <ul className="space-y-1.5 text-sm text-[#1a1c1a]">
                {selectedProject.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#715a3e] font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#cbc6bd]/40 flex justify-between items-center">
              <span className="text-sm text-[#494740]">
                Footprint: {selectedProject.surface}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#000000] text-[#ffffff] text-sm font-semibold uppercase px-6 py-2.5 hover:bg-[#715a3e]"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
