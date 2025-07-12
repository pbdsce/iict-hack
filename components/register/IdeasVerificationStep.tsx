"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Upload, FileText, CheckCircle, X, Shield, Code } from "lucide-react";
import { useRegistrationStore } from "@/lib/registrationStore";
import { useRef, useState } from "react";

// Add CSS for shake animation
const shakeAnimation = {
  x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
  transition: { duration: 0.5 }
};

// Programming language questions for captcha
const programmingQuestions = [
  { language: "Python", type: "interpreted", isCorrect: true },
  { language: "C++", type: "compiled", isCorrect: true },
  { language: "JavaScript", type: "interpreted", isCorrect: true },
  { language: "Java", type: "compiled", isCorrect: true },
  { language: "Ruby", type: "interpreted", isCorrect: true },
  { language: "C", type: "compiled", isCorrect: true },
  { language: "PHP", type: "interpreted", isCorrect: true },
  { language: "Go", type: "compiled", isCorrect: true },
  { language: "TypeScript", type: "compiled", isCorrect: true },
  { language: "Rust", type: "compiled", isCorrect: true },
];

interface IdeasVerificationStepProps {
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function IdeasVerificationStep({ onSubmit, onBack }: IdeasVerificationStepProps) {
  // Get state and actions from the store
  const {
    ideaTitle,
    setIdeaTitle,
    document,
    setDocument,
    documentFileName,
    setDocumentFileName,
    ideaTitleError,
    setIdeaTitleError,
    documentError,
    setDocumentError,
    serverErrors,
    setServerErrors,
    isSubmitting,
    setError,
  } = useRegistrationStore();

  // Local state for file upload and captcha
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [captchaQuestions, setCaptchaQuestions] = useState<typeof programmingQuestions>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Initialize captcha questions
  const initializeCaptcha = () => {
    // Select 3 random questions
    const shuffled = [...programmingQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setCaptchaQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowCaptchaModal(true);
  };

  // Handle captcha answer
  const handleCaptchaAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < captchaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Check if all answers are correct
      const allCorrect = captchaQuestions.every((q, index) => {
        return newAnswers[index] === q.type;
      });

      if (allCorrect) {
        setCaptchaCompleted(true);
        setShowCaptchaModal(false);
      } else {
        // Show feedback and reset
        setShowFeedback(true);
        setFeedbackMessage("Some answers were incorrect. Please try again!");
        setIsAnswerCorrect(false);
        setTimeout(() => {
          setShowFeedback(false);
          setCurrentQuestion(0);
          setSelectedAnswers([]);
        }, 2000);
      }
    }
  };

  // File upload handlers
  const handleFileSelect = (file: File) => {
    setIsUploading(true);
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setError("Please upload a PDF file for your idea document");
      setIsUploading(false);
      return;
    }
    
