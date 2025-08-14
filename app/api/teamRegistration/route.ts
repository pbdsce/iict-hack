import { NextResponse } from "next/server";
import {
  connectDB,
  TeamRegistration,
  sanitizeRegexInput,
} from "@/lib/database";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  teamRegistrationRateLimit,
  teamRegistrationAccessRateLimit,
} from "@/lib/rateLimiter";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// Interface for participant data from frontend
interface ParticipantData {
  name: string;
  email: string;
  age: string;
  phone: string;
  stdCode?: string;
  studentOrProfessional: string;
  collegeOrCompanyName: string;
  githubLink?: string;
  linkedinLink?: string;
  devfolioLink?: string;
}

// Utility functions for format validation
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

const validateAge = (age: string) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum > 0 && ageNum < 120;
};

// GitHub username validation (frontend sends username only)
const validateGithubUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// LinkedIn username validation (frontend sends username only)
const validateLinkedinUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// DevFolio username validation (frontend sends username only)
const validateDevfolioUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// Helper functions to convert usernames to full URLs
const convertGithubUsernameToUrl = (username: string) => {
  return `https://github.com/${username}`;
};

const convertLinkedinUsernameToUrl = (username: string) => {
  return `https://linkedin.com/in/${username}`;
};

const convertDevfolioUsernameToUrl = (username: string) => {
  return `https://devfolio.co/@${username}`;
};

// Parse multipart form data
const parseForm = async (
  req: Request
): Promise<{
  fields: Record<string, string>;
  files: Record<
    string,
    {
      filepath: string;
      originalFilename: string;
      mimetype: string;
      size: number;
    }
  >;
}> => {
  const formData = await req.formData();
  const fields: Record<string, string> = {};
  const files: Record<
    string,
    {
      filepath: string;
      originalFilename: string;
      mimetype: string;
      size: number;
    }
  > = {};

  // Get system temp directory
  const tempDir = os.tmpdir();

  // Process all form data
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      // Handle file upload
      const file = value as File;
      if (file.size > 0) {
        const fileName = file.name;
        const tempFilePath = path.join(tempDir, `${Date.now()}_${fileName}`);

        // Save file to temp directory
        const buffer = await file.arrayBuffer();
        fs.writeFileSync(tempFilePath, Buffer.from(buffer));

        files[key] = {
          filepath: tempFilePath,
          originalFilename: fileName,
          mimetype: file.type,
          size: file.size,
        };
      }
    } else {
      // Handle regular form field
      fields[key] = value as string;
    }
  }

  return { fields, files };
};

