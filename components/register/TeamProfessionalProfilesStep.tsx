"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRegistrationStore } from "@/lib/registrationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamProfessionalProfilesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TeamProfessionalProfilesStep({ onNext, onBack }: TeamProfessionalProfilesStepProps) {
  const {
    participants,
    teamSize,
    participantErrors,
    updateParticipant,
    setParticipants,
  } = useRegistrationStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentParticipant = participants[currentIndex] || {};

  // Ensure participants array is properly initialized
  useEffect(() => {
    if (participants.length !== teamSize) {
      const newParticipants = [];
      for (let i = 0; i < teamSize; i++) {
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
    }
  }, [teamSize, participants.length, participants, setParticipants]);

  const handleParticipantChange = (field: string, value: string) => {
    updateParticipant(currentIndex, { [field]: value });
  };

  const handleNextParticipant = () => {
    if (currentIndex < participants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevParticipant = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getParticipantError = (field: string) => {
    return participantErrors[`participant-${currentIndex}-${field}`] || false;
  };

  return (
    <div className="space-y-8">
      {/* Participant Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
            Professional Profiles - {currentParticipant.name || `Participant ${currentIndex + 1}`}
          </h3>
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            {Array.from({ length: teamSize }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                  index === currentIndex
                    ? 'bg-[#C540AB] border-[#C540AB] text-white'
                    : 'border-white/30 text-white/70 hover:border-white/50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center lg:justify-end space-x-2">
          <Button
            type="button"
            onClick={handlePrevParticipant}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <Button
            type="button"
            onClick={handleNextParticipant}
            disabled={currentIndex === participants.length - 1}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Info Section */}
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
            <h4 className="text-blue-400 font-medium text-sm sm:text-base">Professional Profiles</h4>
            <p className="text-blue-300/80 text-xs sm:text-sm mt-1">
              Add professional profiles for each team member. These are optional but help showcase your team&apos;s skills and experience.
            </p>
          </div>
        </div>
      </div>

      {/* Professional Profiles Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* GitHub Profile */}
          <div className="space-y-2">
            <Label htmlFor={`github-${currentIndex}`} className="text-base sm:text-lg font-medium text-white flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>GitHub Username</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                github.com/
              </span>
              <Input
                id={`github-${currentIndex}`}
                type="text"
                value={currentParticipant.githubLink || ''}
                onChange={(e) => handleParticipantChange('githubLink', e.target.value)}
                placeholder="username"
                className={`text-base sm:text-lg h-10 sm:h-12 pl-[5.6rem] sm:pl-[6.4rem] ${
                  getParticipantError('github')
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#C540AB]'
                }`}
              />
            </div>
            {getParticipantError('github') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid GitHub username</p>
            )}
          </div>

          {/* LinkedIn Profile */}
          <div className="space-y-2">
            <Label htmlFor={`linkedin-${currentIndex}`} className="text-base sm:text-lg font-medium text-white flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <span>LinkedIn Username</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                linkedin.com/in/
              </span>
              <Input
                id={`linkedin-${currentIndex}`}
                type="text"
                value={currentParticipant.linkedinLink || ''}
                onChange={(e) => handleParticipantChange('linkedinLink', e.target.value)}
                placeholder="username"
                className={`text-base sm:text-lg h-10 sm:h-12 pl-[7.2rem] sm:pl-[8.2rem] ${
                  getParticipantError('linkedin')
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#C540AB]'
                }`}
              />
            </div>
            {getParticipantError('linkedin') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid LinkedIn username</p>
            )}
          </div>

          {/* DevFolio Profile */}
          <div className="space-y-2">
            <Label htmlFor={`devfolio-${currentIndex}`} className="text-base sm:text-lg font-medium text-white flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <span>DevFolio Username</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                devfolio.co/@
              </span>
              <Input
                id={`devfolio-${currentIndex}`}
                type="text"
                value={currentParticipant.devfolioLink || ''}
                onChange={(e) => handleParticipantChange('devfolioLink', e.target.value)}
                placeholder="username"
                className={`text-base sm:text-lg h-10 sm:h-12 pl-[6.5rem] sm:pl-[7.5rem] ${
                  getParticipantError('devfolio')
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#C540AB]'
                }`}
              />
            </div>
            {getParticipantError('devfolio') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid DevFolio username</p>
            )}
          </div>

          {/* Profile Preview */}
          {(currentParticipant.githubLink || currentParticipant.linkedinLink || currentParticipant.devfolioLink) && (
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 sm:p-4">
              <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Profile Preview</h4>
              <div className="space-y-2">
                {currentParticipant.githubLink && (
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    <span className="break-all">GitHub: github.com/{currentParticipant.githubLink}</span>
                  </div>
                )}
                {currentParticipant.linkedinLink && (
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    <span className="break-all">LinkedIn: linkedin.com/in/{currentParticipant.linkedinLink}</span>
                  </div>
                )}
                {currentParticipant.devfolioLink && (
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                    <span className="break-all">DevFolio: devfolio.co/@{currentParticipant.devfolioLink}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white font-medium rounded-xl hover:from-[#B535A1] hover:to-[#D04BB8] transition-all duration-200"
        >
          <span className="hidden sm:inline">Next: Team Idea</span>
          <span className="sm:hidden">Next</span>
        </Button>
      </div>
    </div>
  );
} 