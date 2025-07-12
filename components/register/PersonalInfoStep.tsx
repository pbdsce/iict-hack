"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Phone, GraduationCap, Building } from "lucide-react";
import { useRegistrationStore } from "@/lib/registrationStore";

// Add CSS for shake animation
const shakeAnimation = {
  x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
  transition: { duration: 0.5 }
};

// Country codes for phone numbers
const countryCodes = [
  { value: '+91', label: '+91 (IN)' },
  { value: '+1', label: '+1 (US/CA)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+971', label: '+971 (UAE)' },
  { value: '+61', label: '+61 (AU)' },
];

interface PersonalInfoStepProps {
  onNext: () => void;
}

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  // Get state and actions from the store
  const {
    name,
    setName,
    email,
    setEmail,
    age,
    setAge,
    stdCode,
    setStdCode,
    phone,
    setPhone,
    studentOrProfessional,
    setStudentOrProfessional,
    collegeOrCompanyName,
    setCollegeOrCompanyName,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    ageError,
    setAgeError,
    phoneError,
    setPhoneError,
    studentOrProfessionalError,
    setStudentOrProfessionalError,
    collegeOrCompanyNameError,
    setCollegeOrCompanyNameError,
    serverErrors,
    setServerErrors,
    isValidating,
  } = useRegistrationStore();

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-[#C540AB]" />
            Full Name <span className="text-red-400">*</span>
          </Label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='relative'
            animate={nameError ? shakeAnimation : undefined}
          >
            <Input 
              id="name" 
              type="text" 
              placeholder="Your full name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
                if (serverErrors.name) {
                  const newErrors = {...serverErrors};
                  delete newErrors.name;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${nameError ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
          </motion.div>
          {nameError && <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter your full name</p>}
        </div>
        
        {/* Email */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C540AB]" />
            Email Address <span className="text-red-400">*</span>
          </Label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='relative'
            animate={emailError ? shakeAnimation : undefined}
          >
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@domain.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
                if (serverErrors.email) {
                  const newErrors = {...serverErrors};
                  delete newErrors.email;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
          </motion.div>
          {serverErrors.email && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.email}</p>}
          {emailError && !serverErrors.email && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid email address</p>
          )}
        </div>

        {/* Age and Phone in a grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Age */}
          <div className="space-y-3">
            <Label htmlFor="age" className="text-base sm:text-lg font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C540AB]" />
              Age <span className="text-red-400">*</span>
            </Label>
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className='relative'
              animate={ageError ? shakeAnimation : undefined}
            >
              <Input 
                id="age" 
                type="number"
                placeholder="Your age"
                value={age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const input = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setAge(input);
                  if (ageError) {
                    setAgeError(false);
                  }
                }}
                min="1"
                max="120"
                className={`h-10 sm:h-12 text-sm sm:text-lg ${ageError ? 'border-red-500 focus:border-red-500' : ''}`}
                required
              />
            </motion.div>
            {ageError && (
              <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid age</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-base sm:text-lg font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C540AB]" />
              Phone Number <span className="text-red-400">*</span>
            </Label>
            <div className="flex gap-3">
              {/* Country Code */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative flex-shrink-0 w-24 sm:w-32">
                <select 
                  id="stdCode"
                  value={stdCode}
                  onChange={(e) => setStdCode(e.target.value)}
                  className="w-full h-10 sm:h-12 px-2 sm:px-4 text-sm sm:text-base bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl appearance-none text-white focus:border-[#C540AB] focus:ring-2 focus:ring-[#C540AB]/20 focus:outline-none transition-all duration-200 cursor-pointer"
                  required
                >
                  {countryCodes.map((code) => (
                    <option 
                      key={code.value} 
                      value={code.value}
                      className="bg-gray-900 text-white"
                    >
                      {code.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </motion.div>
              
              {/* Phone Number */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='relative flex-1'
                animate={phoneError ? shakeAnimation : undefined}
              >
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone.replace(/(\d{5})(?=\d)/g, '$1 ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const input = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(input);
                    if (phoneError) setPhoneError(false);
                    if (serverErrors.phone) {
                      const newErrors = {...serverErrors};
                      delete newErrors.phone;
                      setServerErrors(newErrors);
                    }
                  }}
                  className={`h-10 sm:h-12 text-sm sm:text-lg tracking-wider pr-8 sm:pr-12 ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                  maxLength={12}
                />
                <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
              </motion.div>
            </div>
            {phoneError && (
              <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter a valid 10-digit phone number</p>
            )}
            {serverErrors.phone && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.phone}</p>}
          </div>
        </div>

        {/* Student or Professional */}
        <div className="space-y-3">
          <Label htmlFor="studentOrProfessional" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#C540AB]" />
            I am a <span className="text-red-400">*</span>
          </Label>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className='relative'
            animate={studentOrProfessionalError ? shakeAnimation : undefined}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  studentOrProfessional === 'student'
                    ? 'border-[#C540AB] bg-[#C540AB]/10 text-white'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:border-[#C540AB]/50'
                } ${studentOrProfessionalError ? 'border-red-500' : ''}`}
              >
                <input
                  type="radio"
                  name="studentOrProfessional"
                  value="student"
                  checked={studentOrProfessional === 'student'}
                  onChange={(e) => {
                    setStudentOrProfessional(e.target.value);
                    if (studentOrProfessionalError) setStudentOrProfessionalError(false);
                  }}
                  className="sr-only"
                />
                <span className="font-medium">Student</span>
              </motion.label>
              
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  studentOrProfessional === 'professional'
                    ? 'border-[#C540AB] bg-[#C540AB]/10 text-white'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:border-[#C540AB]/50'
                } ${studentOrProfessionalError ? 'border-red-500' : ''}`}
              >
                <input
                  type="radio"
                  name="studentOrProfessional"
                  value="professional"
                  checked={studentOrProfessional === 'professional'}
                  onChange={(e) => {
                    setStudentOrProfessional(e.target.value);
                    if (studentOrProfessionalError) setStudentOrProfessionalError(false);
                  }}
                  className="sr-only"
                />
                <span className="font-medium">Professional</span>
              </motion.label>
            </div>
          </motion.div>
          {studentOrProfessionalError && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please select whether you are a student or professional</p>
          )}
        </div>

        {/* College or Company Name */}
        <div className="space-y-3">
          <Label htmlFor="collegeOrCompanyName" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Building className="w-4 h-4 text-[#C540AB]" />
            {studentOrProfessional === 'student' ? 'College/University Name' : studentOrProfessional === 'professional' ? 'Company Name' : 'College/Company Name'} <span className="text-red-400">*</span>
          </Label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='relative'
            animate={collegeOrCompanyNameError ? shakeAnimation : undefined}
          >
            <Input 
              id="collegeOrCompanyName" 
              type="text" 
              placeholder={
                studentOrProfessional === 'student' 
                  ? "Enter your college or university name" 
                  : studentOrProfessional === 'professional'
                  ? "Enter your company name"
                  : "Enter your college or company name"
              }
              value={collegeOrCompanyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCollegeOrCompanyName(e.target.value);
                if (collegeOrCompanyNameError) setCollegeOrCompanyNameError(false);
                if (serverErrors.collegeOrCompanyName) {
                  const newErrors = {...serverErrors};
                  delete newErrors.collegeOrCompanyName;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${collegeOrCompanyNameError ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
          </motion.div>
          {collegeOrCompanyNameError && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">
              Please enter your {studentOrProfessional === 'student' ? 'college/university' : studentOrProfessional === 'professional' ? 'company' : 'college/company'} name
            </p>
          )}
          {serverErrors.collegeOrCompanyName && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.collegeOrCompanyName}</p>}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-end pt-6">
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