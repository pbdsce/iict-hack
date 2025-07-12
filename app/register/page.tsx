import { BackgroundDecorations } from "@/components/ui/background-decorations";
import { SectionDecorations } from "@/components/ui/section-decorations";
import RegistrationForm from "@/components/register/RegistrationForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      {/* Background decorations */}
      <BackgroundDecorations />
      <SectionDecorations variant="hero" />
      
      {/* Navigation */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-all duration-300 py-2 px-3 sm:py-3 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 hover:border-[#C540AB]/50 hover:shadow-lg hover:shadow-[#C540AB]/20"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#C540AB] to-[#E055C3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <span className="font-medium text-sm sm:text-base">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-2 sm:px-4">
        <RegistrationForm />
      </div>
    </div>
  );
}
