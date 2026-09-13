import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  meetingDate: z.string().min(1, "Preferred meeting date is required"),
  meetingType: z.string().default("virtual"),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const parseResult = bookingSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Booking failed due to invalid entered data",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create(parseResult.data);

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
        message: "Consultation meeting booked successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to book consultation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
