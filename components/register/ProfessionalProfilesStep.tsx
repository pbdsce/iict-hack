"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Github, Linkedin, Palette, User } from "lucide-react";
import { useRegistrationStore } from "@/lib/registrationStore";

// Add CSS for shake animation
const shakeAnimation = {
  x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
  transition: { duration: 0.5 }
};

interface ProfessionalProfilesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ProfessionalProfilesStep({ onNext, onBack }: ProfessionalProfilesStepProps) {
  // Get state and actions from the store
  const {
    githubLink,
    setGithubLink,
    linkedinLink,
    setLinkedinLink,
    devfolioLink,
    setDevfolioLink,
    githubError,
    setGithubError,
    linkedinError,
    setLinkedinError,
    devfolioError,
    setDevfolioError,
    serverErrors,
    setServerErrors,
    isValidating,
    setError,
  } = useRegistrationStore();

  return (
    <div className="space-y-8">
      {/* Profile Fields */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C540AB] to-[#E055C3] flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-white">Professional Profiles</h4>
          <span className="text-sm text-gray-400">(Optional)</span>
        </div>

        {/* GitHub Username */}
        <div className="space-y-3">
          <Label htmlFor="githubLink" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Github className="w-4 h-4 text-[#C540AB]" />
            GitHub Username
          </Label>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className='relative'
            animate={githubError ? shakeAnimation : undefined}
          >
            <Input 
              id="githubLink" 
              type="text"
              placeholder="yourusername"
              value={githubLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setGithubLink(e.target.value);
                if (githubError) {
                  setGithubError(false);
                  setError("");
                }
                if (serverErrors.githubLink) {
                  const newErrors = {...serverErrors};
                  delete newErrors.githubLink;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${githubError ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </motion.div>
          {serverErrors.githubLink && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.githubLink}</p>}
          {githubError && !serverErrors.githubLink && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid GitHub username</p>
          )}
          <p className="text-xs sm:text-sm text-gray-500">We&apos;ll create the link: github.com/yourusername</p>
        </div>

        {/* LinkedIn Username */}
        <div className="space-y-3">
          <Label htmlFor="linkedinLink" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#C540AB]" />
            LinkedIn Username
          </Label>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className='relative'
            animate={linkedinError ? shakeAnimation : undefined}
          >
            <Input 
              id="linkedinLink" 
              type="text"
              placeholder="yourusername"
              value={linkedinLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLinkedinLink(e.target.value);
                if (linkedinError) {
                  setLinkedinError(false);
                  setError("");
                }
                if (serverErrors.linkedinLink) {
                  const newErrors = {...serverErrors};
                  delete newErrors.linkedinLink;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${linkedinError ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </motion.div>
          {serverErrors.linkedinLink && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.linkedinLink}</p>}
          {linkedinError && !serverErrors.linkedinLink && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid LinkedIn username</p>
          )}
          <p className="text-xs sm:text-sm text-gray-500">We&apos;ll create the link: linkedin.com/in/yourusername</p>
        </div>

        {/* Devfolio Profile */}
        <div className="space-y-3">
          <Label htmlFor="devfolioLink" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#C540AB]" />
            Devfolio Profile
          </Label>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className='relative'
            animate={devfolioError ? shakeAnimation : undefined}
          >
            <Input 
              id="devfolioLink" 
              type="text"
              placeholder="https://devfolio.co/@yourusername"
              value={devfolioLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDevfolioLink(e.target.value);
                if (devfolioError) {
                  setDevfolioError(false);
                  setError("");
                }
                if (serverErrors.devfolioLink) {
                  const newErrors = {...serverErrors};
                  delete newErrors.devfolioLink;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${devfolioError ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </motion.div>
          {serverErrors.devfolioLink && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.devfolioLink}</p>}
          {devfolioError && !serverErrors.devfolioLink && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid Devfolio profile URL</p>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-6 py-2 border-white/20 text-white hover:bg-white/10"
        >
          ← Back
        </Button>
        <Button 
          type="button"
          onClick={onNext}
          disabled={isValidating}
          className="px-8 py-3 bg-gradient-to-r from-[#C540AB] to-[#E055C3] hover:from-[#E055C3] hover:to-[#F570DB] text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? "Validating..." : "Continue"}
        </Button>
      </div>
    </div>
  );
} 