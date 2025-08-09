'use client'
import React, { useState } from 'react';
import { ChevronDown, Target, Crosshair, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  questions: FAQItem[];
}

interface FAQData {
  [key: string]: FAQSection;
}

interface MenuItem {
  id: keyof FAQData;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export default function FAQ() {
  const faqData: FAQData = {
    general: {
      questions: [
        {
          question: "What is the cost for registering for the SEGFAULT Hackathon?",
          answer: "Zero, Nada, Zilch. Participation is free.",
        },
        {
          question: "Who does the Intellectual Property generated belong to?",
          answer: "All IP belongs to the participants that built the projects.",
        },
        {
          question: "Do I need to pay to attend the IICT Workshop?",
          answer:
            "If you are among the top 6 finalists, No! We will cover the costs of your workshop attendance.",
        },
        {
          question: "I have some other questions. Who should I reach out to?",
          answer:
            "Email Ashutosh Pandey (ashutosh@compilertech.org), or reach out via IICT workshop social channels (LinkedIn, Twitter, Email).",
        },
      ],
    },
    events: {
      questions: [
        {
          question: "Where is the finale for the Hackathon planned?",
          answer:
            "The Hackathon is co-located with the IICT workshop. The finale will be at A V Rama Rao Auditorium, Indian Institute of Science, Bangalore.",
        },
        {
          question: "Are my travel costs covered?",
          answer:
            "While we cannot guarantee to cover all travel costs at this moment, we do offer reimbursements to student attendees. Reach out to the organizers.",
        },
        {
          question: "What is the format for presenting at the finale?",
          answer:
            "5 minutes to pitch in front of the Jury, with 2-3 minutes of Q/A (viva).",
        },
      ],
    },
    accomodation: {
      questions: [
        {
          question: "Will I get accommodation at IISc?",
          answer:
            "No, we are unable to confirm accommodation at this time. However, some of your accommodation costs can be offset by student travel grants; we will publish a guide closer to the finale with affordable places near campus.",
        },
        {
          question: "What about food?",
          answer:
            "The IICT workshop has arrangements for Breakfast, Lunch and snacks on both days (27th and 28th September). You need to make your own arrangements for Dinner.",
        },
      ],
    },
  };

  const menuItems: MenuItem[] = [
    { id: 'general', label: 'GENERAL', icon: Flag },
    { id: 'events', label: 'EVENTS', icon: Target },
    { id: 'accomodation', label: 'ACCOMMODATION', icon: Crosshair }
];

  const [selectedSection, setSelectedSection] = useState<keyof FAQData>('general');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const faqList = (
    <div className="space-y-4">
      {faqData[selectedSection].questions.map((item, index) => (
        <div
          key={index}
          // Applying the "glass effect" to the FAQ item
          className="border border-white/10 rounded-lg bg-black/40 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#C83DAD] hover:shadow-xl hover:shadow-[#C83DAD]/30 group"
        >
            <button
              onClick={() => toggleQuestion(`${selectedSection}-${index}`)}
              className="w-full py-6 px-6 flex justify-between items-center text-left text-white group-hover:text-[#C83DAD] transition-colors"
            >
              <span className="text-xl font-medium pr-8">{item.question}</span>
              <motion.div
                animate={{ rotate: openQuestion === `${selectedSection}-${index}` ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`transition-colors duration-300 ${ openQuestion === `${selectedSection}-${index}` ? 'text-[#C83DAD]' : 'group-hover:text-[#C83DAD]' }`}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openQuestion === `${selectedSection}-${index}` && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-6 text-white/80 text-lg leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
  );

  return (
    <section className="min-h-screen py-20 bg-black pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Answers to common questions about the SEGFAULT Hackathon and the IICT finale.
            </p>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden relative mb-8">
            <div className="flex overflow-x-auto px-4 sm:px-6 space-x-4 pb-4 no-scrollbar">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300 ${ selectedSection === item.id ? 'bg-[#C83DAD]/10 text-[#C83DAD] border-[#C83DAD]' : 'text-gray-400 hover:text-white border-gray-700 hover:border-gray-600' }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

                    {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left py-5 border-b-2 transition-all duration-300 flex items-center gap-4 hover:pl-2 ${ selectedSection === item.id ? 'border-[#C83DAD] text-[#C83DAD]' : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600' }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xl tracking-wider font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              {faqList}
            </div>
          </div>
          
          {/* Mobile FAQ List */}
          <div className="lg:hidden">
            {faqList}
          </div>
        </div>
      </div>
       {/* CSS to hide scrollbar, as inline style might not be supported everywhere */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}