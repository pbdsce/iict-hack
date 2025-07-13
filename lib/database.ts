import mongoose from "mongoose";

// Database connection
export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/iict-hack"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// College Schema
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Team Registration Schema
const teamRegistrationSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    team_size: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    idea_title: {
      type: String,
      required: true,
      trim: true,
    },
    idea_document_url: {
      type: String,
      required: true,
    },
    participants: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        age: {
          type: Number,
          required: true,
          min: 1,
          max: 120,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        student_or_professional: {
          type: String,
          required: true,
          enum: ["student", "professional"],
        },
        college_or_company_name: {
          type: String,
          required: true,
          trim: true,
        },
        github_profile: {
          type: String,
          trim: true,
        },
        linkedin_profile: {
          type: String,
          trim: true,
        },
        devfolio_profile: {
          type: String,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      default: "registered",
      enum: ["registered", "approved", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

// Export models
export const College =
  mongoose.models.College || mongoose.model("College", collegeSchema);

export const TeamRegistration =
  mongoose.models.TeamRegistration ||
  mongoose.model("TeamRegistration", teamRegistrationSchema);
