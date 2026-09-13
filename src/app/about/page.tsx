"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function AboutPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<{
    title: string;
    origin: string;
    finish: string;
    image: string;
    desc: string;
  } | null>(null);

  const [activeTimelineYear, setActiveTimelineYear] = useState<number>(2011);
  const [activeWireframeLayer, setActiveWireframeLayer] = useState<
    "cad" | "structural" | "thermal" | "millwork"
  >("cad");

  const timelineData = [
    {
      year: 2011,
      city: "New Delhi, India",
      title: "Studio Genesis in Connaught Place",
      tagline: "Bridging classical stone masonry with high-tensile civil structural engineering.",
      desc: "Founded in New Delhi, Havenley Infrastructure began as a boutique civil studio dedicated to structural engineering and interior transformations.",
      metrics: [
        { label: "Founding Hub", value: "Connaught Place" },
        { label: "Core Discipline", value: "Civil Engineering" },
        { label: "First Monograph", value: "Villa Monograph 01" },
      ],
      image: "/images/maison_saint_germain.jpg",
    },
    {
      year: 2014,
      city: "Gurugram, India",
      title: "Gurugram Hub & Civil Expansion",
      tagline: "Bringing precision stone craftsmanship to luxury high-rise penthouses & office fitouts.",
      desc: "Expanded civil and structural engineering operations with our Cyber City Gurugram laboratory, pioneering hybrid steel-and-marble structures.",
      metrics: [
        { label: "Gurugram Hub", value: "Cyber City" },
        { label: "Patented Tech", value: "Steel Framework" },
        { label: "Key Milestone", value: "Cyber City Suite" },
      ],
      image: "/images/tribeca_penthouse.jpg",
    },
    {
      year: 2017,
      city: "New Delhi & Mumbai",
      title: "The Monolithic Architecture Era",
      tagline: "Civil structural engineering meets ultra-luxury residential sanctuaries.",
      desc: "Commissioned to build Vasant Vihar Villa, integrating deep foundation piling with 650m² of custom teak wood millwork.",
      metrics: [
        { label: "Civil Engineering", value: "Deep Piling" },
        { label: "Surface Area", value: "650 m²" },
        { label: "Global Milestone", value: "Monograph 03" },
      ],
      image: "/images/villa_miramar.jpg",
    },
    {
      year: 2020,
      city: "Rajasthan & South India",
      title: "Tactile Material Specimen Laboratory",
      tagline: "Scientific testing of diurnal lighting, acoustic reverberation, and zero-VOC mineral plasters.",
      desc: "Inaugurated our proprietary material lab, testing quarried Italian Bottochino marble, teak wood, and natural lime plasters under full 24-hour sun simulations.",
      metrics: [
        { label: "Lab Facilities", value: "Delhi & Gurugram" },
        { label: "Specimens Cataloged", value: "140+ Minerals" },
        { label: "Eco Standard", value: "0% VOC Off-gassing" },
      ],
      image: "/images/travertine_detail.jpg",
    },
    {
      year: 2023,
      city: "Noida & Bengaluru",
      title: "50+ Completed Projects",
      tagline: "Surpassing 50 completed estates & commercial builds across India with 100% bespoke joinery.",
      desc: "Achieved milestone status with the completion of Noida Tech Park Headquarters and Golf Course Road Penthouse, setting the benchmark for quiet, contemplative luxury.",
      metrics: [
        { label: "Completed Estates", value: "54 Sites" },
        { label: "Metros", value: "6 Cities" },
        { label: "Joinery Precision", value: "Sub-millimeter" },
      ],
      image: "/images/artisan_millwork.jpg",
    },
    {
      year: 2025,
      city: "Ojai & Geneva",
      title: "Autonomous Microclimate Architecture",
      tagline: "Pioneering rammed earth thermal chimneys and passive zero-energy structural envelopes.",
      desc: "Unveiled the Canyon Sanctuary in Ojai, California, featuring earth-cast load-bearing walls and natural thermal buoyancy solar chimneys with zero active HVAC load.",
      metrics: [
        { label: "HVAC Load", value: "0 Net Energy" },
        { label: "Rammed Earth", value: "100% Local Clay" },
        { label: "Lifespan Rating", value: "300+ Years" },
      ],
      image: "/images/architectural_light.jpg",
    },
  ];

  const wireframeLayersData = {
    cad: {
      label: "CAD Blueprint Grid",
      title: "Tectonic Vector Grid & Column Axis",
      desc: "Precision structural coordinate matrix (1:50 scale) mapping load-bearing steel piers, optical axes, and primary masonry datum lines.",
      badge: "Coordinate Matrix • LAT 48.86° N / LON 2.32° E",
      specs: [
        { key: "Tectonic Scale", val: "1:50 Architectural Metric" },
        { key: "Axis Alignment", val: "True North Diurnal Meridian" },
        { key: "Grid Resolution", val: "0.5mm Sub-pixel CAD Vector" },
      ],
    },
    structural: {
      label: "3D Structural Framing",
      title: "Monolithic Load-Bearing Truss & Cantilever",
      desc: "Sub-floor high-tensile steel cradle engineered to sustain up to 12 metric tons of solid carved French limestone and Italian Calacatta Viola marble.",
      badge: "Structural Yield • 450 MPa High-Tensile Steel",
      specs: [
        { key: "Load Capacity", val: "12.5 Metric Tons Limit" },
        { key: "Deflection Index", val: "< 1/1000 Cantilever Deflection" },
        { key: "Foundation Base", val: "Sub-sea Reinforced Concrete" },
      ],
    },
    thermal: {
      label: "Thermal Solar Envelope",
      title: "Passive Solar Trajectory & Air Buoyancy",
      desc: "Simulated microclimate envelope directing natural cross-ventilation through vertical solar chimneys and triple-glazed thermal break argon panels.",
      badge: "Microclimate • Diurnal Solar Buoyancy",
      specs: [
        { key: "Thermal Mass", val: "R-38 Monolithic Insulation" },
        { key: "Cross Ventilation", val: "Natural Stack-Effect Buoyancy" },
        { key: "Solar Orientation", val: "23.5° Equinox Solar Path" },
      ],
    },
    millwork: {
      label: "Bespoke Millwork Axis",
      title: "Sub-millimeter Joinery & Concealed Pivot Hardware",
      desc: "Architectural millwork layout displaying recessed magnetic tracks, hidden 180-degree brass pivot hinges, and acoustic isolation perimeter seals.",
      badge: "Artisanal Millwork • Sub-millimeter Tolerance",
      specs: [
        { key: "Wood Specimen", val: "FSC Bleached Japanese Elm" },
        { key: "Hardware Spec", val: "Custom Patinated Cast Bronze" },
        { key: "Acoustic Rating", val: "STC 54 Sound Attenuation" },
      ],
    },
  };

  const activeMilestone =
    timelineData.find((m) => m.year === activeTimelineYear) || timelineData[0];
  const activeWireframe = wireframeLayersData[activeWireframeLayer];

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased min-h-screen">
      {/* Material Modal Drawer */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1b19]/80 backdrop-blur-sm p-4">
          <div className="bg-[#ffffff] max-w-xl w-full p-6 rounded-2xl border border-[#715a3e]/30 relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f4f3f0] flex items-center justify-center text-[#1a1c1a] hover:bg-[#715a3e] hover:text-[#ffffff] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="overflow-hidden bg-[#f8f7f4] h-48 rounded-xl border border-[#e5e2db] relative">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#1c1b19]/90 text-[#cbb392] text-[9px] font-semibold  px-2.5 py-0.5 rounded-full border border-[#715a3e]/30">
                Specular Materiality
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-2.5 py-0.5 rounded-md">
                {selectedMaterial.origin}
              </span>
              <h3 className="text-xl font-semibold text-[#1a1c1a]">
                {selectedMaterial.title}
              </h3>
              <p className="text-[11px] text-[#715a3e] font-semibold ">
                Finish: {selectedMaterial.finish}
              </p>
              <p className="text-sm text-[#494740] font-normal">
                {selectedMaterial.desc}
              </p>
            </div>

            <button
              onClick={() => setSelectedMaterial(null)}
              className="mt-1 w-full bg-[#1c1b19] text-white py-2.5 rounded-xl text-sm font-semibold  hover:bg-[#715a3e] transition-colors shadow-md"
            >
              Close Material Inspection
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 bg-[#faf9f6] min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          {/* Top Manifesto Hero */}
          <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-12 pb-14 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              {/* Monograph Archival Meta Tag */}
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex items-center gap-2 bg-[#715a3e]/10 px-3.5 py-1 rounded-full border border-[#715a3e]/20">
                  <span className="w-2 h-2 rounded-full bg-[#715a3e] animate-pulse" />
                  <span className="text-[11px]  text-[#715a3e] font-semibold">
                    Monograph 01 • Studio Genesis
                  </span>
                </div>
                <div className="h-px w-12 bg-[#e5e2db]" />
                <span className="text-[11px] text-[#494740] font-medium">
                  Paris – New York • Est. 2011
                </span>
              </div>

              {/* Hero Headline with Architectural Scale */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-9">
                  <h1 className="text-3xl sm:text-4xl lg:text-[3rem] text-[#1a1c1a] font-semibold">
                    Civil Poise & Material Integrity
                  </h1>
                </div>
                <div className="lg:col-span-3 pb-1">
                  <p className="text-sm sm:text-sm text-[#494740] font-normal">
                    From our founding ateliers in New Delhi and Gurugram, we
                    engineer spaces that endure for generations. Our practice
                    bridges ground-up civil construction, structural engineering, and luxury interior design.
                  </p>
                </div>
              </div>

              {/* Architectural Dimension Metric Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-[#ffffff] p-5 rounded-xl border border-[#715a3e]/30 shadow-lg divide-y sm:divide-y-0 sm:divide-x divide-[#e5e2db] transform-gpu isolate">
                <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pr-3">
                  <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                    <span className="material-symbols-outlined text-xl">domain</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#715a3e]  block tracking-wide">
                      Dual Sanctums
                    </span>
                    <span className="text-xl text-[#1a1c1a] font-semibold block">
                      Delhi & Gurugram
                    </span>
                    <p className="text-[10px] text-[#494740] mt-0.5 font-medium">
                      Connaught Place & Cyber City
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
                  <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                    <span className="material-symbols-outlined text-xl">castle</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#715a3e]  block tracking-wide">
                      Permanent Works
                    </span>
                    <span className="text-xl text-[#1a1c1a] font-semibold block tabular-nums flex items-baseline">
                      <span className="inline-block shrink-0 min-w-[2.5ch] text-left">
                        <AnimatedCounter target={54} minWidth="2.5ch" />
                      </span>
                      <span> Estates</span>
                    </span>
                    <p className="text-[10px] text-[#494740] mt-0.5 font-medium">
                      Across India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
                  <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                    <span className="material-symbols-outlined text-xl">eco</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#715a3e]  block tracking-wide">
                      Circularity Index
                    </span>
                    <span className="text-xl text-[#1a1c1a] font-semibold block tabular-nums flex items-baseline">
                      <span className="inline-block shrink-0 min-w-[2.5ch] text-left">
                        <AnimatedCounter target={85} minWidth="2.5ch" />
                      </span>
                      <span>% Local</span>
                    </span>
                    <p className="text-[10px] text-[#494740] mt-0.5 font-medium">
                      Regional Geological Sourcing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#715a3e]  block tracking-wide">
                      Artisan Guild
                    </span>
                    <span className="text-xl text-[#1a1c1a] font-semibold block tabular-nums flex items-baseline">
                      <span className="inline-block shrink-0 min-w-[2.5ch] text-left">
                        <AnimatedCounter target={40} minWidth="2.5ch" />
                      </span>
                      <span>+ Ateliers</span>
                    </span>
                    <p className="text-[10px] text-[#494740] mt-0.5 font-medium">
                      Master Fabricators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Founder & Creative Direction Feature */}
          <section className="w-full bg-[#f4f3f0] py-12 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Portrait Column */}
                <div className="lg:col-span-4 relative">
                  <div className="relative bg-[#ffffff] p-3 rounded-2xl shadow-xl border border-[#e5e2db] group">
                    <div className="overflow-hidden rounded-xl border border-[#e5e2db] h-64 md:h-72">
                      <img
                        alt="Aditya Vardhan, Principal Architect and Founder"
                        className="w-full h-full object-cover filter contrast-[1.02] saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDXYx8fGVwMvV2Cj2Cul3BEVI3daldFfaKm6wSstfecV96dYX15Fd_2oWvMs5uWGd-ecDp-tbw2jOje40X3lPEWxCco4MjFJmKbq0E_Jq26tFw3f_fMRbcS2e9_-C26dAL_ivVftEJSuk0rsn8FaTAqf5Q0-spjydse7RWpCTcg0QWg14mmUg6FQRUC3UWZ6Zkktaw7-6sEeGgd6InWiw0XwIC9BmQMEXghcsVyvYOcznzUSWMcH3d"
                      />
                    </div>
                    <div className="mt-3 pb-1 px-2 flex justify-between items-baseline">
                      <div>
                        <p className="text-base text-[#1a1c1a] font-semibold">
                          Aditya Vardhan
                        </p>
                        <p className="text-[10px] font-semibold text-[#715a3e] ">
                          Principal Architect & Founder
                        </p>
                      </div>
                      <span className="text-[10px] text-[#715a3e] font-semibold bg-[#715a3e]/10 px-2 py-0.5 rounded-md">
                        B.Arch / IIT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Column */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                      Leadership • Lineage • Discipline
                    </div>
                    <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                      A Dialogue Between Classical Heritage & Monastic Reductionism
                    </h2>
                    <div className="space-y-3 text-sm sm:text-sm text-[#494740] font-normal">
                      <p>
                        Educated at the storied{" "}
                        <strong className="font-semibold text-[#1a1c1a]">
                          IIT Delhi
                        </strong>{" "}
                        before refining his tectonic sensibilities at{" "}
                        <strong className="font-semibold text-[#1a1c1a]">
                          SPA New Delhi
                        </strong>{" "}
                        in India, Aditya Vardhan emerged from an
                        illustrious architectural lineage spanning three
                        generations.
                      </p>
                      <p>
                        His immersion in classical Indian masonry and structural rationalism catalyzed the founding of
                        Havenley Infrastructure in 2009. Bridging full-scale civil
                        construction and structural engineering with refined bespoke
                        interior design, the firm operates with an absolute doctrine:
                        seamless structural integrity infused with material gravitas.
                      </p>
                    </div>
                  </div>

                  {/* Milestone Academic & Institutional Credential Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 bg-[#ffffff] p-3.5 rounded-xl border border-[#e5e2db] shadow-md">
                    <div>
                      <span className="text-[10px] font-semibold text-[#715a3e]  block">
                        Academic Chair
                      </span>
                      <p className="text-[11px] text-[#1a1c1a] font-semibold">
                        Guest Critic, SPA Delhi
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#715a3e]  block">
                        Specialization
                      </span>
                      <p className="text-[11px] text-[#1a1c1a] font-semibold">
                        Adaptive Heritage Conservation
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#715a3e]  block">
                        Monograph
                      </span>
                      <p className="text-[11px] text-[#1a1c1a] font-semibold">
                        <em>The Poetics of Mass (2022)</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE ARCHITECTURAL BLUEPRINT & CAD WIREFRAME VIEWER */}
          <section className="w-full bg-[#121614] text-[#ffffff] py-14 border-b border-[#715a3e]/30 shadow-2xl relative overflow-hidden">
            {/* Background CAD Ambient Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#715a3e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3.5 py-1 rounded-full border border-[#715a3e]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cbb392] animate-pulse" />
                    Tectonic Model 04 • Interactive CAD Schematic
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-[#ffffff] font-semibold">
                    Architectural Wireframe & Structural CAD Explorer
                  </h2>
                  <p className="text-sm text-[#a39f99] max-w-xl">
                    Toggle dynamic structural layers to inspect vector load calculations, solar microclimates, and sub-millimeter joinery tolerances.
                  </p>
                </div>

                {/* Layer Control Switcher */}
                <div className="flex flex-wrap items-center gap-2 bg-[#1c221e] p-1.5 rounded-xl border border-[#715a3e]/30 shadow-inner">
                  {(["cad", "structural", "thermal", "millwork"] as const).map((layerKey) => (
                    <button
                      key={layerKey}
                      onClick={() => setActiveWireframeLayer(layerKey)}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold  transition-all duration-300 flex items-center gap-1.5 ${activeWireframeLayer === layerKey
                        ? "bg-[#715a3e] text-[#ffffff] shadow-md border border-[#cbb392]/50"
                        : "text-[#a39f99] hover:text-[#ffffff] hover:bg-[#252d28]"
                        }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {wireframeLayersData[layerKey].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wireframe Viewer Grid Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* SVG Blueprint Canvas Column */}
                <div className="lg:col-span-7 bg-[#0b0f0d] rounded-2xl border border-[#715a3e]/40 p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden group">
                  {/* Top Bar Blueprint HUD */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#252d28] text-[10px]  font-mono text-[#715a3e]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#cbb392] font-semibold">GRID: 0.5M CAD</span>
                      <span>•</span>
                      <span>LAT: 28.61° N</span>
                      <span>•</span>
                      <span>LON: 77.20° E</span>
                    </div>
                    <div className="text-[#34d399] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                      SYSTEM ACTIVE
                    </div>
                  </div>

                  {/* SVG Dynamic CAD Diagram */}
                  <div className="relative w-full aspect-[16/10] bg-[#070a08] rounded-xl border border-[#1e2621] p-4 flex items-center justify-center overflow-hidden">
                    {/* SVG Vector Drawing */}
                    <svg className="w-full h-full text-[#cbb392]" viewBox="0 0 600 360">
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1b241e" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#cadGrid)" />

                      {/* Axis Guidelines */}
                      <line x1="50" y1="40" x2="550" y2="40" stroke="#715a3e" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50" y1="300" x2="550" y2="300" stroke="#715a3e" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50" y1="40" x2="50" y2="300" stroke="#715a3e" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="550" y1="40" x2="550" y2="300" stroke="#715a3e" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Main Monolithic Structure Outline */}
                      <polygon
                        points="80,280 80,120 220,120 220,70 380,70 380,120 520,120 520,280"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />

                      {/* CAD Grid Layer Visuals */}
                      {activeWireframeLayer === "cad" && (
                        <g>
                          <line x1="80" y1="200" x2="520" y2="200" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2 2" />
                          <line x1="220" y1="40" x2="220" y2="300" stroke="#34d399" strokeWidth="1.5" />
                          <line x1="380" y1="40" x2="380" y2="300" stroke="#34d399" strokeWidth="1.5" />
                          <circle cx="220" cy="120" r="4" fill="#34d399" />
                          <circle cx="380" cy="120" r="4" fill="#34d399" />
                          <circle cx="220" cy="280" r="4" fill="#34d399" />
                          <circle cx="380" cy="280" r="4" fill="#34d399" />
                          <text x="90" y="105" fill="#34d399" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">ELEVATION +14.80M</text>
                          <text x="90" y="270" fill="#34d399" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">FOUNDATION BASE 0.00M</text>
                        </g>
                      )}

                      {/* Structural Framing Layer Visuals */}
                      {activeWireframeLayer === "structural" && (
                        <g>
                          {/* Truss cross-hatching */}
                          <line x1="80" y1="120" x2="220" y2="280" stroke="#fbbf24" strokeWidth="1.5" />
                          <line x1="220" y1="120" x2="80" y2="280" stroke="#fbbf24" strokeWidth="1.5" />
                          <line x1="380" y1="120" x2="520" y2="280" stroke="#fbbf24" strokeWidth="1.5" />
                          <line x1="520" y1="120" x2="380" y2="280" stroke="#fbbf24" strokeWidth="1.5" />
                          {/* Cantilever Beams */}
                          <rect x="200" y="60" width="200" height="15" fill="none" stroke="#fbbf24" strokeWidth="2" />
                          <text x="240" y="52" fill="#fbbf24" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">STEEL CRADLE: 450 MPa</text>
                        </g>
                      )}

                      {/* Thermal Solar Layer Visuals */}
                      {activeWireframeLayer === "thermal" && (
                        <g>
                          {/* Diurnal Solar Trajectory Arc */}
                          <path d="M 60 220 Q 300 20 540 220" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6 4" />
                          <circle cx="300" cy="70" r="10" fill="#f97316" opacity="0.8" />
                          {/* Air Buoyancy Arrows */}
                          <line x1="300" y1="280" x2="300" y2="120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                          <text x="315" y="180" fill="#38bdf8" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">SOLAR BUOYANCY STACK</text>
                          <text x="360" y="45" fill="#f97316" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">23.5° EQUINOX SOLAR AXIS</text>
                        </g>
                      )}

                      {/* Millwork Layer Visuals */}
                      {activeWireframeLayer === "millwork" && (
                        <g>
                          {/* Wall Boiserie Grid */}
                          <rect x="100" y="140" width="100" height="120" fill="none" stroke="#a7f3d0" strokeWidth="1" />
                          <rect x="400" y="140" width="100" height="120" fill="none" stroke="#a7f3d0" strokeWidth="1" />
                          <line x1="150" y1="140" x2="150" y2="260" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="450" y1="140" x2="450" y2="260" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
                          <text x="105" y="132" fill="#a7f3d0" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">RECEESED PIVOT HINGE</text>
                          <text x="405" y="132" fill="#a7f3d0" fontSize="10" fontFamily="var(--font-poppins), 'Poppins', sans-serif">Acoustic STC 54</text>
                        </g>
                      )}

                      {/* Scale Bar */}
                      <line x1="50" y1="330" x2="150" y2="330" stroke="#ffffff" strokeWidth="2" />
                      <line x1="50" y1="325" x2="50" y2="335" stroke="#ffffff" strokeWidth="2" />
                      <line x1="150" y1="325" x2="150" y2="335" stroke="#ffffff" strokeWidth="2" />
                      <text x="65" y="345" fill="#ffffff" fontSize="9" fontFamily="var(--font-poppins), 'Poppins', sans-serif">SCALE: 5.0 METERS</text>
                    </svg>
                  </div>

                  {/* Bottom Bar Scale HUD */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#252d28] text-[10px] text-[#a39f99] font-mono">
                    <span>ACTIVE LAYER: {activeWireframe.label.toUpperCase()}</span>
                    <span>TOLERANCE: &plusmn; 0.2MM</span>
                  </div>
                </div>

                {/* Right Specification & Engineering Details Column */}
                <div className="lg:col-span-5 bg-[#171e19] rounded-2xl border border-[#715a3e]/40 p-6 flex flex-col justify-between shadow-2xl space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3 py-1 rounded-md border border-[#715a3e]/30">
                      {activeWireframe.badge}
                    </span>
                    <h3 className="text-xl text-[#ffffff] font-semibold">
                      {activeWireframe.title}
                    </h3>
                    <p className="text-sm text-[#a39f99]">
                      {activeWireframe.desc}
                    </p>
                  </div>

                  {/* Technical Specs List */}
                  <div className="space-y-3 pt-4 border-t border-[#252d28]">
                    <h4 className="text-[11px] font-semibold text-[#cbb392] ">
                      Calculated Tectonic Metrics
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeWireframe.specs.map((s, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0e1310] p-3 rounded-xl border border-[#252d28] flex items-center justify-between"
                        >
                          <span className="text-sm text-[#a39f99] font-medium">
                            {s.key}
                          </span>
                          <span className="text-sm font-semibold text-[#ffffff] font-mono">
                            {s.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#715a3e]/20 flex items-center justify-center text-[#cbb392] shrink-0">
                      <span className="material-symbols-outlined text-base">engineering</span>
                    </div>
                    <p className="text-[10px] text-[#a39f99] font-mono">
                      All CAD models are validated by independent structural engineers in New Delhi and Gurugram.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COMPANY HISTORY & ARCHITECTURAL LEGACY TIMELINE */}
          <section className="w-full bg-[#f4f3f0] py-14 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#ffffff] px-3 py-1 rounded-full border border-[#e5e2db] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                    Chronological Monograph • 2011 — 2025
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                    Company History & Architectural Legacy
                  </h2>
                </div>
                <p className="text-sm text-[#494740] max-w-md font-normal">
                  Fourteen years of structural breakthroughs, material research laboratories, and international monograph commissions.
                </p>
              </div>

              {/* Timeline Year Stepper Bar */}
              <div className="relative mb-10">
                {/* Connecting Axis Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#e5e2db] -translate-y-1/2 z-0 hidden sm:block" />

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 relative z-10">
                  {timelineData.map((item) => {
                    const isActive = item.year === activeTimelineYear;
                    return (
                      <button
                        key={item.year}
                        onClick={() => setActiveTimelineYear(item.year)}
                        className={`p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 shadow-md ${isActive
                          ? "bg-[#1c1b19] text-[#ffffff] border-[#715a3e] ring-2 ring-[#715a3e]/30 scale-105"
                          : "bg-[#ffffff] text-[#1a1c1a] border-[#e5e2db] hover:border-[#715a3e]/50 hover:bg-[#faf9f6]"
                          }`}
                      >
                        <span className="text-sm font-semibold font-mono">
                          {item.year}
                        </span>
                        <span
                          className={`text-[9px]  font-semibold ${isActive ? "text-[#cbb392]" : "text-[#715a3e]"
                            }`}
                        >
                          {item.city.split(",")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Milestone Card */}
              <div className="bg-[#ffffff] rounded-2xl border border-[#e5e2db] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Milestone Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold text-[#715a3e] font-mono">
                        {activeMilestone.year}
                      </span>
                      <span className="w-px h-4 bg-[#e5e2db]" />
                      <span className="text-sm font-semibold text-[#1a1c1a] ">
                        {activeMilestone.city}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl text-[#1a1c1a] font-semibold">
                      {activeMilestone.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#715a3e] ">
                      {activeMilestone.tagline}
                    </p>
                    <p className="text-sm text-[#494740] font-normal">
                      {activeMilestone.desc}
                    </p>
                  </div>

                  {/* Structural Achievement Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#e5e2db]">
                    {activeMilestone.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#faf9f6] p-3 rounded-xl border border-[#e5e2db]"
                      >
                        <span className="text-[9px] font-semibold text-[#715a3e]  block">
                          {m.label}
                        </span>
                        <span className="text-sm font-semibold text-[#1a1c1a] block mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Visual Column */}
                <div className="lg:col-span-5 bg-[#faf9f6] relative border-t lg:border-t-0 lg:border-l border-[#e5e2db] min-h-[260px] sm:min-h-[320px] overflow-hidden group">
                  <img
                    src={activeMilestone.image}
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b19]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#ffffff]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#715a3e]/30 shadow-md">
                    <span className="text-[9px] font-semibold text-[#715a3e]  block">
                      Archival Monograph Reference
                    </span>
                    <h4 className="text-sm text-[#1a1c1a] font-semibold mt-0.5">
                      {activeMilestone.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Guiding Principles */}
          <section className="w-full bg-[#faf9f6] py-12 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-1 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                    The Spatial Doctrine
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                    Our Guiding Principles
                  </h2>
                </div>
                <p className="text-sm text-[#494740] max-w-md font-normal">
                  Four non-negotiable architectural tenets govern every
                  conceptual stroke, stone selection, and lighting calculation.
                </p>
              </div>

              {/* 4-Pillar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                {/* Principle 01 */}
                <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl border border-[#e5e2db] hover:border-[#715a3e]/50 transition-all duration-300 group overflow-hidden">
                  <div className="-top-3 left-4 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-[9px] px-3 py-0.5 rounded-full  shadow-md flex items-center gap-1 z-10">
                    <span className="w-1 h-1 rounded-full bg-[#ffffff]" />
                    Principle 01
                  </div>
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl text-[#715a3e] font-semibold">01</span>
                      <span className="w-8 h-8 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e]">
                        <span className="material-symbols-outlined text-lg">wb_twilight</span>
                      </span>
                    </div>
                    <h3 className="text-lg text-[#1a1c1a] mb-2 font-semibold">
                      Silence in Form
                    </h3>
                    <p className="text-sm text-[#494740] font-normal">
                      We design spaces that foster contemplative stillness by removing visual noise and erratic proportions.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e2db]">
                    <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md inline-block">
                      Spatial Geometry • Light
                    </span>
                  </div>
                </div>

                {/* Principle 02 */}
                <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl border border-[#e5e2db] hover:border-[#715a3e]/50 transition-all duration-300 group overflow-hidden">
                  <div className="-top-3 left-4 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-[9px] px-3 py-0.5 rounded-full  shadow-md flex items-center gap-1 z-10">
                    <span className="w-1 h-1 rounded-full bg-[#ffffff]" />
                    Principle 02
                  </div>
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl text-[#715a3e] font-semibold">02</span>
                      <span className="w-8 h-8 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e]">
                        <span className="material-symbols-outlined text-lg">terrain</span>
                      </span>
                    </div>
                    <h3 className="text-lg text-[#1a1c1a] mb-2 font-semibold">
                      Uncompromising Materiality
                    </h3>
                    <p className="text-sm text-[#494740] font-normal">
                      We insist exclusively on ethically quarried stone, FSC old-growth timbers, and slaked lime plasters.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e2db]">
                    <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md inline-block">
                      Raw Provenance • Truth
                    </span>
                  </div>
                </div>

                {/* Principle 03 */}
                <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl border border-[#e5e2db] hover:border-[#715a3e]/50 transition-all duration-300 group overflow-hidden">
                  <div className="-top-3 left-4 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-[9px] px-3 py-0.5 rounded-full  shadow-md flex items-center gap-1 z-10">
                    <span className="w-1 h-1 rounded-full bg-[#ffffff]" />
                    Principle 03
                  </div>
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl text-[#715a3e] font-semibold">03</span>
                      <span className="w-8 h-8 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e]">
                        <span className="material-symbols-outlined text-lg">handyman</span>
                      </span>
                    </div>
                    <h3 className="text-lg text-[#1a1c1a] mb-2 font-semibold">
                      Artisanal Collaboration
                    </h3>
                    <p className="text-sm text-[#494740] font-normal">
                      We partner with elite independent master ceramicists, Venetian ironmongers, and Murano glass blowers.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e2db]">
                    <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md inline-block">
                      Couture Guilds • Hands
                    </span>
                  </div>
                </div>

                {/* Principle 04 */}
                <div className="relative bg-[#ffffff] p-5 rounded-xl flex flex-col justify-between h-full shadow-lg hover:shadow-xl border border-[#e5e2db] hover:border-[#715a3e]/50 transition-all duration-300 group overflow-hidden">
                  <div className="-top-3 left-4 absolute bg-[#715a3e] text-[#ffffff] font-semibold text-[9px] px-3 py-0.5 rounded-full  shadow-md flex items-center gap-1 z-10">
                    <span className="w-1 h-1 rounded-full bg-[#ffffff]" />
                    Principle 04
                  </div>
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl text-[#715a3e] font-semibold">04</span>
                      <span className="w-8 h-8 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e]">
                        <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                      </span>
                    </div>
                    <h3 className="text-lg text-[#1a1c1a] mb-2 font-semibold">
                      Living Durability
                    </h3>
                    <p className="text-sm text-[#494740] font-normal">
                      We reject transient decorative trends, constructing spatial architectures that patina with dignity.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#e5e2db]">
                    <span className="text-[10px] font-semibold text-[#715a3e]  bg-[#f4f3f0] px-2.5 py-0.5 rounded-md inline-block">
                      Noble Patina • Trust
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Architectural Workshop In-Action Visual Spread */}
          <section className="w-full bg-[#e9e8e5] py-12 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 space-y-3">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#ffffff] px-3 py-1 rounded-full shadow-sm border border-[#e5e2db]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                    Tactile Laboratory
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#1a1c1a] font-semibold">
                    Tested under 24 hours of simulated diurnal light.
                  </h3>
                  <p className="text-sm text-[#494740] font-normal">
                    In our New Delhi atelier basement, mock-up alcoves reproduce
                    exact natural lighting and acoustic conditions.
                  </p>
                </div>

                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Material Specimen 01 */}
                  <div className="bg-[#ffffff] p-6 shadow-sm border border-[#cbc6bd]/40 space-y-4 hover:border-[#715a3e] transition-colors cursor-pointer group">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-[#715a3e]  block">
                        Specimen 01 • Natural Stone
                      </span>
                      <h4 className="text-lg text-[#1a1c1a] font-semibold">
                        Makrana White Marble
                      </h4>
                      <span className="text-[11px] text-[#494740] font-mono block">
                        Makrana, Rajasthan • Natural Polished
                      </span>
                    </div>
                    <p className="text-xs text-[#494740]">
                      Quarried from natural marble reserves in Makrana, Rajasthan. Features natural gas pockets that absorb high-frequency acoustic echo and diffuse light softly.
                    </p>
                  </div>

                  {/* Specimen 2 */}
                  <div
                    onClick={() =>
                      setSelectedMaterial({
                        title: "Slaked Mineral Marmorino",
                        origin: "Veneto Guild • Hand Troweled",
                        finish: "Hand Troweled Velvet",
                        image:
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLJuIH5qoUyXdT2JV4rPZfMeSEdAydAgaJ6IXa4QeeoxzIb7P8N7MeDNAvc-If-QwEV1woGCnwc1NYcXkmioPryYKbRKyaNEF-43YdoX4S09oGLZN3SkkqZx4VNpuCo7vuKr0fFCJMIKok9bja_jOvE2DwsNHAHmfLzr2k8HGjdyd9ELbzKJA2kdmKDnrT2RGAsGXmSOmSkbKM2sdFH_WLvqcV9VOGzoQt3JCbIAIB_7E6c9El00B",
                        desc: "Hand-applied bio-mineral lime plaster cured over 30 days. Provides a breathable interior envelope with zero synthetic binders.",
                      })
                    }
                    className="overflow-hidden bg-[#ffffff] rounded-xl border border-[#e5e2db] cursor-pointer shadow-md hover:shadow-xl hover:border-[#715a3e]/50 transition-all duration-300 group relative"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Slaked Mineral Marmorino detail"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoLJuIH5qoUyXdT2JV4rPZfMeSEdAydAgaJ6IXa4QeeoxzIb7P8N7MeDNAvc-If-QwEV1woGCnwc1NYcXkmioPryYKbRKyaNEF-43YdoX4S09oGLZN3SkkqZx4VNpuCo7vuKr0fFCJMIKok9bja_jOvE2DwsNHAHmfLzr2k8HGjdyd9ELbzKJA2kdmKDnrT2RGAsGXmSOmSkbKM2sdFH_WLvqcV9VOGzoQt3JCbIAIB_7E6c9El00B"
                      />
                      <div className="absolute top-2 left-2 bg-[#1c1b19]/90 backdrop-blur-md text-[#cbb392] px-2.5 py-0.5 rounded-full text-[9px] font-semibold  border border-[#715a3e]/30 shadow-md">
                        Inspect Specimen
                      </div>
                    </div>
                    <div className="p-3 bg-[#ffffff]">
                      <span className="text-sm font-semibold text-[#1a1c1a] block">
                        Slaked Mineral Marmorino
                      </span>
                      <span className="text-[9px] font-semibold text-[#715a3e] ">
                        Veneto Guild • Hand Troweled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Multidisciplinary Leadership Team */}
          <section className="w-full bg-[#faf9f6] py-12 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="max-w-2xl mb-10 space-y-1.5">
                <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                  The Multidisciplinary Collegium
                </div>
                <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                  Architectural Leadership
                </h2>
                <p className="text-sm text-[#494740] font-normal">
                  Uniting structural engineering, artisanal textile science, and acoustic physics.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-semibold  text-[#715a3e]">
                  <span>Delhi & Gurugram</span>
                  <span>•</span>
                  <span>India</span>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Member 1 */}
                <div className="bg-[#ffffff] p-5 border border-[#cbc6bd]/40 space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#715a3e]  block">
                      Principal Architect
                    </span>
                    <h4 className="text-lg font-semibold text-[#1a1c1a]">
                      Aditya Vardhan
                    </h4>
                    <span className="text-xs text-[#494740]">
                      Delhi Headquarters
                    </span>
                  </div>
                  <p className="text-xs text-[#494740]">
                    Over 18 years leading monolithic civil construction and high-end residential interior architecture.
                  </p>
                  <div className="pt-2 border-t border-[#cbc6bd]/30 text-[11px] text-[#494740]">
                    <strong className="font-semibold text-[#1a1c1a]">Edu:</strong> IIT Delhi • SPA New Delhi
                  </div>
                </div>

                {/* Member 2 */}
                <div className="bg-[#ffffff] p-5 border border-[#cbc6bd]/40 space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#715a3e]  block">
                      Chief Structural Engineer
                    </span>
                    <h4 className="text-lg font-semibold text-[#1a1c1a]">
                      Siddharth Malhotra
                    </h4>
                    <span className="text-xs text-[#494740]">
                      Delhi • Mumbai
                    </span>
                  </div>
                  <p className="text-xs text-[#494740]">
                    Pioneered hybrid steel and post-tensioned concrete foundations for earthquake-resistant luxury villas.
                  </p>
                </div>

                {/* Member 3 */}
                <div className="bg-[#ffffff] p-5 border border-[#cbc6bd]/40 space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#715a3e]  block">
                      Director of Interiors
                    </span>
                    <h4 className="text-lg font-semibold text-[#1a1c1a]">
                      Kavita Sharma
                    </h4>
                    <span className="text-xs text-[#494740]">
                      Gurugram Studio
                    </span>
                  </div>
                  <p className="text-xs text-[#494740]">
                    Specializes in luxury interior architecture, custom teak joinery, and natural stone fireplaces.
                  </p>
                  <div className="pt-2 border-t border-[#cbc6bd]/30 text-[11px] text-[#494740]">
                    <strong className="font-semibold text-[#1a1c1a]">Edu:</strong> NID Ahmedabad • SPA Delhi
                  </div>
                </div>

                {/* Member 4 */}
                <div className="bg-[#ffffff] p-5 border border-[#cbc6bd]/40 space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#715a3e]  block">
                      Lead of Lighting & Automation
                    </span>
                    <h4 className="text-lg font-semibold text-[#1a1c1a]">
                      Rohan Malhotra
                    </h4>
                    <span className="text-xs text-[#494740]">
                      Bengaluru Studio
                    </span>
                  </div>
                  <p className="text-xs text-[#494740]">
                    Expert in concealed warm LED cove lighting, acoustic glass dampening, and smart home automation.
                  </p>
                  <div className="pt-2 border-t border-[#cbc6bd]/30 text-[11px] text-[#494740]">
                    <strong className="font-semibold text-[#1a1c1a]">Edu:</strong> IISc Bengaluru • IIT Bombay
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Awards & Cultural Recognition */}
          <section className="w-full bg-[#181715] text-white py-12 rounded-2xl my-8 max-w-[1600px] mx-auto overflow-hidden shadow-xl border border-[#715a3e]/30">
            <div className="px-5 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                <div className="lg:col-span-4 space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3 py-1 rounded-full border border-[#715a3e]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e] animate-pulse" />
                    Recognition
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-white font-semibold">
                    Accolades & Distinctions
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm text-[#e3e2e0] font-normal">
                    Honored by global architectural institutions for our dedication to sustainable structural restoration.
                  </p>
                </div>
              </div>

              {/* Awards List Stack */}
              <div className="space-y-3">
                {/* Award 1 */}
                <div className="bg-[#24221f] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#715a3e]/30 hover:border-[#cbb392] transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl text-[#cbb392] font-semibold">2024</span>
                    <div>
                      <h3 className="text-sm sm:text-base text-white font-semibold">
                        National Architectural Excellence Laureate
                      </h3>
                      <p className="text-[11px] text-[#e3e2e0]/70">
                        Excellence in Civil Construction & Interior Design • Vasant Vihar Villa, New Delhi
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3 py-1 rounded-md shrink-0">
                    Grand Prix
                  </span>
                </div>

                {/* Award 2 */}
                <div className="bg-[#24221f] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#715a3e]/30 hover:border-[#cbb392] transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl text-[#cbb392] font-semibold">2022–24</span>
                    <div>
                      <h3 className="text-sm sm:text-base text-white font-semibold">
                        AD100 Hall of Fame
                      </h3>
                      <p className="text-[11px] text-[#e3e2e0]/70">
                        Architectural Digest Global List of Top Visionaries • 3 Consecutive Years
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3 py-1 rounded-md shrink-0">
                    Global List
                  </span>
                </div>

                {/* Award 3 */}
                <div className="bg-[#24221f] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#715a3e]/30 hover:border-[#cbb392] transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl text-[#cbb392] font-semibold">2023</span>
                    <div>
                      <h3 className="text-sm sm:text-base text-white font-semibold">
                        Dezeen Interior Awards Winner
                      </h3>
                      <p className="text-[11px] text-[#e3e2e0]/70">
                        Best Residential Interior Worldwide • Greenwich Townhouse, NY
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#cbb392]  bg-[#715a3e]/20 px-3 py-1 rounded-md shrink-0">
                    Global Winner
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Studio Culture & Sustainability Pledge */}
          <section className="w-full bg-[#faf9f6] py-12 border-b border-[#e5e2db]">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                      Environmental Consciousness
                    </div>
                    <h2 className="text-2xl sm:text-3xl text-[#1a1c1a] font-semibold">
                      Commissioning Havenely Infrastructure
                    </h2>
                    <p className="text-sm text-[#494740] font-normal">
                      We limit concurrent commissions to ensure structural rigor and fabrication precision.
                    </p>
                  </div>

                  {/* Infographic Ring */}
                  <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e5e2db] shadow-md mt-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-[#e5e2db]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="text-[#715a3e]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="85, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-base font-semibold text-[#1a1c1a]">
                            85%
                          </span>
                          <span className="text-[8px] font-semibold text-[#715a3e] ">
                            Local
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#1a1c1a] font-semibold mb-0.5">
                          Geological Proximity Mandate
                        </h4>
                        <p className="text-[11px] text-[#494740] font-normal">
                          Sourcing quarried stone and timber within 300km of project coordinates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Pledges */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e5e2db] shadow-md flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                      <span className="material-symbols-outlined text-lg">nest_eco_leaf</span>
                    </div>
                    <div>
                      <h3 className="text-base text-[#1a1c1a] font-semibold mb-0.5">
                        Carbon-Neutral Build Protocols
                      </h3>
                      <p className="text-sm text-[#494740] font-normal">
                        Calculations account for embodied carbon and long-term operational efficiency.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e5e2db] shadow-md flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                      <span className="material-symbols-outlined text-lg">apartment</span>
                    </div>
                    <div>
                      <h3 className="text-base text-[#1a1c1a] font-semibold mb-0.5">
                        Adaptive Reuse Over Demolition
                      </h3>
                      <p className="text-sm text-[#494740] font-normal">
                        Preserving existing masonry shells and reinforcing historic foundations.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e5e2db] shadow-md flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#715a3e]/10 flex items-center justify-center text-[#715a3e] shrink-0">
                      <span className="material-symbols-outlined text-lg">clean_hands</span>
                    </div>
                    <div>
                      <h3 className="text-base text-[#1a1c1a] font-semibold mb-0.5">
                        Zero Chemical Toxicity Interiors
                      </h3>
                      <p className="text-sm text-[#494740] font-normal">
                        Pure mineral plasters and natural waxes off-gassing zero toxic compounds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Editorial Inquiries Banner */}
          <section className="w-full bg-[#e9e8e5] py-10">
            <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
              <div className="bg-[#ffffff] p-6 md:p-8 rounded-2xl border border-[#715a3e]/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#715a3e]  bg-[#715a3e]/10 px-3 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#715a3e]" />
                    Initiate a Dialogue
                  </div>
                  <h2 className="text-xl sm:text-2xl text-[#1a1c1a] font-semibold">
                    Commissioning Atelier Vane for Your Residence or Estate
                  </h2>
                  <p className="text-sm text-[#494740] font-normal">
                    We limit our concurrent practice to select commissions worldwide annually.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="bg-[#1c1b19] text-white text-sm font-semibold  px-6 py-3 rounded-xl hover:bg-[#715a3e] transition-all duration-300 shadow-md text-center flex items-center gap-2"
                  >
                    <span>Request Consultation</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link
                    href="/portfolio"
                    className="bg-[#f4f3f0] text-[#1a1c1a] border border-[#e5e2db] text-sm font-semibold  px-6 py-3 rounded-xl hover:bg-[#1c1b19] hover:text-white transition-all duration-300 text-center flex items-center gap-2"
                  >
                    <span>Monographs</span>
                    <span className="material-symbols-outlined text-base">folder_open</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
