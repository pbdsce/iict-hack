'use client'
import React, { useState } from 'react';
import { ChevronDown, Target, Crosshair, Briefcase, Flag } from 'lucide-react';
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

export default function Brief() {
  const faqData: FAQData = {
    general: {
      questions: [
        {
          question: "Lorem ipsum dolor sit amet consectetur?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        
        {
          question: "Sed ut perspiciatis unde omnis iste natus?",
          answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
        },
        {
          question: "At vero eos et accusamus dignissimos?",
          answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
        },
        {
          question: "Nam libero tempore soluta nobis eligendi?",
          answer: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est."
        }
        
      ]
    },
    events: {
      questions: [
        {
          question: "Temporibus autem quibusdam officiis debitis?",
          answer: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
        },
        {
          question: "Et harum quidem rerum facilis expedita?",
          answer: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat."
        },
        {
          question: "Itaque earum rerum hic tenetur sapiente?",
          answer: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        }
      ]
    },
    accomodation: {
      questions: [
        {
          question: "Neque porro quisquam est qui dolorem?",
          answer: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        },
        {
          question: "Ut enim ad minima veniam exercitationem?",
          answer: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
        },
        {
          question: "Vel illum qui dolorem eum fugiat quo?",
          answer: "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores."
        }
      ]
    },
    contact: {
      questions: [
        {
          question: "Quis autem vel eum iure reprehenderit?",
          answer: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        },
        {
          question: "Sed quia consequuntur magni dolores eos?",
          answer: "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
        }
      ]
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'general', label: 'GENERAL', icon: Flag },
    { id: 'events', label: 'EVENTS', icon: Target },
    { id: 'accomodation', label: 'ACCOMODATION', icon: Crosshair },
    { id: 'contact', label: 'CONTACT', icon: Briefcase }
  ];

  const [selectedSection, setSelectedSection] = useState<keyof FAQData>('general');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    if (openQuestion === questionId) {
      // If clicking the same question, close it
      setOpenQuestion(null);
    } else {
      // Otherwise open the new question (and automatically close the previous one)
      setOpenQuestion(questionId);
    }
  };

  return (
    <section className="h-full py-20 bg-black" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12 md:mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C540AB] via-[#E055C3] to-[#F570DB] bg-clip-text text-transparent font-corsiva italic"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C540AB] to-[#F570DB] mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-white max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>

          <div className="lg:hidden relative mb-8">
            <div 
              className="flex overflow-x-auto px-4 sm:px-6 space-x-4 pb-4"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {menuItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300
                    ${selectedSection === item.id 
                      ? 'bg-[#C540AB]/10 text-[#C540AB] border-[#C540AB]' 
                      : 'text-gray-400 hover:text-white border-gray-700 hover:border-gray-600'}`}
                >
                  <item.icon className={`w-5 h-5 ${selectedSection === item.id ? 'text-[#C540AB]' : 'text-gray-400'}`} />
                  <span className="text-base font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left py-5 border-b-2 transition-all duration-300 
                      flex items-center gap-4 hover:pl-2
                      ${selectedSection === item.id 
                        ? 'border-[#C540AB] text-[#C540AB]' 
                        : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'}`}
                  >
                    <item.icon className={`w-6 h-6 ${selectedSection === item.id ? 'text-[#C540AB]' : 'text-gray-400'}`} />
                    <span className="text-xl tracking-wider font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {faqData[selectedSection].questions.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="border border-gray-700 rounded-lg bg-gray-900 shadow-lg transition-all duration-300 hover:border-[#C540AB] hover:shadow-xl hover:shadow-[#C540AB]/30 group"
                    >
                      <button
                        onClick={() => toggleQuestion(`${selectedSection}-${index}`)}
                        className="w-full py-6 px-6 flex justify-between items-center text-left text-white group-hover:text-[#C540AB] transition-colors"
                      >
                        <span className="text-xl font-medium pr-8">{item.question}</span>
                        <motion.div
                          animate={{ rotate: openQuestion === `${selectedSection}-${index}` ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`transition-colors duration-300 ${
                            openQuestion === `${selectedSection}-${index}` 
                              ? 'text-[#C540AB]' 
                              : 'group-hover:text-[#C540AB]'
                          }`}
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
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 px-6 text-white text-lg leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {faqData[selectedSection].questions.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="border border-gray-700 rounded-lg bg-gray-900 shadow-lg transition-all duration-300 hover:border-[#C540AB] hover:shadow-xl hover:shadow-[#C540AB]/30"
                  >
                    <button
                      onClick={() => toggleQuestion(`${selectedSection}-${index}`)}
                      className="w-full py-6 px-6 flex justify-between items-center text-left text-white hover:text-[#C540AB] transition-colors"
                    >
                      <span className="text-xl font-medium pr-8">{item.question}</span>
                      <motion.div
                        animate={{ rotate: openQuestion === `${selectedSection}-${index}` ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`transition-colors duration-300 ${
                          openQuestion === `${selectedSection}-${index}` 
                            ? 'text-[#C540AB]' 
                            : 'hover:text-[#C540AB]'
                        }`}
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 px-6 text-white text-lg leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

