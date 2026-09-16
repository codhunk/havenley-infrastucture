import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import Booking from "@/models/Booking";
import Contact from "@/models/Contact";
import Subscriber from "@/models/Subscriber";

const initialProjects = [
  {
    slug: "vasant-vihar-villa",
    title: "Vasant Vihar Luxury Villa",
    subtitle: "Ground-up Civil Build & Italian Marble Fitout",
    location: "Vasant Vihar, New Delhi",
    year: "2024",
    footprint: "650 m² (7,000 sq ft)",
    palette: "RCC Framing, Italian Marble & Teak Wood",
    scope: "Civil Construction & Interiors",
    tag: "Residential Villa",
    image: "/images/villa_miramar.jpg",
    description:
      "Full-cycle civil construction and interior execution from deep foundation RCC structural framing to POP false ceiling coves, Italian marble flooring, and bespoke modular kitchen interiors.",
    details: [
      "Deep foundation, pile cap & seismic Grade-A RCC structural framing",
      "Precision red brickwork masonry, waterproof plastering & exterior weather-shield coating",
      "POP decorative mouldings, gypsum false ceiling with concealed LED light coves",
      "Imported Bottochino Italian marble flooring, custom teak wardrobes & modular kitchen fitout",
    ],
  },
  {
    slug: "cyber-city-office",
    title: "Cyber City Corporate Suite",
    subtitle: "Commercial Fitout, Acoustic Glazing & Modular Interiors",
    location: "Cyber City, Gurugram",
    year: "2024",
    footprint: "480 m² (5,200 sq ft)",
    palette: "Glass, Steel, Gypsum Partitions & Warm Timber",
    scope: "Commercial Interior Fitout",
    tag: "Corporate Fitout",
    image: "/images/tribeca_penthouse.jpg",
    description:
      "Turnkey commercial interior execution including gypsum partition walls, acoustic false ceilings, custom reception desks, modular workstation furniture, and energy-efficient electrical fittings.",
    details: [
      "Double-glazed acoustic glass cabins & fire-rated gypsum partition walls",
      "POP false ceiling tiles with integrated LED troffers and HVAC diffusers",
      "Custom solid wood reception counters & ergonomic modular office workstations",
      "Concealed electrical wiring, plumbing for pantries, and access control infrastructure",
    ],
  },
  {
    slug: "golf-course-penthouse",
    title: "Golf Course Road Penthouse",
    subtitle: "Luxury Apartment Interior & Custom Furniture Execution",
    location: "Golf Course Road, Gurugram",
    year: "2023",
    footprint: "380 m² (4,100 sq ft)",
    palette: "Calacatta Quartz, Fluted Panels & Texture Paint",
    scope: "Full Interior Renovation",
    tag: "Luxury Penthouse",
    image: "/images/maison_saint_germain.jpg",
    description:
      "Complete interior finishing service featuring wall panels, decorative texture painting, modular kitchen cabinets, walk-in wardrobes, and designer lighting fixtures.",
    details: [
      "Designer POP wall paneling, ceiling coves & royal texture paint finishes",
      "Monolithic Calacatta quartz modular kitchen island with soft-close cabinetry",
      "Custom floor-to-ceiling wardrobes, concealed pivot doors & wall decor accents",
      "Bespoke bathroom tiling, concealed plumbing fixtures & smart electrical fittings",
    ],
  },
  {
    slug: "chhatarpur-farmhouse-estate",
    title: "Chhatarpur Private Estate",
    subtitle: "Civil Structural Build & Waterproofing Masterwork",
    location: "Chhatarpur, New Delhi",
    year: "2023",
    footprint: "1,200 m² (13,000 sq ft)",
    palette: "RCC Concrete, Slaked Lime Plaster & Stone Tiling",
    scope: "Turnkey Civil Construction",
    tag: "Civil Construction",
    image: "/images/gravel_court.jpg",
    description:
      "Comprehensive civil construction project from foundation excavation, RCC beam casting, and exterior plastering to basement waterproofing and customized door/window installations.",
    details: [
      "Heavy excavation, RCC raft foundation & load-bearing RCC column grid",
      "External double-coat plastering & multi-layer elastomeric waterproofing membrane",
      "Custom anodized aluminum doors, double-glazed glass windows & stone wall cladding",
      "Underground drainage, plumbing networks, high-capacity electrical main panels",
    ],
  },
  {
    slug: "bkc-executive-lounge",
    title: "BKC Executive Headquarters",
    subtitle: "Commercial Construction & Modular Workspace Execution",
    location: "BKC, Mumbai",
    year: "2024",
    footprint: "850 m² (9,150 sq ft)",
    palette: "Smoked Oak, Gypsum Ceiling & Polished Brass",
    scope: "Turnkey Commercial",
    tag: "Turnkey Commercial",
    image: "/images/kyoto_tea_house.jpg",
    description:
      "Turnkey commercial workspace build involving structural steel reinforcements, gypsum ceiling partitions, modular executive furniture, custom cabinetry, and ambient lighting.",
    details: [
      "Acoustic gypsum partition walls with STC-52 sound isolation rating",
      "Bespoke smoked oak veneer wall paneling, false ceiling coves & linear LED lighting",
      "Custom executive board tables, modular storage cabinets & client hospitality bar",
      "Complete MEP engineering including electrical wiring, plumbing & fire safety systems",
    ],
  },
];

