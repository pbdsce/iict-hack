"use client"

import { useState, useEffect, memo } from "react";

const timelineEvents = [
  {
    date: "15th August • 9:00 AM",
    title: "Registrations Open",
    description: "Hackathon registrations go live.",
  },
  {
    date: "29th August • 5:00 PM",
    title: "Registrations Close",
    description: "Last date and time to submit registrations.",
  },
  {
    date: "31st August • 5:00 PM",
    title: "Shortlist Announced",
    description: "Teams shortlisted for online rounds announced.",
  },
  {
    date: "1st September • 9:00 AM",
    title: "Online Round Begins",
    description: "Kicks off the remote hackathon round.",
  },
  {
    date: "13th–14th September",
    title: "Online Judging",
    description: "Judging for online round; top 6 teams finalized.",
  },
  {
    date: "28th September",
    title: "Finale at IICT Workshop",
    description: "Finalist teams present at the IICT Workshop.",
  },
];
// Professional title component with updated accent color
const ProfessionalTitle = memo(() => {
  return (
    <div className="relative mb-12 md:mb-20">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">Event Timeline</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
      </div>
    </div>
  );
});
ProfessionalTitle.displayName = "ProfessionalTitle";

// MobileTimeline with "glass effect" cards
const MobileTimeline = memo(() => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C83DAD] via-[#DE5FB9] to-[#F481C9]"></div>
      <div className="space-y-8">
        {timelineEvents.map((event) => (
          <div
            key={event.title}
            className="flex items-start gap-6 ml-10 relative" // Added relative positioning
          >
            <div className="absolute left-[-2.45rem] z-10 flex-shrink-0"> {/* Adjusted positioning to align with line */}
              <div className="w-6 h-6 bg-black border-4 border-[#C83DAD] rounded-full shadow-lg shadow-[#C83DAD]/30"></div>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:shadow-xl hover:shadow-[#C83DAD]/30 hover:border-[#C83DAD] transition-all duration-300 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-sm font-medium text-[#C83DAD] mb-3">{event.date}</p>
              <p className="text-white/90 leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
MobileTimeline.displayName = "MobileTimeline";

// DesktopTimeline with "glass effect" cards
const DesktopTimeline = memo(() => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] transform -translate-x-1/2"></div>
      <div className="space-y-4"> {/* Reduced space for tighter look */}
        {timelineEvents.map((event, index) => (
          <div
            key={event.title}
            className={`flex items-center relative ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className="w-1/2 px-8">
              <div className={`bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:shadow-xl hover:shadow-[#C83DAD]/30 hover:border-[#C83DAD] transition-all duration-300 p-6 ${ index % 2 === 0 ? "text-right" : "text-left" }`}>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{event.title}</h3>
                <p className="text-sm md:text-base font-medium text-[#C83DAD] mb-3">{event.date}</p>
                <p className="text-white/90 leading-relaxed">{event.description}</p>
              </div>
            </div>
            <div className="absolute left-1/2 z-10 flex-shrink-0 -translate-x-1/2">
              <div className="w-6 h-6 bg-black border-4 border-[#C83DAD] rounded-full shadow-lg shadow-[#C83DAD]/30 hover:border-[#F481C9] transition-colors duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
DesktopTimeline.displayName = "DesktopTimeline";

export function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-20 bg-black" id="timeline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfessionalTitle />
        {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
      </div>
    </section>
  );
}