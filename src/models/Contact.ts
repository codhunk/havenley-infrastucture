import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  organization?: string;
  email: string;
  phone: string;
  typology: string;
  location?: string;
  area?: string;
  investment?: string;
  phase?: string;
  vision: string;
  nda: boolean;
  status: "pending" | "reviewed" | "contacted" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema(
  {
    name: { type: String, required: true },
    organization: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    typology: { type: String, required: true },
    location: { type: String, default: "" },
    area: { type: String, default: "" },
    investment: { type: String, default: "" },
    phase: { type: String, default: "" },
    vision: { type: String, required: true },
    nda: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "contacted", "archived"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
