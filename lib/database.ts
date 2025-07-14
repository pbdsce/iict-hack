import mongoose from "mongoose";

// Database connection status
const STATES = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let isConnecting = false;

// Database connection with improved guard mechanism
export const connectDB = async () => {
  // Check if already connected
  if (mongoose.connections[0].readyState === STATES.connected) {
    return;
  }

  // Check if currently connecting to avoid multiple connection attempts
  if (
    isConnecting ||
    mongoose.connections[0].readyState === STATES.connecting
  ) {
    // Wait for the current connection attempt to complete
    while (mongoose.connections[0].readyState === STATES.connecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return;
  }

  try {
    isConnecting = true;
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/iict-hack"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
};

// Utility function to sanitize regex input and prevent ReDoS attacks
export const sanitizeRegexInput = (input: string): string => {
  return input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
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
