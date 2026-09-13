import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  footprint: string;
  palette: string;
  scope: string;
  tag: string;
  image: string;
  description: string;
  details: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    footprint: { type: String, required: true },
    palette: { type: String, required: true },
    scope: { type: String, required: true },
    tag: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
