import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address (e.g. patron@domain.com)"),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .regex(/^[+0-9\s-()]+$/, "Phone number contains invalid characters"),
  typology: z.string().min(1, "Please select a project typology"),
  location: z.string().optional(),
  area: z.string().optional(),
  investment: z.string().optional(),
  phase: z.string().optional(),
  vision: z
    .string()
    .min(10, "Project Vision & Notes must be at least 10 characters long"),
  nda: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Submission failed due to invalid form input. Please fix highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const newContact = await Contact.create(parseResult.data);

    return NextResponse.json(
      {
        success: true,
        data: newContact,
        message: "Your spatial commission inquiry has been securely logged.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process inquiry submission",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
