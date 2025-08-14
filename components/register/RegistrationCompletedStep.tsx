"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegistrationCompletedStepProps {
  onStartOver?: () => void;
}

export default function RegistrationCompletedStep({
  onStartOver,
}: RegistrationCompletedStepProps) {
  // const handleDiscordJoin = () => {
  //   window.open("https://discord.gg/your-discord-invite", "_blank");
  // };

  // const handleCalendarAdd = () => {
  //   // Create calendar event
  //   const event = {
  //     title: "IICT Hackathon 2025",
  //     start: "2025-02-15T09:00:00",
  //     end: "2025-02-17T18:00:00",
  //     description: "IICT Hackathon - Innovation starts here!",
  //     location: "IICT Campus, Hyderabad",
  //   };

  //   const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  //     event.title
  //   )}&dates=${event.start
  //     .replace(/[-:]/g, "")
  //     .replace(/\.\d{3}/, "")}Z/${event.end
  //     .replace(/[-:]/g, "")
  //     .replace(/\.\d{3}/, "")}Z&details=${encodeURIComponent(
  //     event.description
  //   )}&location=${encodeURIComponent(event.location)}`;

  //   window.open(googleCalendarUrl, "_blank");
  // };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 sm:mb-6">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
        >
          Registration Completed!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0"
        >
          Welcome to IICT Hackathon 2025! Your team has been successfully
          registered.
        </motion.p>
      </motion.div>

      {/* Event Details Card */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#C540AB]" />
          Event Details
        </h3>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 text-gray-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C540AB] mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Date & Time
                </p>
                <p className="text-sm sm:text-base">February 15-17, 2025</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C540AB] mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Venue
                </p>
                <p className="text-sm sm:text-base">IICT Campus, Hyderabad</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Tarnaka, Hyderabad - 500007
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 text-gray-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#C540AB] mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Team Size
                </p>
                <p className="text-sm sm:text-base">1-4 members per team</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Individual participation allowed
                </p>
              </div>
            </div>

            <Button
              onClick={handleCalendarAdd}
              className="w-full bg-[#C540AB] hover:bg-[#A333A3] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      </motion.div> */}

      {/* Discord & Community
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Join Our Community</h3>
        
        <div className="bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865F2] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Discord Server</h4>
              <p className="text-gray-300 text-sm sm:text-base">Connect with fellow participants and organizers</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
            Join our Discord server to get real-time updates, connect with other participants, 
            find team members, and get support from our community.
          </p>
          
          <Button
            onClick={handleDiscordJoin}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Join Discord Server
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </motion.div> */}

      {/* Important Instructions
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Important Instructions</h3>
        
        <div className="space-y-3 sm:space-y-4 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#C540AB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm sm:text-base">Check Your Email</p>
              <p className="text-xs sm:text-sm">We&apos;ve sent you a confirmation email with your registration details and important updates. Please check your spam folder if you don&apos;t see it.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#C540AB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm sm:text-base">Prepare Your Development Environment</p>
              <p className="text-xs sm:text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#C540AB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm sm:text-base">Bring Required Documents</p>
              <p className="text-xs sm:text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#C540AB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm sm:text-base">Follow Code of Conduct</p>
              <p className="text-xs sm:text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Built by Point Blank */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-6 sm:py-8"
      >
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base">
          <span>Built by</span>
          <a
            href="https://www.pointblank.club/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#C540AB] hover:text-[#A333A3] transition-colors duration-200"
          >
            Point Blank
          </a>
          <span>with</span>
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
        </div>
      </motion.div>

      {/* Optional: Start Over Button */}
      {onStartOver && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center pb-4 sm:pb-6"
        >
          <Button
            onClick={onStartOver}
            variant="outline"
            className="border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all duration-200 py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl"
          >
            Register Another Team
          </Button>
        </motion.div>
      )}
    </div>
  );
}
