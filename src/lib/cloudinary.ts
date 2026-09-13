import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlikang5q",
  api_key: process.env.CLOUDINARY_API_KEY || "465584199289917",
  api_secret: process.env.CLOUDINARY_API_SECRET || "oIESUWFcliIJowE1kYifW8LKrsQ",
  secure: true,
});

export default cloudinary;

export async function uploadImageToCloudinary(fileBuffer: Buffer, folder = "havenley_projects"): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Failed to upload image to Cloudinary"));
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
}
