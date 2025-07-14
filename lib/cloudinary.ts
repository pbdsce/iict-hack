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
    // Validate input parameters
    if (!filePath || typeof filePath !== "string") {
      throw new Error("Invalid file path provided");
    }

    if (!folder || typeof folder !== "string") {
      throw new Error("Invalid folder name provided");
    }

    // Check if Cloudinary is properly configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error(
        "Cloudinary configuration is incomplete. Please check environment variables."
      );
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: `iict-hackathon/${folder}`,
      resource_type: resourceType,
      // Use original filename
      use_filename: true,
      unique_filename: true,
      // Allow file overwrite if needed
      overwrite: false,
      // Add timeout to prevent hanging
      timeout: 60000, // 60 seconds
    });

    if (!result || !result.secure_url) {
      throw new Error("Upload completed but no secure URL was returned");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", {
      error: error instanceof Error ? error.message : String(error),
      filePath,
      folder,
      resourceType,
      timestamp: new Date().toISOString(),
    });

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Invalid image file")) {
        throw new Error(
          "The uploaded file is not a valid image or document format"
        );
      } else if (error.message.includes("File size too large")) {
        throw new Error("The uploaded file exceeds the maximum allowed size");
      } else if (error.message.includes("timeout")) {
        throw new Error(
          "File upload timed out. Please try again with a smaller file"
        );
      } else if (error.message.includes("configuration")) {
        throw error; // Re-throw configuration errors as-is
      }
    }

    throw new Error(
      `Failed to upload file: ${
        error instanceof Error ? error.message : "Unknown error occurred"
      }`
    );
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
    // Validate input parameters
    if (!publicId || typeof publicId !== "string") {
      throw new Error("Invalid public ID provided");
    }

    // Check if Cloudinary is properly configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary configuration is incomplete");
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    const success = result.result === "ok";

    if (!success) {
      console.warn(`Failed to delete file from Cloudinary: ${publicId}`, {
        result: result.result,
        publicId,
        resourceType,
      });
    }

    return success;
  } catch (error) {
    console.error("Cloudinary delete error:", {
      error: error instanceof Error ? error.message : String(error),
      publicId,
      resourceType,
      timestamp: new Date().toISOString(),
    });
    return false;
  }
};

export default cloudinary;
