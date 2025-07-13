import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param filePath - Local file path to upload
 * @param folder - Cloudinary folder to organize uploads
 * @param resourceType - Type of resource (auto, image, video, raw)
 * @returns Promise<string> - The secure URL of the uploaded file
 */
export const uploadToCloudinary = async (
  filePath: string,
  folder: string,
  resourceType: "auto" | "image" | "video" | "raw" = "auto"
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `iict-hackathon/${folder}`,
      resource_type: resourceType,
      // Use original filename
      use_filename: true,
      unique_filename: true,
      // Allow file overwrite if needed
      overwrite: false,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload file to Cloudinary: ${error}`);
  }
};

/**
 * Delete a file from Cloudinary
 * @param publicId - The public ID of the file to delete
 * @param resourceType - Type of resource (image, video, raw)
 * @returns Promise<boolean> - Success status
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "image" | "video" | "raw" = "raw"
): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};

export default cloudinary;
