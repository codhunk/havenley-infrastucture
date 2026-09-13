import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { z } from "zod";

const subscriberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const parseResult = subscriberSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          data: existing,
          message: "You are already subscribed to Havenley Journal.",
        },
        { status: 200 }
      );
    }

    const newSubscriber = await Subscriber.create({
      email: email.toLowerCase(),
      status: "active",
    });

    return NextResponse.json(
      {
        success: true,
        data: newSubscriber,
        message: "Thank you for subscribing to Havenley Journal.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process newsletter subscription.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch journal subscribers.",
      },
      { status: 500 }
    );
  }
}
