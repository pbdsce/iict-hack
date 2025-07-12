"use client"

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, memo } from "react";

const timelineEvents = [
  {
    date: "Day 1 - 8:00 AM",
    title: "Participant Check-in",
    description: "Participants check in and set up for the event.",
  },
  {
    date: "Day 1 - 9:00 AM",
    title: "Opening Talk + Verification",
    description: "Introduction, rules explanation, and participant verification.",
  },
  {
    date: "Day 1 - 10:00 AM",
    title: "Competitive Programming (DSA)",
    description: "Algorithmic coding challenges to test problem-solving skills.",
  },
  // {
  //   date: "Day 1 - 1:00 PM",
  //   title: "Lunch",
  //   description: "Lunch break before the next competition.",
  // },
  {
    date: "Day 1 - 2:00 PM",
    title: "Capture The Flag (CTF) Challenge + Kaggle + Recreational Activity",
    description: "A mix of cybersecurity, data science, and fun activities.",
  },
  // {
  //   date: "Day 1 - 8:00 PM",
  //   title: "Dinner Break",
  //   description: "Time to have dinner and refresh before the hackathon.",
  // },
  {
    date: "Day 1 - 11:00 PM",
    title: "Hackathon Begins",
    description: "Official start of the hackathon project development.",
  },
  // {
  //   date: "Day 2 - 12:00 PM",
  //   title: "Lunch",
  //   description: "Midway lunch break during the hackathon.",
  // },
  // {
  //   date: "Day 2 - 4:00 PM",
  //   title: "Snacks Break",
  //   description: "Refreshments and quick break before pitching rounds.",
  // },
  {
    date: "Day 2 - 4:30 PM",
    title: "First Round of Pitching",
    description: "Initial round where teams present their projects.",
  },
  {
    date: "Day 2 - 6:30 PM",
    title: "Final Pitching Round",
    description: "Final presentations to judges before the closing ceremony.",
  },
  // {
  //   date: "Day 2 - 7:30 PM",
  //   title: "Dinner",
  //   description: "Dinner break after the final pitching round.",
  // },
  {
    date: "Day 2 - 9:00 PM",
    title: "Award Ceremony & Closing Remarks",
    description: "Announcement of winners and event conclusion.",
  },
];

// Professional title component
const ProfessionalTitle = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  
  const baseAnimation = shouldReduceMotion ? {} : {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    whileInView: { opacity: 1, transform: 'translateY(0)' },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };
  
  return (
    <div className="relative mb-12 md:mb-20">
      <motion.div
        {...baseAnimation}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C540AB] via-[#E055C3] to-[#F570DB] bg-clip-text text-transparent font-corsiva italic">
          Event Timeline
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C540AB] to-[#F570DB] mx-auto rounded-full"></div>
      </motion.div>
    </div>
  );
});

ProfessionalTitle.displayName = "ProfessionalTitle";

// Memoized MobileTimeline component
const MobileTimeline = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  
  const baseAnimation = shouldReduceMotion ? {} : {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    whileInView: { opacity: 1, transform: 'translateY(0)' },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C540AB] via-[#E055C3] to-[#F570DB]"></div>
      
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.title}
            {...baseAnimation}
            transition={{ ...baseAnimation.transition, delay: index * 0.1 }}
            className="flex items-start gap-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-4 h-4 bg-black border-4 border-[#C540AB] rounded-full shadow-lg shadow-[#C540AB]/30"></div>
            </div>
            
            {/* Content card */}
            <div className="flex-1 bg-gray-900 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#C540AB]/30 hover:border-[#C540AB] transition-all duration-300 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-sm font-medium text-[#C540AB] mb-3">{event.date}</p>
              <p className="text-white leading-relaxed">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

MobileTimeline.displayName = "MobileTimeline";

// Memoized DesktopTimeline component
const DesktopTimeline = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  
  const leftRightAnimation = (index: number) => shouldReduceMotion ? {} : {
    initial: { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay: index * 0.1 }
  };

  return (
    <div className="relative">
      {/* Center timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C540AB] via-[#E055C3] to-[#F570DB] transform -translate-x-1/2"></div>
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.title}
            {...leftRightAnimation(index)}
            className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Content side */}
            <div className="flex-1 px-8">
              <div className={`bg-gray-900 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#C540AB]/30 hover:border-[#C540AB] transition-all duration-300 p-6 ${
                index % 2 === 0 ? "text-right ml-auto" : "text-left mr-auto"
              } max-w-lg`}>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{event.title}</h3>
                <p className="text-sm md:text-base font-medium text-[#C540AB] mb-3">{event.date}</p>
                <p className="text-white leading-relaxed">{event.description}</p>
              </div>
            </div>
            
            {/* Center dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-6 h-6 bg-black border-4 border-[#C540AB] rounded-full shadow-lg shadow-[#C540AB]/30 hover:border-[#F570DB] transition-colors duration-300"></div>
            </div>
            
            {/* Empty space for alignment */}
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

DesktopTimeline.displayName = "DesktopTimeline";

export function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
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

