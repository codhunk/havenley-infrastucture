"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [projectsList, setProjectsList] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
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
      }
    } catch (err) {
      console.error("Failed to load home projects:", err);
    }
  };

  const defaultProjects = [
    {
      id: "vasant-vihar-villa",
      title: "Vasant Vihar Luxury Villa",
      subtitle: "Turnkey Civil Build & Italian Marble Fitout",
      location: "Vasant Vihar, New Delhi",
      year: "2024",
      footprint: "650 m² (7,000 sq ft)",
      palette: "Italian Marble & Teak Wood",
      scope: "Civil Construction & Interiors",
      tag: "Residential Villa",
      image: "/images/villa_miramar.jpg",
      description:
        "Turnkey civil construction and luxury interior transformation featuring Italian marble flooring, teak wood cabinetry, and open-plan acoustic design.",
      details: [
        "Poured reinforced concrete foundation & structural columns",
        "Imported Italian Bottochino marble flooring throughout living areas",
        "Bespoke teak wood wall paneling and false ceiling lighting coves",
        "Energy-efficient double-glazed glass sliding patio doors",
      ],
    },
    {
      id: "cyber-city-office",
      title: "Cyber City Corporate Suite",
      subtitle: "Modern Workspace & Interior Architecture",
      location: "Cyber City, Gurugram",
      year: "2024",
      footprint: "480 m² (5,200 sq ft)",
      palette: "Glass, Steel & Warm Timber",
      scope: "Commercial Interior Fitout",
      tag: "Corporate Fitout",
      image: "/images/tribeca_penthouse.jpg",
      description:
        "Complete commercial interior design featuring acoustic glass partitions, warm wooden wall paneling, and custom reception lighting.",
      details: [
        "Double-glazed acoustic glass partitions and executive cabins",
        "Custom solid wood reception desk & statement LED chandelier",
        "Ergonomic acoustic ceiling tiles for sound isolation",
        "Integrated smart HVAC climate control and access security",
      ],
    },
    {
      id: "golf-course-penthouse",
      title: "Golf Course Road Penthouse",
      subtitle: "Luxury Apartment Interior & Automation",
      location: "Golf Course Road, Gurugram",
      year: "2023",
      footprint: "380 m² (4,100 sq ft)",
      palette: "Calacatta Marble & Fluted Wood",
      scope: "Full Interior Renovation",
      tag: "Luxury Penthouse",
      image: "/images/maison_saint_germain.jpg",
      description:
        "High-end apartment renovation with false ceiling coves, quartz kitchen island, concealed storage millwork, and smart lighting.",
      details: [
        "Monolithic Calacatta marble kitchen island with brass inlay",
        "Concealed pivot doors integrated into fluted wood paneling",
        "Custom master bath with rain shower & heated marble floors",
        "Complete app-controlled smart home lighting & curtain automation",
      ],
    },
  ];

  const projects = projectsList.length > 0 ? projectsList : defaultProjects;

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#faf9f6] text-[#1a1c1a] min-h-screen relative font-sans">
      {/* HEADER NAVIGATION */}
      <Navbar />

      <main className="w-full pt-20">
        {/* 1. HERO SECTION WITH OVERLAPPING METRICS BAR */}
        <section
          id="home"
          className="relative w-full overflow-hidden bg-[#1c1b19] text-[#ffffff] border-b border-[#715a3e]/30 min-h-[calc(100dvh-5rem)] flex flex-col justify-between"
        >
          {/* Background Image Scrim */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center filter brightness-[0.75] contrast-[1.05]"
              style={{
                backgroundImage: "url('/images/hero_architecture.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19] via-[#1c1b19]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1b19]/80 via-transparent to-transparent" />
          </div>

          {/* Hero Content Matrix */}
          <div className="relative z-10 max-w-[1600px] w-full mx-auto px-5 md:px-12 lg:px-20 pt-6 md:pt-8 pb-6 md:pb-8 flex-1 flex flex-col justify-between gap-6">
            {/* Upper Metatags */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3 bg-[#faf9f6]/10 backdrop-blur-md px-4 py-1.5 shadow-sm border border-[#faf9f6]/20">
                <span className="w-2 h-2 rounded-full bg-[#cbb392]" />
                <span className="text-[10px] font-semibold text-[#faf9f6] ">
                  [ SECTION 01 // OVERVIEW ] • Est. 2009 • New Delhi • Mumbai
                </span>
              </div>
              <span className="hidden md:inline-block text-[11px] font-semibold text-[#e3e2e0]/80 ">
                [ Architectural Monograph N° 18 ]
              </span>
            </div>

            {/* Core Display Statement */}
            <div className="max-w-3xl space-y-4 my-auto py-2 md:py-4">
              <p className="text-xs sm:text-sm font-semibold text-[#cbb392]  tracking-wide">
                Architectural Precision • Atmospheric Calm
              </p>
              <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold text-[#faf9f6] leading-tight">
                Spaces Conceived in Harmony, Sculpted in Light.
              </h1>
              <p className="text-xs sm:text-base text-[#e9e8e5]/90 max-w-2xl font-medium leading-relaxed">
                Havenley Infrastructure delivers premier construction engineering and luxury interior design across ultra-prime residential, bespoke commercial, and turnkey infrastructural transformations.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="inline-flex items-center justify-center bg-[#faf9f6] text-[#000000] text-xs sm:text-sm font-semibold  px-6 py-3 hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-md"
                >
                  <span>Explore Projects</span>
                  <span className="material-symbols-outlined ml-2 text-base">
                    arrow_forward
                  </span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#faf9f6]/10 hover:bg-[#faf9f6]/20 backdrop-blur-md text-[#faf9f6] text-xs sm:text-sm font-semibold  px-6 py-3 transition-colors duration-300 border border-[#faf9f6]/20"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>

            {/* Key Architectural Metrics Ribbon */}
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-[#1c1b19]/95 backdrop-blur-md px-5 md:px-8 py-4 md:py-5 border border-[#715a3e]/40 shadow-2xl rounded-xl transform-gpu isolate">
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl text-[#cbb392] font-semibold shrink-0 w-20 text-left inline-block">
                  <AnimatedCounter target={15} suffix="+" minWidth="3.5ch" />
                </span>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-[#faf9f6] block  tracking-wide">
                    Years Crafting
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#e3e2e0]/80 font-medium block">
                    Monolithic permanence & curated living
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl text-[#cbb392] font-semibold shrink-0 w-20 text-left inline-block">
                  <AnimatedCounter target={120} suffix="+" minWidth="4.5ch" />
                </span>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-[#faf9f6] block  tracking-wide">
                    International Accolades
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#e3e2e0]/80 font-medium block">
                    Pinnacle awards across EU, US & Asia
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl text-[#cbb392] font-semibold shrink-0 w-20 text-left inline-block">
                  <AnimatedCounter target={98} suffix="%" minWidth="4ch" />
                </span>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-[#faf9f6] block  tracking-wide">
                    Private Commissions
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#e3e2e0]/80 font-medium block">
                    Tailored residential sanctuaries & estates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CURATED PHILOSOPHY & SIGNATURE VISION */}
        <section id="philosophy" className="w-full bg-[#faf9f6] pt-12 md:pt-16 pb-20 border-b border-[#e5e2db] relative z-10">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3.5 py-1 rounded-full border border-[#715a3e]/20 inline-block mb-1">
                  [ SECTION 02 // ATELIER ETHOS ]
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                  Monastic Restraint Meets Material Indulgence
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm text-[#494740] font-medium">
                  We perceive space not as an empty volume to fill with decor, but as an architectural canvas calibrated through celestial light, honest tectonic weight, and silent proportions.
                </p>
              </div>
            </div>

            {/* Three Pillars Mosaic with Overlap Designing & High Quality Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-6">
              {/* Pillar 01 */}
              <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#e5e2db] hover:border-[#715a3e]/50 group">
                <div className="-top-3.5 left-6 absolute bg-[#1c1b19] text-[#faf9f6] text-[10px] px-3.5 py-0.5 rounded-full font-semibold  shadow-lg border border-[#715a3e]/40 z-10">
                  Pillar 01
                </div>
                <div className="space-y-3 pt-2">
                  <div className="w-full h-56 overflow-hidden relative rounded-xl border border-[#e5e2db]">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{
                        backgroundImage: "url('/images/travertine_detail.jpg')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19]/30 to-transparent" />
                  </div>
                  <h3 className="text-lg text-[#1a1c1a] font-semibold">
                    Material Authenticity
                  </h3>
                  <p className="text-sm text-[#494740] font-normal">
                    Honoring the innate character of geological strata and forest grain. We reject synthetic veneers in favor of vein-cut Navona travertine.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#e5e2db] mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md">
                    Unsealed Porosities
                  </span>
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md">
                    Living Patinas
                  </span>
                </div>
              </div>

              {/* Pillar 02 - Featured Overlapping Center Card */}
              <div className="relative z-10 bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between shadow-2xl transition-all duration-500 border-2 border-[#715a3e] lg:-mt-4 group hover:scale-[1.02]">
                <div className="-top-3.5 left-6 absolute bg-[#715a3e] text-[#ffffff] text-[10px] px-3.5 py-0.5 rounded-full font-semibold  shadow-xl z-10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] animate-ping" />
                  Pillar 02 • Core Axis
                </div>
                <div className="space-y-3 pt-2">
                  <div className="w-full h-56 overflow-hidden relative rounded-xl border border-[#e5e2db]">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{
                        backgroundImage: "url('/images/architectural_light.jpg')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19]/30 to-transparent" />
                  </div>
                  <h3 className="text-lg text-[#1a1c1a] font-semibold">
                    Spatial Rhythm
                  </h3>
                  <p className="text-sm text-[#494740] font-normal">
                    Calibrating circadian rhythms through rigorous daylight orientation and concealed ceiling light coves.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#e5e2db] mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-2.5 py-0.5 rounded-md">
                    Diurnal Shading
                  </span>
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-2.5 py-0.5 rounded-md">
                    Spatial Intervals
                  </span>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#e5e2db] hover:border-[#715a3e]/50 group">
                <div className="-top-3.5 left-6 absolute bg-[#1c1b19] text-[#faf9f6] text-[10px] px-3.5 py-0.5 rounded-full font-semibold  shadow-lg border border-[#715a3e]/40 z-10">
                  Pillar 03
                </div>
                <div className="space-y-3 pt-2">
                  <div className="w-full h-56 overflow-hidden relative rounded-xl border border-[#e5e2db]">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{
                        backgroundImage: "url('/images/artisan_millwork.jpg')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19]/30 to-transparent" />
                  </div>
                  <h3 className="text-lg text-[#1a1c1a] font-semibold">
                    Bespoke Millwork
                  </h3>
                  <p className="text-sm text-[#494740] font-normal">
                    Every fixture and cabinetry element is commissioned with master cabinetmakers and bronze founders.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#e5e2db] mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md">
                    Museum Joinery
                  </span>
                  <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md">
                    Monoprints
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED WORKS PREVIEW */}
        {/* COMPLETED PROJECTS PORTFOLIO */}
        <section id="portfolio" className="w-full bg-[#f4f3f0] py-12 border-b border-[#e5e2db] relative z-10">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#715a3e]  bg-[#ffffff] px-3.5 py-1 rounded-full border border-[#e5e2db] shadow-sm inline-block mb-2">
                  [ SECTION 03 // PORTFOLIO ]
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                  Construction & Interior Architecture Portfolio
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#715a3e]  bg-[#ffffff] px-4 py-2 rounded-full border border-[#715a3e]/30 shadow-sm">
                Featured Commissions [Delhi NCR]
              </span>
            </div>

            {/* Concise & Attractive 3-Column Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project._id || project.id || project.slug || index}
                  className="bg-[#ffffff] rounded-2xl overflow-hidden border border-[#e5e2db] shadow-md hover:shadow-xl hover:border-[#715a3e]/50 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Header */}
                  <div
                    className="h-48 overflow-hidden relative cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1c1b19]/90 backdrop-blur-md text-[#cbb392] px-2.5 py-1 rounded-md text-[10px] font-semibold  border border-[#715a3e]/30 shadow-md">
                      {project.tag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-[#715a3e] ">
                        <span>{project.location}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#1a1c1a] group-hover:text-[#715a3e] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#715a3e] ">
                        {project.subtitle}
                      </p>
                      <p className="text-xs text-[#494740] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-[#e5e2db] flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#715a3e] bg-[#715a3e]/10 px-2 py-0.5 rounded">
                        {project.footprint}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-[#1c1b19] text-[#ffffff] text-xs font-semibold  px-3.5 py-1.5 rounded-lg hover:bg-[#715a3e] transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>View Project</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Portfolio Index Bar */}
            <div className="mt-10 bg-[#ffffff] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-[#715a3e]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                  <span className="material-symbols-outlined text-xl">domain</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#1a1c1a] block">
                    Interested in viewing our complete portfolio of civil builds & interior fitouts?
                  </span>
                  <span className="text-xs text-[#494740] font-normal">
                    Explore all private luxury villas, penthouses, and corporate office projects across India.
                  </span>
                </div>
              </div>
              <Link
                href="/portfolio"
                className="bg-[#1c1b19] text-[#ffffff] text-xs font-semibold  px-6 py-3 rounded-xl hover:bg-[#715a3e] transition-all duration-300 shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>View All Projects</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. FOUR-STAGE DESIGN METHODOLOGY */}
        <section id="methodology" className="w-full bg-[#faf9f6] py-12 border-b border-[#e5e2db] relative z-10">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            <div className="max-w-2xl mb-8 space-y-2">
              <span className="text-xs font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-1 rounded-full border border-[#715a3e]/20 inline-block mb-1">
                [ SECTION 05 // METHODOLOGY ]
              </span>
              <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                The Architectural Methodology
              </h2>
              <p className="text-sm text-[#494740] font-medium">
                Every commission progresses through a systematic four-phase lifecycle ensuring complete structural fidelity, acoustic perfection, and uncompromising bespoke artisan delivery.
              </p>
            </div>

            {/* Medium Step Cards with Overlapping Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
              {/* Step 01 */}
              <div className="relative bg-[#f4f3f0] p-6 rounded-xl flex flex-col justify-between space-y-6 border border-[#cbc6bd]/50 shadow-md hover:shadow-xl hover:bg-[#faf9f6] transition-all duration-300">
                <div className="-top-4 -left-3 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-xs px-3.5 py-1  shadow-md rounded-md">
                  Phase 01
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-[#1a1c1a] font-semibold mb-2">
                    Spatial Discovery & Solar Cartography
                  </h3>
                  <p className="text-sm text-[#494740]">
                    In-depth 365-day solar angle analysis, structural diagnostic surveying, and acoustic mapping of the geographical context.
                  </p>
                </div>
                <div className="pt-4 space-y-2 border-t border-[#cbc6bd]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Heliocentric Shadow Studies
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Decibel Frequency Attenuation
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative bg-[#f4f3f0] p-6 rounded-xl flex flex-col justify-between space-y-6 border border-[#cbc6bd]/50 shadow-md hover:shadow-xl hover:bg-[#faf9f6] transition-all duration-300">
                <div className="-top-4 -left-3 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-xs px-3.5 py-1  shadow-md rounded-md">
                  Phase 02
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-[#1a1c1a] font-semibold mb-2">
                    Concept Materiality & 3D Volumetrics
                  </h3>
                  <p className="text-sm text-[#494740]">
                    Physical mood boards of quarried stones and unlacquered alloys, paired with photorealistic physical ray-traced spatial modeling.
                  </p>
                </div>
                <div className="pt-4 space-y-2 border-t border-[#cbc6bd]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Tactile Stone & Wood Trays
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      1:20 Maquette Prototyping
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative bg-[#f4f3f0] p-6 rounded-xl flex flex-col justify-between space-y-6 border border-[#cbc6bd]/50 shadow-md hover:shadow-xl hover:bg-[#faf9f6] transition-all duration-300">
                <div className="-top-4 -left-3 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-xs px-3.5 py-1  shadow-md rounded-md">
                  Phase 03
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-[#1a1c1a] font-semibold mb-2">
                    Bespoke Fabrication & Sourcing
                  </h3>
                  <p className="text-sm text-[#494740]">
                    Direct quarry block selection in Makrana and Rajasthan, custom cabinetry joinery in our private millwork studio, and curated interior design.
                  </p>
                </div>
                <div className="pt-4 space-y-2 border-t border-[#cbc6bd]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Quarry Vein Matching
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Guild Artisan Sourcing
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative bg-[#f4f3f0] p-6 rounded-xl flex flex-col justify-between space-y-6 border border-[#cbc6bd]/50 shadow-md hover:shadow-xl hover:bg-[#faf9f6] transition-all duration-300">
                <div className="-top-4 -left-3 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-xs px-3.5 py-1  shadow-md rounded-md">
                  Phase 04
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-[#1a1c1a] font-semibold mb-2">
                    Turnkey White-Glove Handover
                  </h3>
                  <p className="text-sm text-[#494740]">
                    On-site master construction supervision, scent and acoustic calibration, and presentation of the bespoke leather-bound estate archive.
                  </p>
                </div>
                <div className="pt-4 space-y-2 border-t border-[#cbc6bd]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Bespoke Monograph & Plans
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#715a3e] rounded-full" />
                    <span className="text-[11px] text-[#494740] font-medium">
                      Lifetime Material Care Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CLIENT TESTIMONIALS & PRESS MENTIONS */}
        <section id="testimonials" className="w-full bg-[#e9e8e5] py-16 border-b border-[#cbc6bd] relative z-10">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
            {/* Section Badge */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#715a3e]  bg-[#ffffff] px-3.5 py-1 rounded-full border border-[#cbc6bd] shadow-sm inline-block">
                [ SECTION 06 // TESTIMONIALS & RECOGNITION ]
              </span>
            </div>

            {/* Press Quotes Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#cbc6bd]/60 text-center items-center">
              <div className="space-y-1">
                <span className="text-base font-semibold  text-[#1a1c1a] block">
                  Architectural Digest
                </span>
                <span className="text-xs text-[#494740]">
                  “Pinnacle of Restraint & Structural Craft”
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-base font-semibold  text-[#1a1c1a] block">
                  Elle Decor
                </span>
                <span className="text-xs text-[#494740]">
                  “Breathtaking material integrity”
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-base font-semibold  text-[#1a1c1a] block">
                  Wallpaper*
                </span>
                <span className="text-xs text-[#494740]">
                  “Design Studio of the Year Nomination”
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-base font-semibold  text-[#1a1c1a] block">
                  The World of Interiors
                </span>
                <span className="text-xs text-[#494740]">
                  “Timeless spatial acoustic serenity”
                </span>
              </div>
            </div>

            {/* Testimonials Mosaic */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {/* Quote 1 */}
              <div className="relative bg-[#faf9f6] p-6 rounded-xl flex flex-col justify-between shadow-md border border-[#cbc6bd]/60 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-[#715a3e] text-2xl">
                    format_quote
                  </span>
                  <p className="text-sm text-[#1a1c1a] italic">
                    “Living in our Vasant Vihar villa feels like dwelling within a calm sanctuary where every morning light pattern is a private, unhurried meditation.”
                  </p>
                </div>
                <div className="pt-4 border-t border-[#cbc6bd]/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#1a1c1a] block">
                      Rajesh & Sunita Kapoor
                    </span>
                    <span className="text-[10px] text-[#494740]  font-semibold">
                      Vasant Vihar Villa • New Delhi
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#715a3e] text-lg">
                    verified
                  </span>
                </div>
              </div>

              {/* Quote 2 */}
              <div className="relative bg-[#faf9f6] p-6 rounded-xl flex flex-col justify-between shadow-md border border-[#cbc6bd]/60 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-[#715a3e] text-2xl">
                    format_quote
                  </span>
                  <p className="text-sm text-[#1a1c1a] italic">
                    “Havenley Infrastructure delivered flawless structural engineering and an acoustic tranquility for our Cyber City corporate headquarters.”
                  </p>
                </div>
                <div className="pt-4 border-t border-[#cbc6bd]/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#1a1c1a] block">
                      Vikramaditya Singhania
                    </span>
                    <span className="text-[10px] text-[#494740]  font-semibold">
                      Managing Director • Cyber City Suite
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#715a3e] text-lg">
                    verified
                  </span>
                </div>
              </div>

              {/* Quote 3 */}
              <div className="relative bg-[#faf9f6] p-6 rounded-xl flex flex-col justify-between shadow-md border border-[#cbc6bd]/60 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-[#715a3e] text-2xl">
                    format_quote
                  </span>
                  <p className="text-sm text-[#1a1c1a] italic">
                    “Their reverence for architectural precision while introducing rich natural stone and warm wood paneling was executed with surgical craftsmanship.”
                  </p>
                </div>
                <div className="pt-4 border-t border-[#cbc6bd]/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-[#1a1c1a] block">
                      Ananya & Devendra Roy
                    </span>
                    <span className="text-[10px] text-[#494740]  font-semibold">
                      Golf Course Road Penthouse • Gurugram
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#715a3e] text-lg">
                    verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. IMMERSIVE INVITATION BANNER & CTA */}
        <section
          id="contact"
          className="relative w-full bg-[#1c1b19] text-[#ffffff] py-20 overflow-hidden z-10 border-t border-[#715a3e]/30"
        >
          <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3.5 py-1 rounded-full border border-[#715a3e]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbb392] animate-pulse" />
              Private Commissions • Accepting 2025 / 2026
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#faf9f6] font-semibold max-w-3xl mx-auto">
              Begin Your Spatial Commission
            </h2>
            <p className="text-sm sm:text-base text-[#e9e8e5]/80 max-w-2xl mx-auto font-medium">
              Due to our uncompromising dedication to structural precision, construction excellence, and turnkey interior design, Havenley Infrastructure limits studio intake to select bespoke commissions annually.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#faf9f6] text-[#000000] text-sm font-semibold  px-8 py-4 hover:bg-[#715a3e] hover:text-[#ffffff] transition-all duration-300 shadow-xl rounded-xl"
              >
                <span>Schedule Consultation</span>
                <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center bg-[#faf9f6]/10 hover:bg-[#faf9f6]/20 backdrop-blur-md text-[#faf9f6] text-sm font-semibold  px-8 py-4 transition-colors duration-300 border border-[#faf9f6]/20 rounded-xl"
              >
                Explore Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Case Study Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#faf9f6] border border-[#cbc6bd] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-[#1a1c1a] hover:text-[#715a3e]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#715a3e] ">
                {selectedProject.tag} • {selectedProject.location}
              </span>
              <h2 className="text-2xl md:text-3xl text-[#1a1c1a] font-semibold">
                {selectedProject.title}
              </h2>
              <p className="text-base text-[#494740] italic font-semibold">
                {selectedProject.subtitle}
              </p>
            </div>

            <div className="w-full h-64 relative overflow-hidden border border-[#cbc6bd]/40">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedProject.image}')` }}
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
              <span className="text-sm text-[#494740] font-semibold">
                Footprint: {selectedProject.footprint}
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
