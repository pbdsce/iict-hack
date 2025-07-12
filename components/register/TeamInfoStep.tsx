"use client";

import { motion } from "framer-motion";
import { useRegistrationStore } from "@/lib/registrationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamInfoStepProps {
  onNext: () => void;
}

export default function TeamInfoStep({ onNext }: TeamInfoStepProps) {
  const {
    teamName,
    teamSize,
    teamNameError,
    teamSizeError,
    setTeamName,
    setTeamSize,
    setParticipants,
    participants,
  } = useRegistrationStore();

  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size);
    
    // Update participants array based on team size
    const newParticipants = [];
    for (let i = 0; i < size; i++) {
      if (i < participants.length) {
        // Keep existing participant data
        newParticipants.push(participants[i]);
      } else {
        // Add new participant
        newParticipants.push({
          id: Date.now().toString() + i,
          name: '',
          email: '',
          age: '',
          stdCode: '+91',
          phone: '',
          studentOrProfessional: '',
          collegeOrCompanyName: '',
          githubLink: '',
          linkedinLink: '',
          devfolioLink: '',
        });
      }
    }
    setParticipants(newParticipants);
  };

  const handleNext = () => {
    if (teamName.trim() && teamSize >= 1 && teamSize <= 4) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Team Name Input */}
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-base sm:text-lg font-medium text-white">
              Team Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className={`text-base sm:text-lg h-10 sm:h-12 ${
                teamNameError 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-white/20 focus:border-[#C540AB]'
              }`}
            />
            {teamNameError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Team name is required</p>
            )}
          </div>

          {/* Team Size Selection */}
          <div className="space-y-2">
            <Label className="text-base sm:text-lg font-medium text-white">
              Team Size <span className="text-red-400">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={teamSize === size ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleTeamSizeChange(size)}
                  className={`h-10 sm:h-12 text-base sm:text-lg ${
                    teamSize === size
                      ? 'bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white border-0'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
            {teamSizeError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please select a team size</p>
            )}
          </div>

          {/* Team Size Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium text-sm sm:text-base">Team Information</h4>
                <p className="text-blue-300/80 text-xs sm:text-sm mt-1">
                  You&apos;ll need to provide details for all {teamSize} team member{teamSize > 1 ? 's' : ''} in the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-end pt-4 sm:pt-6">
        <Button
          type="button"
          onClick={handleNext}
          disabled={!teamName.trim() || teamSize < 1 || teamSize > 4}
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white font-medium rounded-xl hover:from-[#B535A1] hover:to-[#D04BB8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next: Add Team Members</span>
          <span className="sm:hidden">Next</span>
        </Button>
      </div>
    </div>
  );
} 