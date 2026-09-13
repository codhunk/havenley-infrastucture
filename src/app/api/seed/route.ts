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
    slug: "cyber-city-office",
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
    slug: "golf-course-penthouse",
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
  {
    slug: "chhatarpur-farmhouse-estate",
    title: "Chhatarpur Private Estate",
    subtitle: "Ground-up Civil Build & Landscape Atelier",
    location: "Chhatarpur, New Delhi",
    year: "2023",
    footprint: "1,200 m² (13,000 sq ft)",
    palette: "Slaked Lime & Cast Bronze",
    scope: "Turnkey Architecture & Civil EPC",
    tag: "Civil Construction",
    image: "/images/gravel_court.jpg",
    description:
      "A monolithic ground-up private estate blending slaked lime exterior plasters, cast bronze entry portals, and internal courtyard water gardens.",
    details: [
      "Seismic Grade-A reinforced concrete framing and long-span steel joists",
      "Custom slaked lime plaster facade with regional stone accents",
      "Courtyard reflection pool with integrated acoustic stone waterfall",
      "Underground 8-car gallery garage with climate-controlled ventilation",
    ],
  },
  {
    slug: "bkc-executive-lounge",
    title: "BKC Executive Headquarters",
    subtitle: "Turnkey Corporate Fitout & Acoustic Glazing",
    location: "BKC, Mumbai",
    year: "2024",
    footprint: "850 m² (9,150 sq ft)",
    palette: "Smoked Oak & Polished Brass",
    scope: "Turnkey Fitout & MEP Engineering",
    tag: "Turnkey Commercial",
    image: "/images/kyoto_tea_house.jpg",
    description:
      "High-performance executive corporate headquarters featuring smoked oak millwork, modular glass conference rooms, and integrated MEP engineering.",
    details: [
      "Triple-layer STC-52 acoustic partition system for boardrooms",
      "Bespoke smoked oak veneer wall paneling and linear LED coves",
      "Custom marble executive bar & private client dining salon",
      "Full BMS integration for automated lighting, security, and air quality",
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
