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
      category: "civil interior residential",
      type: "Ground-up Civil Build & Interior Fitout • 2024",
      location: "New Delhi, India",
      surface: "650 m²",
      image: "/images/villa_miramar.jpg",
      description:
        "Turnkey civil construction and luxury interior setup featuring RCC structural framing, red brickwork masonry, POP false ceiling coves, Italian Bottochino marble flooring, and modular kitchen interiors.",
      tags: ["RCC Framing", "POP False Ceiling", "Modular Kitchen", "Italian Marble"],
      details: [
        "Deep excavation, pile foundation & seismic Grade-A RCC structural columns",
        "Red brickwork masonry, waterproof plastering & exterior weather-proof coating",
        "Gypsum false ceiling coves with POP decorative mouldings & ambient lighting",
        "Modular kitchen setup, custom teak wardrobes, doors & windows, electrical & plumbing networks",
      ],
    },
    {
      id: "cyber-city",
      code: "GUR — 02",
      title: "Cyber City Corporate Suite",
      category: "commercial interior fitout",
      type: "Commercial Office Fitout & Partitioning • 2024",
      location: "Gurugram, India",
      surface: "480 m²",
      image: "/images/tribeca_penthouse.jpg",
      description:
        "Complete commercial interior workspace execution including acoustic glass & gypsum partition walls, false ceiling grid, modular workstation furniture, and custom reception cabinetry.",
      tags: ["Gypsum Partitions", "Modular Workstations", "False Ceiling", "Electrical Fittings"],
      details: [
        "Fire-rated gypsum partition walls & double-glazed acoustic glass executive cabins",
        "Acoustic false ceiling tiles with integrated LED lighting and electrical wiring",
        "Custom solid wood reception counter, modular workstation desks & executive storage cabinets",
        "Pantry plumbing fixtures, wall decorative panels & access security infrastructure",
      ],
    },
    {
      id: "golf-course",
      code: "GUR — 03",
      title: "Golf Course Road Penthouse",
      category: "interior residential furnishing",
      type: "Penthouse Interior Finishing & Setup • 2023",
      location: "Gurugram, India",
      surface: "380 m²",
      image: "/images/maison_saint_germain.jpg",
      description:
        "High-end residential interior renovation featuring POP wall paneling, texture painting, quartz modular kitchen island, custom walk-in wardrobes, wallpaper decor, and tile flooring.",
    tags: ["POP Paneling", "Modular Kitchen", "Custom Wardrobes", "Texture Painting"],
    details: [
      "Designer POP wall paneling, false ceiling coves & royal texture paint finishes",
      "Modular kitchen with Calacatta quartz countertops, soft-close hardware & appliance integration",
      "Custom floor-to-ceiling wardrobes, decorative wall panels, and wallpaper accents",
      "Bathroom wall & floor tiling, concealed plumbing fittings & smart electrical lighting",
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
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b19] text-[#faf9f6] px-6 py-4 rounded-none shadow-2xl border-l-4 border-[#715a3e] font-sans text-sm ">
          ✓ Architectural Dossier Download link transmitted to your email.
        </div>
      )}

      {/* HEADER NAVIGATION */}
      <Navbar />

      <main className="w-full pt-12">
        <div className="flex flex-col w-full">
          {/* Architectural Manifesto & Hero Intro */}
          <section className="relative w-full px-5 md:px-12 lg:px-20 pt-16 pb-20 bg-[#faf9f6]">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div className="max-w-4xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-[#715a3e]" />
                    <span className="text-sm font-semibold text-[#715a3e] ">
                      Project Gallery
                    </span>
                    <span className="text-sm text-[#494740]">/ Completed Works</span>
                  </div>
                  <h1 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1a]">
                    Our Construction & Interior Projects
                  </h1>
                  <p className="text-sm font-semibold text-[#715a3e]  pt-2">
                    Showcasing Residential Villas, Offices & Interior Renovations
                  </p>
                </div>

                <div className="max-w-md space-y-3 bg-[#f4f3f0] p-6 shadow-sm border border-[#cbc6bd]/30 transform-gpu isolate">
                  <p className="text-sm text-[#494740]">
                    We design and build complete civil structures and modern interior fitouts. Explore our featured luxury villas, apartments, corporate offices, and custom woodworking projects.
                  </p>
                  <div className="flex items-center gap-6 pt-2 text-sm text-[#1a1c1a] flex-wrap sm:flex-nowrap">
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={120} suffix="+" />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Projects</span>
                    </div>
                    <div className="w-px h-6 bg-[#e3e2e0] shrink-0" />
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={6} />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Major Metros</span>
                    </div>
                    <div className="w-px h-6 bg-[#e3e2e0] shrink-0" />
                    <div className="shrink-0">
                      <span className="block font-semibold text-[#000000] tabular-nums">
                        <AnimatedCounter target={100} suffix="%" />
                      </span>
                      <span className="text-[#494740] whitespace-nowrap">Custom Fitout</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Controls & View Switcher */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 bg-[#f4f3f0] px-6 py-3 shadow-sm border border-[#cbc6bd]/40">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-2 text-sm font-semibold  transition-all duration-300 ${activeFilter === "all"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    All Works
                  </button>

                  <button
                    onClick={() => setActiveFilter("civil")}
                    className={`px-4 py-2 text-sm font-semibold  transition-all duration-300 ${activeFilter === "civil"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Civil & Foundation Work
                  </button>

                  <button
                    onClick={() => setActiveFilter("interior")}
                    className={`px-4 py-2 text-sm font-semibold  transition-all duration-300 ${activeFilter === "interior"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Interior Finishing & Setup
                  </button>

                  <button
                    onClick={() => setActiveFilter("residential")}
                    className={`px-4 py-2 text-sm font-semibold  transition-all duration-300 ${activeFilter === "residential"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Residential Construction & Interiors
                  </button>

                  <button
                    onClick={() => setActiveFilter("commercial")}
                    className={`px-4 py-2 text-sm font-semibold  transition-all duration-300 ${activeFilter === "commercial"
                      ? "bg-[#000000] text-[#ffffff]"
                      : "bg-[#faf9f6] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                      }`}
                  >
                    Commercial & Office Fitout
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
          <section className="w-full px-5 md:px-12 lg:px-20 pb-16 bg-[#faf9f6]">
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
                        <div className="absolute top-4 left-4 bg-[#faf9f6]/90 backdrop-blur-sm px-3 py-1 text-[10px]  text-[#1a1c1a]">
                          {project.code || "ARCH"}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-[#000000]/90 backdrop-blur-sm text-[#ffffff] px-3 py-1 text-[10px]  font-semibold">
                          {project.surface || project.footprint}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between bg-[#f4f3f0] space-y-4">
                        <div>
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-[10px] font-semibold text-[#715a3e] ">
                              {project.type || project.scope || project.tag}
                            </span>
                            <span className="text-[10px] text-[#494740]">
                              {project.location}
                            </span>
                          </div>
                          <h2 className="font-sans font-semibold text-xl text-[#1a1c1a] group-hover:text-[#715a3e] transition-colors">
                            {project.title}
                          </h2>
                          <p className="text-sm text-[#494740] mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-2 space-y-3">
                          <div className="flex items-center justify-between pt-2 border-t border-[#cbc6bd]/30">
                            <span className="text-[11px] font-semibold  text-[#000000] group-hover:underline underline-offset-4">
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
                  <div className="grid grid-cols-12 px-6 py-4 text-[11px] font-semibold text-[#715a3e]  bg-[#f4f3f0]">
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
                        <h3 className="font-sans font-semibold text-xl text-[#1a1c1a] group-hover:text-[#715a3e] transition-colors">
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
                        <span className="text-sm font-semibold  text-[#715a3e] group-hover:underline">
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
          <section className="w-full bg-[#f4f3f0] py-8 px-5 md:px-12 lg:px-20 border-t border-[#cbc6bd]/40">
            <div className="max-w-[1600px] mx-auto space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#e3e2e0]">
                <div>
                  <span className="text-sm font-semibold text-[#715a3e]  block mb-2">
                    Project Case Study Highlight
                  </span>
                  <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-[#1a1c1a]">
                    Featured Build: Vasant Vihar Luxury Villa
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#494740]">
                  <span>Scope: Civil Construction & Complete Interior Setup</span>
                  <span>•</span>
                  <span className="text-[#715a3e] font-semibold">
                    New Delhi, India
                  </span>
                </div>
              </div>

              {/* Editorial Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Visual Showcase */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="relative w-full aspect-[16/11] bg-[#faf9f6] overflow-hidden shadow-md border border-[#cbc6bd]/40">
                    <img
                      alt="Vasant Vihar Villa Living Room"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPHdz16ZrKWe2oYrGElDyCweHsWf9bRE_oTD7OKH2lL-s51oIRZiOGTWrvav3MNErLUXsyXAUlPJKSAc1nKacWT4q575zVH0RnRmrYWAT0OtReARAwD7I1K7nnha5wxD7eihbQb1CINVr7o_OGRfJQ87mu7RUSbcBRLUfE22DHNZOz4Zb56k1uUffFTulZ3cyCZBVQ6Qb3-1dQpEbnROU4fDKcXyvpD_OuNFCpEw9mFbO2HEvZ4soV"
                    />
                    <div className="absolute top-6 left-6 bg-[#faf9f6]/90 backdrop-blur-md px-4 py-2 text-sm  text-[#1a1c1a] shadow-xs">
                      Main Living Room & Garden View
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 bg-[#000000]/95 text-[#ffffff] p-4 backdrop-blur-md flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#715a3e]">
                          architecture
                        </span>
                        <div>
                          <div className="text-sm  font-semibold">
                            Floor Plan & Room Distribution
                          </div>
                          <div className="text-[11px] text-[#868380]">
                            Designed for maximum sunlight and natural air flow
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-[#715a3e]  font-semibold">
                        Plan View
                      </span>
                    </div>
                  </div>

                  {/* SVG Floorplan Diagram */}
                  <div className="bg-[#efeeeb] p-6 shadow-xs flex flex-col space-y-3 border border-[#cbc6bd]/40">
                    <div className="flex items-center justify-between text-sm  text-[#1a1c1a] font-semibold">
                      <span>Room Layout & Flow Diagram</span>
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
                          LIVING ROOM (CUSTOM TEAK WOODWORK)
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
                          MARBLE HALLWAY
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
                          MASTER BEDROOM
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
                          HOME OFFICE & STUDY
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
                      <span>• Dual-side natural lighting (North/South)</span>
                      <span>
                        • Concealed wiring & plumbing service spine
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytical Pillars */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e]  block mb-2">
                        01 / Site Challenge
                      </span>
                      <h3 className="font-sans font-semibold text-xl text-[#1a1c1a] mb-2">
                        Heavy Stone Flooring Support
                      </h3>
                      <p className="text-sm text-[#494740]">
                        Installing imported Italian marble flooring throughout required reinforced RCC slab foundations and subfloor waterproofing to ensure zero structural cracking.
                      </p>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e]  block mb-2">
                        02 / Interior Strategy
                      </span>
                      <h3 className="font-sans font-semibold text-xl text-[#1a1c1a] mb-2">
                        Open-Plan Living Layout
                      </h3>
                      <p className="text-sm text-[#494740]">
                        By opening up non-load-bearing brick partitions, an open-plan layout was generated, connecting the living area directly to the private courtyard garden.
                      </p>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e]  block mb-2">
                        03 / Materials Used
                      </span>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] ">
                            Flooring
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Bottochino Marble
                          </div>
                        </div>
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] ">
                            Woodwork
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Teak Wood
                          </div>
                        </div>
                        <div className="bg-[#efeeeb] p-2 text-center">
                          <div className="text-[10px] text-[#715a3e] ">
                            Fittings
                          </div>
                          <div className="text-sm font-semibold text-[#1a1c1a] mt-1">
                            Brass Hardware
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#faf9f6] p-6 shadow-xs border border-[#cbc6bd]/40">
                      <span className="text-sm font-semibold text-[#715a3e]  block mb-2">
                        04 / Final Outcome
                      </span>
                      <p className="text-sm text-[#494740]">
                        A beautiful home featuring high structural durability, soundproofing, POP ceiling lighting coves, and custom kitchen cabinetry.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#efeeeb] flex items-center justify-between border border-[#cbc6bd]/40">
                    <div>
                      <span className="text-sm  font-semibold text-[#1a1c1a] block">
                        Download Project Details
                      </span>
                      <span className="text-[11px] text-[#494740]">
                        Includes material schedules & room dimensions
                      </span>
                    </div>
                    <button
                      onClick={handleRequestDossier}
                      className="px-5 py-3 bg-[#000000] text-[#ffffff] text-sm font-semibold  hover:bg-[#715a3e] transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="w-full bg-[#000000] text-[#ffffff] py-16 px-5 md:px-12 lg:px-20 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center lg:text-left max-w-2xl">
                <span className="text-sm font-semibold text-[#fdddb9]  block">
                  Now Accepting New Projects
                </span>
                <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-[#ffffff]">
                  Planning a new construction or interior renovation project?
                </h2>
                <p className="text-sm text-[#868380] max-w-xl">
                  Contact Havenley Infrastructure today to schedule a site survey and discuss your construction build or interior requirements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-[#715a3e] text-[#ffffff] text-sm font-semibold  hover:bg-[#fdddb9] hover:text-[#281803] transition-all duration-300 shadow-md"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/#services"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-transparent text-[#ffffff] border border-[#ffffff]/20 text-sm font-semibold  hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-300"
                >
                  Our Services
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
              <span className="text-sm font-semibold text-[#715a3e] ">
                {selectedProject.code} • {selectedProject.location}
              </span>
              <h2 className="font-sans font-semibold text-3xl text-[#1a1c1a]">
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
              <h4 className="text-sm font-semibold text-[#715a3e] ">
                Engineering & Material Architectural Highlights:
              </h4>
              <ul className="space-y-1.5 text-sm text-[#1a1c1a]">
                {selectedProject.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#715a3e] font-semibold">•</span>
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
                className="bg-[#000000] text-[#ffffff] text-sm font-semibold  px-6 py-2.5 hover:bg-[#715a3e]"
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