const initialBookings = [
  {
    name: "Lord Sterling Sterling",
    email: "sterling@estate.co.uk",
    phone: "+44 20 7946 0912",
    meetingDate: "2026-09-20 14:00",
    meetingType: "virtual",
    notes: "Discussion on coastal estate structural foundation and Italian marble sourcing.",
    status: "confirmed",
  },
  {
    name: "Aarav Kapoor",
    email: "aarav.kapoor@innovate.in",
    phone: "+91 98112 34567",
    meetingDate: "2026-09-22 11:30",
    meetingType: "in-person",
    notes: "Atelier visit in New Delhi for Vasant Vihar luxury villa interior overhaul.",
    status: "confirmed",
  },
  {
    name: "Dr. Vikramaditya Singhania",
    email: "singhania.familyoffice@singhania.com",
    phone: "+91 22 4001 8899",
    meetingDate: "2026-09-25 16:00",
    meetingType: "site-audit",
    notes: "On-site engineering audit for Chhatarpur private estate ground-up construction.",
    status: "completed",
  },
];

const initialContacts = [
  {
    name: "Lord Sterling Sterling",
    organization: "Sterling Family Office",
    email: "sterling@estate.co.uk",
    phone: "+44 20 7946 0912",
    typology: "Private Residence & Coastal Estate",
    location: "Saint-Moritz, Switzerland",
    area: "800+ m²",
    investment: "$3,000,000 + (Masterworks)",
    phase: "concept",
    vision: "Seeking monastic poise, raw travertine, and unlacquered bronze in a mountain sanctuary build.",
    nda: true,
    status: "reviewed",
  },
  {
    name: "Aarav Kapoor",
    organization: "Kapoor Enterprises",
    email: "aarav.kapoor@innovate.in",
    phone: "+91 98112 34567",
    typology: "Turnkey Construction & Civil Engineering",
    location: "Vasant Vihar, New Delhi",
    area: "300–800 m²",
    investment: "$1,500,000 – $3,000,000",
    phase: "concept",
    vision: "Turnkey civil build with Italian Bottochino marble flooring and double-glazed sliding glass walls.",
    nda: true,
    status: "pending",
  },
];

const initialSubscribers = [
  {
    email: "patron.journal@havenley.com",
    status: "active",
  },
  {
    email: "architecture.digest@estate-journal.org",
    status: "active",
  },
  {
    email: "familyoffice.principal@singhania.com",
    status: "active",
  },
];

export async function POST() {
  try {
    await connectToDatabase();
    
    // Seed Projects if empty
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
      await Project.insertMany(initialProjects);
    }

    // Seed Consultation Bookings if empty
    const bookCount = await Booking.countDocuments();
    if (bookCount === 0) {
      await Booking.insertMany(initialBookings);
    }

    // Seed Contact Inquiries if empty
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.insertMany(initialContacts);
    }

    // Seed Journal Subscribers if empty
    const subCount = await Subscriber.countDocuments();
    if (subCount === 0) {
      await Subscriber.insertMany(initialSubscribers);
    }

    return NextResponse.json({
      success: true,
      message: "Database check complete and seeded initial dataset.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
