import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in form data" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await uploadImageToCloudinary(buffer, "havenley_projects");

    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: "Image uploaded successfully to Cloudinary",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Cloudinary image upload failed" },
      { status: 500 }
    );
  }
}
