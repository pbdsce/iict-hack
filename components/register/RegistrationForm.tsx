"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegistrationStore } from "@/lib/registrationStore";
import TeamInfoStep from "./TeamInfoStep";
import ParticipantDetailsStep from "./ParticipantDetailsStep";
import TeamProfessionalProfilesStep from "./TeamProfessionalProfilesStep";
import IdeasVerificationStep from "./IdeasVerificationStep";
import RegistrationCompletedStep from "./RegistrationCompletedStep";

const steps = [
  { id: 0, title: "Team Info", description: "Team name and size" },
  {
    id: 1,
    title: "Participant Details",
    description: "Information for each team member",
  },
  {
    id: 2,
    title: "Professional Profiles",
    description: "Professional links and portfolios",
  },
  {
    id: 3,
    title: "Ideas & Verification",
    description: "Your team's idea and final verification",
  },
  {
    id: 4,
    title: "Registration Complete",
    description: "Welcome to IICT Hackathon 2024!",
  },
];

export default function RegistrationForm() {
  const router = useRouter();

  // Get state and actions from the store
  const {
    step,
    error,
    setColleges,
    setError,
    setIsSubmitting,
    validateStep1,
    validateStep2,
    validateStep3,
    validateStep4,
    nextStep,
    prevStep,
    resetForm,
    // Team data for submission
    teamName,
    teamSize,
    participants,
    ideaTitle,
    document,
  } = useRegistrationStore();

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/api/colleges");
        const data = await response.json();
        if (data.status === "success") {
          setColleges(data.colleges);
        } else {
          console.error("Failed to fetch colleges:", data.message);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, [setColleges]);

  // Handle next step with validation
  const handleNext = async () => {
    setError(""); // Clear any existing errors

    // Client-side validation based on current step
    let isClientValid = false;

    if (step === 0) {
      isClientValid = validateStep1();
    } else if (step === 1) {
      isClientValid = validateStep2();
    } else if (step === 2) {
      isClientValid = validateStep3();
    }

    if (!isClientValid) {
      return; // Stop if client validation fails
    }

    // Server-side validation
    try {
      setIsSubmitting(true);

      // Prepare data for server validation
      let validationData: Record<string, unknown> = { step };

      if (step === 0) {
        validationData = {
          step,
          teamName,
          teamSize,
        };
      } else if (step === 1) {
        validationData = {
          step,
          participants: JSON.stringify(participants),
        };
      } else if (step === 2) {
        validationData = {
          step,
          participants: JSON.stringify(participants),
        };
      } else if (step === 3) {
        validationData = {
          step,
          ideaTitle,
        };
      }

      const response = await fetch("/api/validateStep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Validation failed");
      }

      if (!result.valid) {
        // Handle server validation errors
        setError(
          (Object.values(result.errors)[0] as string) || "Validation failed"
        );
        return;
      }

      // If step 1 was validated (participant details), refresh colleges list
      // This ensures any newly created custom colleges are available
      if (step === 1) {
        try {
          const collegesResponse = await fetch("/api/colleges");
          const collegesData = await collegesResponse.json();
          if (collegesData.status === "success") {
            setColleges(collegesData.colleges);
          }
        } catch (error) {
          console.error("Error refreshing colleges:", error);
          // Don't block progression if college refresh fails
        }
      }

      // If validation passes, go to next step
      nextStep();
    } catch (error) {
      console.error("Validation error:", error);
      setError(error instanceof Error ? error.message : "Validation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back step
  const handleBack = () => prevStep();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate all steps
    const step1Valid = validateStep1();
    const step2Valid = validateStep2();
    const step3Valid = validateStep3();
    const step4Valid = validateStep4();

    if (!step1Valid || !step2Valid || !step3Valid || !step4Valid) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("team_name", teamName);
    formData.append("team_size", teamSize.toString());
    formData.append("participants", JSON.stringify(participants));
    formData.append("idea_title", ideaTitle);
    if (document) formData.append("idea_document", document);

    try {
      const response = await fetch("/api/teamRegistration", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Go to completion step on successful registration
      nextStep();
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during registration"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="relative">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight relative z-10"
            style={{
              fontFamily: 'Times New Roman, serif',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C540AB 0%, #E055C3 50%, #F570DB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            } as React.CSSProperties}
          >
            Team Registration
          </h1>
          {/* Fallback text with solid color in case gradient doesn't work */}
          <h1
            className="gradient-fallback absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight opacity-100 pointer-events-none"
            style={{
              fontFamily: 'Times New Roman, serif',
              fontStyle: 'italic',
              color: '#E055C3',
              textShadow: '0 0 20px rgba(224, 85, 195, 0.4)',
              zIndex: -1
            } as React.CSSProperties}
          >
            Team Registration
          </h1>
        </div>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 relative z-10"
          style={
            {
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              opacity: "0.9",
            } as React.CSSProperties
          }
        >
          Register your team for the hackathon. Create your team profile, add
          team members, and submit your innovative ideas.
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-0"
      >
        {/* Progress Bar - Attached to form */}
        <div className="mb-0">
          <div className="max-w-6xl mx-auto px-4">
            {/* Progress Bar Container */}
            <div className="relative h-2 bg-gray-800/50 rounded-t-3xl overflow-hidden backdrop-blur-sm border-t border-l border-r border-white/10">
              {/* Progress Fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-[#C540AB] to-[#E055C3] relative"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C540AB] to-[#E055C3] opacity-50 blur-sm" />
              </motion.div>

              {/* Progress indicator dot */}
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-[#C540AB]/30 border border-[#C540AB]"
                animate={{
                  left: `${((step + 1) / steps.length) * 100}%`,
                  x: "-50%",
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#C540AB] opacity-20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Progress Text - Inside form */}
            <div className="bg-black/40 backdrop-blur-xl border-l border-r border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-3">
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
                <span>
                  Step {step + 1} of {steps.length}
                </span>
                <span>
                  {Math.round(((step + 1) / steps.length) * 100)}% Complete
                </span>
              </div>
            </div>

            {/* Step Title and Description - Inside form */}
            <div className="bg-black/40 backdrop-blur-xl border-l border-r border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {steps[step].title}
                </h2>
                <p className="text-lg text-gray-400">
                  {steps[step].description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Main Form Card */}
          <div className="relative bg-black/40 backdrop-blur-xl border-l border-r border-b border-white/10 rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-300 text-center backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Content */}
{step < 4 ? (
  <form onSubmit={handleSubmit} onKeyDown={handleEnter} noValidate className="space-y-8">
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step 0: Team Info */}
        {step === 0 && <TeamInfoStep onNext={handleNext} />}

        {/* Step 1: Participant Details */}
        {step === 1 && (
          <ParticipantDetailsStep
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 2: Professional Profiles */}
        {step === 2 && (
          <TeamProfessionalProfilesStep
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 3: Ideas & Verification */}
        {step === 3 && (
          <IdeasVerificationStep
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
      </motion.div>
    </AnimatePresence>
  </form>
) : (
  <AnimatePresence mode="wait">
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <RegistrationCompletedStep
        onStartOver={() => {
          resetForm();
          router.push("/register");
        }}
      />
    </motion.div>
  </AnimatePresence>
)}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
