import { NextResponse } from "next/server";
import { connectDB, College } from "@/lib/database";

// Interface definitions
interface Participant {
  name: string;
  email: string;
  age: string;
  phone: string;
  studentOrProfessional: string;
  collegeOrCompanyName: string;
  githubLink?: string;
  linkedinLink?: string;
  devfolioLink?: string;
}

// Utility functions for validation
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

const validateAge = (age: string) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum > 0 && ageNum < 120;
};

// Validate GitHub username (not full URL, just username)
const validateGithubUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// Validate LinkedIn username (not full URL, just username)
const validateLinkedinUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// Validate DevFolio username (frontend sends username only, not full URL)
const validateDevfolioUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

// Helper function to create custom colleges
const createCustomColleges = async (collegeNames: string[]) => {
  const createdColleges = [];

  for (const collegeName of collegeNames) {
    try {
      // Check if college already exists
      const existingCollege = await College.findOne({
        name: { $regex: `^${collegeName.trim()}$`, $options: "i" },
      });

      if (!existingCollege) {
        // Create new college
        const newCollege = await College.create({
          name: collegeName.trim(),
        });
        createdColleges.push({
          id: newCollege._id.toString(),
          name: newCollege.name,
        });
        console.log(`Created custom college: ${collegeName}`);
      }
    } catch (error) {
      console.error(`Error creating college ${collegeName}:`, error);
      // Continue with other colleges even if one fails
    }
  }

  return createdColleges;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { step } = data;

    const errors: { [key: string]: string } = {};
    let isValid = true;

    switch (step) {
      case 0: // Team Info Step
        const { teamName, teamSize } = data;

        if (!teamName?.trim()) {
          errors.teamName = "Team name is required";
          isValid = false;
        }

        if (!teamSize || teamSize < 1 || teamSize > 4) {
          errors.teamSize = "Team size must be between 1 and 4";
          isValid = false;
        }

        break;

      case 1: // Participant Details Step
        let participants;
        try {
          participants = JSON.parse(data.participants || "[]");
        } catch {
          errors.participants = "Invalid participants data format";
          isValid = false;
          break;
        }

        if (!Array.isArray(participants) || participants.length === 0) {
          errors.participants = "At least one participant is required";
          isValid = false;
          break;
        }

        // Connect to database for college operations
        await connectDB();

        // Get all existing colleges to check for custom ones
        const existingColleges = await College.find({}).select("name").lean();
        const existingCollegeNames = existingColleges.map((college) =>
          college.name.toLowerCase()
        );

        // Collect custom college names from students
        const customCollegeNames: string[] = [];

        participants.forEach((participant: Participant, index: number) => {
          if (!participant.name?.trim()) {
            errors[`participant_${index}_name`] = "Name is required";
            isValid = false;
          }

          if (!participant.email?.trim()) {
            errors[`participant_${index}_email`] = "Email is required";
            isValid = false;
          } else if (!validateEmail(participant.email)) {
            errors[`participant_${index}_email`] = "Invalid email format";
            isValid = false;
          }

          if (!participant.age?.trim()) {
            errors[`participant_${index}_age`] = "Age is required";
            isValid = false;
          } else if (!validateAge(participant.age)) {
            errors[`participant_${index}_age`] =
              "Age must be between 1 and 120";
            isValid = false;
          }

          if (!participant.phone?.trim()) {
            errors[`participant_${index}_phone`] = "Phone number is required";
            isValid = false;
          } else if (!validatePhone(participant.phone)) {
            errors[`participant_${index}_phone`] =
              "Phone number must be 10 digits";
            isValid = false;
          }

          if (!participant.studentOrProfessional) {
            errors[`participant_${index}_type`] =
              "Please select student or professional";
            isValid = false;
          }

          if (!participant.collegeOrCompanyName?.trim()) {
            errors[`participant_${index}_institution`] =
              "College/Company name is required";
            isValid = false;
          } else if (participant.studentOrProfessional === "student") {
            // Check if this is a custom college (only for students)
            const collegeName = participant.collegeOrCompanyName.trim();
            const isCustomCollege = !existingCollegeNames.includes(
              collegeName.toLowerCase()
            );

            if (isCustomCollege && !customCollegeNames.includes(collegeName)) {
              customCollegeNames.push(collegeName);
            }
          }
        });

        // Create custom colleges if any were found
        if (customCollegeNames.length > 0) {
          console.log(
            `Creating ${customCollegeNames.length} custom colleges:`,
            customCollegeNames
          );
          await createCustomColleges(customCollegeNames);
        }

        break;

      case 2: // Professional Profiles Step
        let profileParticipants;
        try {
          profileParticipants = JSON.parse(data.participants || "[]");
        } catch {
          errors.participants = "Invalid participants data format";
          isValid = false;
          break;
        }

        profileParticipants.forEach(
          (participant: Participant, index: number) => {
            // GitHub username validation (optional) - frontend sends username only
            if (
              participant.githubLink &&
              !validateGithubUsername(participant.githubLink)
            ) {
              errors[`participant_${index}_github`] =
                "Invalid GitHub username format";
              isValid = false;
            }

            // LinkedIn username validation (optional) - frontend sends username only
            if (
              participant.linkedinLink &&
              !validateLinkedinUsername(participant.linkedinLink)
            ) {
              errors[`participant_${index}_linkedin`] =
                "Invalid LinkedIn username format";
              isValid = false;
            }

            // Devfolio username validation (optional) - frontend sends username only
            if (
              participant.devfolioLink &&
              !validateDevfolioUsername(participant.devfolioLink)
            ) {
              errors[`participant_${index}_devfolio`] =
                "Invalid Devfolio username format";
              isValid = false;
            }
          }
        );

        break;

      case 3: // Ideas & Verification Step
        const { ideaTitle } = data;

        if (!ideaTitle?.trim()) {
          errors.ideaTitle = "Idea title is required";
          isValid = false;
        }

        break;

      default:
        errors.step = "Invalid step";
        isValid = false;
    }

    return NextResponse.json({
      valid: isValid,
      errors: errors,
      message: isValid ? "Validation successful" : "Validation failed",
    });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      {
        valid: false,
        errors: { server: "Server validation error" },
        message: "Server error during validation",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