    // Check file size (limit to 500KB)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 0.5) {
      setError("File size must be less than 500KB");
      setIsUploading(false);
      return;
    }
    
    // Simulate upload delay
    setTimeout(() => {
      setDocument(file);
      setDocumentFileName(file.name);
      setError("");
      setIsUploading(false);
      if (documentError) setDocumentError(false);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveFile = () => {
    setDocument(null);
    setDocumentFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Idea Title */}
        <div className="space-y-3">
          <Label htmlFor="ideaTitle" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#C540AB]" />
            Idea Title <span className="text-red-400">*</span>
          </Label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='relative'
            animate={ideaTitleError ? shakeAnimation : undefined}
          >
            <Input 
              id="ideaTitle" 
              type="text" 
              placeholder="Enter your innovative idea title"
              value={ideaTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIdeaTitle(e.target.value);
                if (ideaTitleError) setIdeaTitleError(false);
                if (serverErrors.ideaTitle) {
                  const newErrors = {...serverErrors};
                  delete newErrors.ideaTitle;
                  setServerErrors(newErrors);
                }
              }}
              className={`h-10 sm:h-12 text-sm sm:text-lg ${ideaTitleError ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
          </motion.div>
          {ideaTitleError && <p className="text-xs sm:text-sm text-red-400 mt-1">Please enter your idea title</p>}
          {serverErrors.ideaTitle && <p className="text-xs sm:text-sm text-red-400 mt-1">{serverErrors.ideaTitle}</p>}
        </div>

        {/* Document Upload Section */}
        <div className="space-y-3">
          <Label htmlFor="documentUpload" className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#C540AB]" />
            Idea Document <span className="text-red-400">*</span>
          </Label>
          
          {/* Modern Upload Component */}
          <motion.div
            className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
              isDragOver 
                ? 'border-[#C540AB] bg-[#C540AB]/10 scale-105' 
                : documentError 
                ? 'border-red-500 bg-red-500/5' 
                : document 
                ? 'border-green-500 bg-green-500/5'
                : 'border-white/30 bg-white/5 hover:border-[#C540AB]/60 hover:bg-white/10'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            whileHover={{ scale: document ? 1 : 1.02 }}
            animate={documentError ? shakeAnimation : undefined}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="documentUpload"
            />
            
            {!document ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C540AB] to-[#E055C3] rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Your Idea Document</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Share your innovative project concept or startup idea
                    </p>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-6 py-2"
                    >
                      {isUploading ? "Uploading..." : "Choose PDF File"}
                    </Button>
                    <p className="text-xs text-gray-500 mt-3">
                      PDF only • Max 500KB • Drag and drop supported
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">File uploaded successfully</span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{documentFileName}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="flex-shrink-0 w-8 h-8 bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500/50 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
          
          {documentError && (
            <p className="text-xs sm:text-sm text-red-400 mt-1">Please upload a valid PDF file</p>
          )}
        </div>

        {/* Programmer Verification */}
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-medium flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C540AB]" />
            Verification <span className="text-red-400">*</span>
          </Label>
          
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  captchaCompleted 
                    ? 'border-[#C540AB] bg-[#C540AB]' 
                    : 'border-white/30 hover:border-[#C540AB]/50'
                }`}
                onClick={captchaCompleted ? undefined : initializeCaptcha}
                >
                  {captchaCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-white font-medium">
                  Are you a real programmer?
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Code className="w-4 h-4" />
                <span className="text-xs">reCAPTCHA</span>
              </div>
            </div>
            
            {captchaCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-green-400"
              >
                ✓ Verification completed successfully!
              </motion.div>
            )}
          </motion.div>
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
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting || !captchaCompleted}
          className="px-8 py-3 bg-gradient-to-r from-[#C540AB] to-[#E055C3] hover:from-[#E055C3] hover:to-[#F570DB] text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </Button>
      </div>

      {/* Captcha Modal */}
      <AnimatePresence>
        {showCaptchaModal && captchaQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowCaptchaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C540AB] to-[#E055C3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Programmer Verification
                </h3>
                <p className="text-gray-400 text-sm">
                  Question {currentQuestion + 1} of {captchaQuestions.length}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">
                  Is <span className="text-[#C540AB] font-mono">{captchaQuestions[currentQuestion]?.language}</span> compiled or interpreted?
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleCaptchaAnswer('compiled')}
                    className="h-12 bg-white/10 hover:bg-[#C540AB]/20 border border-white/20 hover:border-[#C540AB] text-white"
                  >
                    Compiled
                  </Button>
                  <Button
                    onClick={() => handleCaptchaAnswer('interpreted')}
                    className="h-12 bg-white/10 hover:bg-[#C540AB]/20 border border-white/20 hover:border-[#C540AB] text-white"
                  >
                    Interpreted
                  </Button>
                </div>
                
                {/* Feedback UI */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 p-3 rounded-lg border ${
                        isAnswerCorrect 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isAnswerCorrect ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">{feedbackMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                onClick={() => setShowCaptchaModal(false)}
                variant="outline"
                className="w-full border-white/20 text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 