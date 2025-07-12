"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRegistrationStore } from "@/lib/registrationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParticipantDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ParticipantDetailsStep({ onNext, onBack }: ParticipantDetailsStepProps) {
  const {
    participants,
    teamSize,
    participantErrors,
    colleges,
    collegeSearchInput,
    dropdownVisible,
    updateParticipant,
    setCollegeSearchInput,
    setIsCustomCollege,
    setDropdownVisible,
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

  // Main next button handler - either go to next participant or next step
  const handleMainNext = () => {
    if (currentIndex < participants.length - 1) {
      // Not on last participant, go to next participant
      setCurrentIndex(currentIndex + 1);
    } else {
      // On last participant, go to next step
      onNext();
    }
  };

  // Check if we're on the last participant
  const isLastParticipant = currentIndex === participants.length - 1;

  const handleCollegeSelection = (collegeName: string) => {
    handleParticipantChange('collegeOrCompanyName', collegeName);
    setCollegeSearchInput(collegeName);
    setDropdownVisible(false);
    setIsCustomCollege(false);
  };

  const handleCollegeInputChange = (value: string) => {
    handleParticipantChange('collegeOrCompanyName', value);
    setCollegeSearchInput(value);
    setDropdownVisible(true);
    
    // Check if it's a custom college
    const isCustom = !colleges.some(college => 
      college.name.toLowerCase() === value.toLowerCase()
    );
    setIsCustomCollege(isCustom);
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(collegeSearchInput.toLowerCase())
  );

  const getParticipantError = (field: string) => {
    return participantErrors[`participant-${currentIndex}-${field}`] || false;
  };

  return (
    <div className="space-y-8">
      {/* Participant Navigation */}
      <div className="space-y-4">
        {/* Title and numbered navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Participant {currentIndex + 1} of {teamSize}
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
        
        {/* Previous/Next buttons */}
        <div className="flex items-center justify-center space-x-3 sm:hidden">
          <Button
            type="button"
            onClick={handlePrevParticipant}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 text-xs px-3 py-2"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleNextParticipant}
            disabled={currentIndex === participants.length - 1}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 text-xs px-3 py-2"
          >
            Next
          </Button>
        </div>

        {/* Desktop Previous/Next buttons */}
        <div className="hidden sm:flex items-center justify-end space-x-2">
          <Button
            type="button"
            onClick={handlePrevParticipant}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleNextParticipant}
            disabled={currentIndex === participants.length - 1}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Participant Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor={`name-${currentIndex}`} className="text-base sm:text-lg font-medium text-white">
              Full Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id={`name-${currentIndex}`}
              type="text"
              value={currentParticipant.name || ''}
              onChange={(e) => handleParticipantChange('name', e.target.value)}
              placeholder="Enter full name"
              className={`text-base sm:text-lg h-10 sm:h-12 ${
                getParticipantError('name')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-[#C540AB]'
              }`}
            />
            {getParticipantError('name') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Full name is required</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor={`email-${currentIndex}`} className="text-base sm:text-lg font-medium text-white">
              Email Address <span className="text-red-400">*</span>
            </Label>
            <Input
              id={`email-${currentIndex}`}
              type="email"
              value={currentParticipant.email || ''}
              onChange={(e) => handleParticipantChange('email', e.target.value)}
              placeholder="Enter email address"
              className={`text-base sm:text-lg h-10 sm:h-12 ${
                getParticipantError('email')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-[#C540AB]'
              }`}
            />
            {getParticipantError('email') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid email address</p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor={`age-${currentIndex}`} className="text-base sm:text-lg font-medium text-white">
              Age <span className="text-red-400">*</span>
            </Label>
            <Input
              id={`age-${currentIndex}`}
              type="number"
              min="1"
              max="120"
              value={currentParticipant.age || ''}
              onChange={(e) => handleParticipantChange('age', e.target.value)}
              placeholder="Enter age"
              className={`text-base sm:text-lg h-10 sm:h-12 ${
                getParticipantError('age')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-[#C540AB]'
              }`}
            />
            {getParticipantError('age') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid age (1-120)</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor={`phone-${currentIndex}`} className="text-base sm:text-lg font-medium text-white">
              Phone Number <span className="text-red-400">*</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={currentParticipant.stdCode || '+91'}
                onChange={(e) => handleParticipantChange('stdCode', e.target.value)}
                placeholder="+91"
                className="w-16 sm:w-20 text-base sm:text-lg h-10 sm:h-12 border-white/20 focus:border-[#C540AB]"
              />
              <Input
                id={`phone-${currentIndex}`}
                type="tel"
                value={currentParticipant.phone || ''}
                onChange={(e) => handleParticipantChange('phone', e.target.value)}
                placeholder="Phone number"
                className={`flex-1 text-base sm:text-lg h-10 sm:h-12 ${
                  getParticipantError('phone')
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#C540AB]'
                }`}
              />
            </div>
            {getParticipantError('phone') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please enter a valid 10-digit phone number</p>
            )}
          </div>

          {/* Student or Professional */}
          <div className="space-y-2 lg:col-span-2">
            <Label className="text-base sm:text-lg font-medium text-white">
              Are you a student or professional? <span className="text-red-400">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                type="button"
                variant={currentParticipant.studentOrProfessional === 'student' ? 'default' : 'outline'}
                onClick={() => handleParticipantChange('studentOrProfessional', 'student')}
                className={`flex-1 h-10 sm:h-12 text-sm sm:text-base ${
                  currentParticipant.studentOrProfessional === 'student'
                    ? 'bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white border-0'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={currentParticipant.studentOrProfessional === 'professional' ? 'default' : 'outline'}
                onClick={() => handleParticipantChange('studentOrProfessional', 'professional')}
                className={`flex-1 h-10 sm:h-12 text-sm sm:text-base ${
                  currentParticipant.studentOrProfessional === 'professional'
                    ? 'bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white border-0'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Professional
              </Button>
            </div>
            {getParticipantError('studentOrProfessional') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">Please select student or professional</p>
            )}
          </div>

          {/* College/Company */}
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor={`college-${currentIndex}`} className="text-base sm:text-lg font-medium text-white">
              {currentParticipant.studentOrProfessional === 'professional' ? 'Company Name' : 'College/University'} <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <Input
                id={`college-${currentIndex}`}
                type="text"
                value={currentParticipant.collegeOrCompanyName || ''}
                onChange={(e) => handleCollegeInputChange(e.target.value)}
                onFocus={() => setDropdownVisible(true)}
                placeholder={currentParticipant.studentOrProfessional === 'professional' ? 'Enter company name' : 'Search college/university'}
                className={`text-base sm:text-lg h-10 sm:h-12 ${
                  getParticipantError('collegeOrCompanyName')
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#C540AB]'
                }`}
              />
              
              {/* Dropdown for colleges */}
              {dropdownVisible && currentParticipant.studentOrProfessional === 'student' && filteredColleges.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg max-h-40 sm:max-h-48 overflow-y-auto z-10">
                  {filteredColleges.slice(0, 10).map((college) => (
                    <button
                      key={college.id}
                      type="button"
                      onClick={() => handleCollegeSelection(college.name)}
                      className="w-full px-3 sm:px-4 py-2 text-left text-sm sm:text-base text-white hover:bg-white/10 border-b border-white/10 last:border-b-0"
                    >
                      {college.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {getParticipantError('collegeOrCompanyName') && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {currentParticipant.studentOrProfessional === 'professional' ? 'Company name is required' : 'College/University is required'}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 pt-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-white/20 text-white hover:bg-white/10"
        >
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back: Team Info</span>
        </Button>
        <Button
          type="button"
          onClick={handleMainNext}
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#C540AB] to-[#E055C3] text-white font-medium rounded-xl hover:from-[#B535A1] hover:to-[#D04BB8] transition-all duration-200"
        >
          <span className="sm:hidden">
            {isLastParticipant ? 'Next Step' : `Participant ${currentIndex + 2}`}
          </span>
          <span className="hidden sm:inline">
            {isLastParticipant ? 'Next: Professional Profiles' : `Next: Participant ${currentIndex + 2}`}
          </span>
        </Button>
      </div>
    </div>
  );
} 