export async function POST(request: Request) {
  // Apply rate limiting for team registration
  const rateLimitResponse = await teamRegistrationRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Connect to database
    await connectDB();

    // Parse form data with files
    const { fields, files } = await parseForm(request);
    const data = { ...fields };

    // Parse participants data
    let participants;
    try {
      participants = JSON.parse(data.participants || "[]");
    } catch {
      return NextResponse.json(
        {
          message: "Invalid participants data format.",
          error: "Invalid JSON in participants field",
        },
        { status: 400 }
      );
    }

    // Validate required team fields
    if (
      !data.team_name ||
      !data.team_size ||
      !participants ||
      participants.length === 0
    ) {
      return NextResponse.json(
        {
          message: "Required team information is missing.",
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Validate team size
    const teamSize = parseInt(data.team_size);
    if (isNaN(teamSize) || teamSize < 1 || teamSize > 4) {
      return NextResponse.json(
        {
          message: "Team size must be between 1 and 4.",
          error: "Invalid team size",
        },
        { status: 400 }
      );
    }

    // Check if team name already exists
    const safeTeamName = sanitizeRegexInput(data.team_name.trim());
    const existingTeam = await TeamRegistration.findOne({
      team_name: { $regex: `^${safeTeamName}$`, $options: "i" },
    });

    if (existingTeam) {
      return NextResponse.json(
        {
          message: "Team name already exists. Please choose a different name.",
          error: "Duplicate team name",
        },
        { status: 409 }
      );
    }

    // Validate participants array length matches team size
    if (participants.length !== teamSize) {
      return NextResponse.json(
        {
          message: "Number of participants must match team size.",
          error: "Participant count mismatch",
        },
        { status: 400 }
      );
    }

    // Check for duplicate emails across all existing registrations
    const allEmails = participants.map((p: { email: string }) => p.email);
    const existingEmailRegistrations = await TeamRegistration.find({
      "participants.email": { $in: allEmails },
    });

    if (existingEmailRegistrations.length > 0) {
      const usedEmails = existingEmailRegistrations.flatMap((reg) =>
        reg.participants.map((p: { email: string }) => p.email)
      );
      const duplicateEmails = allEmails.filter((email: string) =>
        usedEmails.includes(email)
      );

      return NextResponse.json(
        {
          message: "Some participants are already registered in other teams.",
          error: "Duplicate participant emails",
          duplicate_emails: duplicateEmails,
        },
        { status: 409 }
      );
    }

    // Validate each participant
    const participantErrors: Record<string, string[]> = {};
    const emails = new Set();
    const phones = new Set();

    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      const errors: string[] = [];

      // Validate required fields
      if (!participant.name?.trim()) {
        errors.push("Name is required");
      }

      if (!participant.email?.trim()) {
        errors.push("Email is required");
      } else if (!validateEmail(participant.email)) {
        errors.push("Invalid email format");
      } else if (emails.has(participant.email)) {
        errors.push("Duplicate email within team");
      } else {
        emails.add(participant.email);
      }

      if (!participant.age?.trim()) {
        errors.push("Age is required");
      } else if (!validateAge(participant.age)) {
        errors.push("Invalid age (must be between 1 and 120)");
      }

      if (!participant.phone?.trim()) {
        errors.push("Phone number is required");
      } else if (!validatePhone(participant.phone)) {
        errors.push("Phone number must be 10 digits");
      } else {
        const fullPhone = (participant.stdCode || "+91") + participant.phone;
        if (phones.has(fullPhone)) {
          errors.push("Duplicate phone number within team");
        } else {
          phones.add(fullPhone);
        }
      }

      if (!participant.studentOrProfessional) {
        errors.push("Must specify if student or professional");
      }

      if (!participant.collegeOrCompanyName?.trim()) {
        errors.push(
          participant.studentOrProfessional === "professional"
            ? "Company name is required"
            : "College/University is required"
        );
      }

      // Validate professional profiles (optional but must be valid if provided)
      if (
        participant.githubLink &&
        !validateGithubUsername(participant.githubLink)
      ) {
        errors.push("Invalid GitHub username");
      }

      if (
        participant.linkedinLink &&
        !validateLinkedinUsername(participant.linkedinLink)
      ) {
        errors.push("Invalid LinkedIn username");
      }

      if (
        participant.devfolioLink &&
        !validateDevfolioUsername(participant.devfolioLink)
      ) {
        errors.push("Invalid DevFolio username");
      }

      if (errors.length > 0) {
        participantErrors[`participant_${i}`] = errors;
      }
    }

    // If there are participant validation errors, return them
    if (Object.keys(participantErrors).length > 0) {
      return NextResponse.json(
        {
          message: "Participant validation failed.",
          error: "Invalid participant data",
          participant_errors: participantErrors,
        },
        { status: 400 }
      );
    }

    // Validate idea information
    if (!data.idea_title?.trim()) {
      return NextResponse.json(
        {
          message: "Idea title is required.",
          error: "Missing idea title",
        },
        { status: 400 }
      );
    }

    // Check if idea document is provided
    if (!files.idea_document) {
      return NextResponse.json(
        {
          message: "Idea document is required.",
          error: "Missing idea document",
        },
        { status: 400 }
      );
    }

    // Validate idea document
    const ideaDocumentFile = files.idea_document;
    if (
      !ideaDocumentFile.mimetype.includes("pdf") &&
      !ideaDocumentFile.mimetype.includes("doc")
    ) {
      return NextResponse.json(
        {
          message: "Idea document must be in PDF or DOC format.",
          error: "Invalid document format",
        },
        { status: 400 }
      );
    }

    // Check file size limit (5MB for idea documents)
    if (ideaDocumentFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          message: "Idea document size must be under 5MB.",
          error: "File size limit exceeded",
        },
        { status: 413 }
      );
    }

    // Upload idea document to Cloudinary
    let ideaDocumentUrl;
    try {
      ideaDocumentUrl = await uploadToCloudinary(
        ideaDocumentFile.filepath,
        "idea_documents",
        "raw" // Use 'raw' for documents (PDF, DOC, etc.)
      );
    } catch (error) {
      console.error("Failed to upload idea document:", error);
      return NextResponse.json(
        {
          message: "Failed to upload idea document.",
          error: String(error),
        },
        { status: 500 }
      );
    }

    // Create team registration in database
    const teamRegistration = new TeamRegistration({
      team_name: data.team_name.trim(),
      team_size: teamSize,
      idea_title: data.idea_title.trim(),
      idea_document_url: ideaDocumentUrl,
      participants: participants.map((participant: ParticipantData) => ({
        name: participant.name.trim(),
        email: participant.email.trim().toLowerCase(),
        age: parseInt(participant.age),
        phone: (participant.stdCode || "+91") + participant.phone,
        student_or_professional: participant.studentOrProfessional,
        college_or_company_name: participant.collegeOrCompanyName.trim(),
        // Convert usernames to full URLs before saving
        github_profile: participant.githubLink?.trim()
          ? convertGithubUsernameToUrl(participant.githubLink.trim())
          : undefined,
        linkedin_profile: participant.linkedinLink?.trim()
          ? convertLinkedinUsernameToUrl(participant.linkedinLink.trim())
          : undefined,
        // DevFolio username also needs to be converted to full URL
        devfolio_profile: participant.devfolioLink?.trim()
          ? convertDevfolioUsernameToUrl(participant.devfolioLink.trim())
          : undefined,
      })),
      status: "registered",
    });

    // Save to database
    const savedTeam = await teamRegistration.save();

    // Clean up temporary files
    try {
      if (ideaDocumentFile.filepath) {
        fs.unlinkSync(ideaDocumentFile.filepath);
      }
    } catch (cleanupError) {
      console.warn("Failed to clean up temporary file:", cleanupError);
    }

    return NextResponse.json(
      {
        message: "Team registration successful!",
        team_id: savedTeam._id.toString(),
        team_name: savedTeam.team_name,
        participants_count: savedTeam.team_size,
        registration_date: savedTeam.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: "An error occurred during registration.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check team name availability
export async function GET(request: Request) {
  // Apply rate limiting for team registration access (form interactions)
  const rateLimitResponse = await teamRegistrationAccessRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get("team_name");

  if (!teamName) {
    return NextResponse.json(
      { message: "Team name parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Connect to database
    await connectDB();

    // Check database for existing team names
    const safeTeamName = sanitizeRegexInput(teamName.trim());
    const existingTeam = await TeamRegistration.findOne({
      team_name: { $regex: `^${safeTeamName}$`, $options: "i" },
    });

    const isAvailable = !existingTeam;

    return NextResponse.json({
      available: isAvailable,
      team_name: teamName,
      message: isAvailable
        ? "Team name is available"
        : "Team name is already taken",
    });
  } catch (error) {
    console.error("Team name check error:", error);
    return NextResponse.json(
      { message: "An error occurred", error: String(error) },
      { status: 500 }
    );
  }
}
