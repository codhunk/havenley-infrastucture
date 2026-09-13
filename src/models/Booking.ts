import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  meetingDate: string;
  meetingType: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    meetingDate: { type: String, required: true },
    meetingType: { type: String, required: true, default: "virtual" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["confirmed", "completed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
