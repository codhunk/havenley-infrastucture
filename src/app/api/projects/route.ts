import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subtitle: z.string().min(2, "Subtitle is required"),
  location: z.string().min(2, "Location is required"),
  year: z.string().min(2, "Year is required"),
  footprint: z.string().min(2, "Footprint is required"),
  palette: z.string().min(2, "Palette is required"),
  scope: z.string().min(2, "Scope is required"),
  tag: z.string().min(2, "Tag is required"),
  image: z.string().url("Valid image URL or Cloudinary path is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  details: z.array(z.string()).min(1, "At least one project detail is required"),
});

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    const query = tag && tag !== "all" ? { tag } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const parseResult = createProjectSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed for entered project data",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;
    const slug =
      validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const newProject = await Project.create({
      ...validatedData,
      slug,
    });

    return NextResponse.json(
      { success: true, data: newProject, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
