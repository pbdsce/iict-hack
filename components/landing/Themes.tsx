'use client'
import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Theme {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
}

const themes: Theme[] = [
  {
    id: 1,
    title: "Domain Specific Compilers and Languages",
    category: "DSLs",
    description:
      "Design and implement compilers and languages for specific applications or hardware.",
    fullDescription:
      "Design and Implementation of Compilers and Programming Languages for specific applications or hardware. Examples: Halide for computational photography, a programming language for drones, theorem prover languages.",
    technologies: ["Compilers", "Programming Languages", "eDSLs"],
  },
  {
    id: 2,
    title: "Compiler Frameworks and Tools",
    category: "Frameworks",
    description:
      "Advancements in compiler infrastructure, IRs, program analysis, and transformation tools.",
    fullDescription:
      "Advancements in compiler infrastructure, intermediate representations, program analysis, and transformation tools. Examples: static analysis tools, debuggers, automated code formatting and review tools, coverage and profiling.",
    technologies: [
      "Tools",
      "Static Analysis",
      "Debugging",
      "Formatting",
      "Code Review",
    ],
  },
  {
    id: 3,
    title: "Compilers and AI/ML",
    category: "AI/ML",
    description:
      "Using AI/ML to enhance compilers, and compiler tech for AI/ML workflows.",
    fullDescription:
      "Using AI/ML to enhance Compiler technology, and Compiler technology for AI/ML. Examples: LLM support for CFGs, AI-based tooling like CodeRabbit, GPT wrappers for compiler development.",
    technologies: [
      "Artificial Intelligence",
      "Machine Learning",
      "Domain Specific Compilers",
    ],
  },
  {
    id: 4,
    title: "Optimizing for the Real World",
    category: "Optimization",
    description:
      "Use compiler techniques to make real-world software perform better and greener.",
    fullDescription:
      "Use Compiler Technology and techniques to make real world software perform better. Examples: Auto-tuning for heterogeneous systems, energy-efficient codegen, instruction-level optimization for edge processors.",
    technologies: ["Auto tuning", "Energy efficient codegen", "Edge computing"],
  },
  {
    id: 5,
    title: "Explainable Compilers",
    category: "Explainability",
    description:
      "Make compilers more transparent to developers with better tooling and visualizations.",
    fullDescription:
      "Modern compilers are complex software. Make them more transparent to developers. Examples: Visualising IR to ASM, debugging tools that show optimization decisions, interactive sites for compiler teaching.",
    technologies: ["Explainability", "Teaching Compilers", "Visualisation"],
  },
  {
    id: 6,
    title: "Compilers for New Paradigms",
    category: "New Paradigms",
    description:
      "Develop compilers or tooling for emerging paradigms and domains.",
    fullDescription:
      "Develop compilers or tooling for emerging paradigms. Examples: Compilers for eBPF or secure enclaves, Quantum IR-to-gate compilers, attack-surface reduction compilers.",
    technologies: ["Quantum", "eBPF", "Security"],
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
      <motion.div {...baseAnimation} className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
          Hackathon Themes
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
        <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">
          <span className="font-semibold">Note:</span> The below themes are indicative only. They are meant to spark your creativity and give you a feel for what kind of projects you can build at this hackathon. We accept all kinds of projects broadly in the areas of Compilers, Programming Languages, Program Analysis, Tools and more. Go through the {" "}
          <a
            href="https://compilertech.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[#F481C9] underline underline-offset-4 hover:text-[#DE5FB9]"
          >
            IICT Website
          </a>.
        </p>
      </motion.div>
    </div>
  );
});
ProfessionalTitle.displayName = "ProfessionalTitle";

// Theme card component with new "glass effect" styling
const ThemeBox = memo(({ 
  theme, isExpanded, isFaded, onExpand, onClose 
}: {
  theme: Theme; isExpanded: boolean; isFaded: boolean; onExpand: () => void; onClose: () => void;
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (isExpanded) {
    return (
      <motion.div
        initial={shouldReduceMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? {} : { scale: 0.9, opacity: 0 }}
        className="bg-black/50 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl shadow-[#C83DAD]/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{theme.title}</h3>
            <span className="inline-block px-3 py-1 bg-[#C83DAD] text-white text-sm rounded-full">
              {theme.category}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-[#C83DAD] mb-2">Description</h4>
            <p className="text-white/90 leading-relaxed">{theme.fullDescription}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#C83DAD] mb-2">Suggested Areas</h4>
            <div className="flex flex-wrap gap-2">
              {theme.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-md text-sm border border-white/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#C83DAD]/30 hover:border-[#C83DAD]/60 hover:bg-white/20 ${ isFaded ? 'opacity-40' : 'opacity-100' }`}
      onClick={onExpand}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{theme.title}</h3>
      </div>
      <span className="inline-block px-3 py-1 bg-[#C83DAD] text-white text-sm rounded-full mb-3">
        {theme.category}
      </span>
      <p className="text-white/80 text-sm leading-relaxed mb-4">{theme.description}</p>
      <div className="flex flex-wrap gap-1">
        {theme.technologies.slice(0, 3).map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-white/5 backdrop-blur-sm text-white rounded text-xs border border-white/10">
            {tech}
          </span>
        ))}
        {theme.technologies.length > 3 && (
          <span className="px-2 py-1 bg-white/5 backdrop-blur-sm text-white rounded text-xs border border-white/10">
            +{theme.technologies.length - 3} more
          </span>
        )}
      </div>
    </motion.div>
  );
});
ThemeBox.displayName = "ThemeBox";

function Themes() {
    // ... component logic remains the same
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleExpand = (id: number) => {
        setScrollPosition(window.scrollY);
        setExpandedId(id);
    };

    const handleClose = () => {
        setExpandedId(null);
        setTimeout(() => {
            window.scrollTo({ top: scrollPosition, behavior: 'auto' });
        }, 50);
    };

    useEffect(() => {
        if (expandedId !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [expandedId]);

  return (
    <section className="py-20 bg-black" id="themes">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfessionalTitle />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.1 }}
        >
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <ThemeBox 
                theme={theme}
                isExpanded={false}
                isFaded={expandedId !== null && expandedId !== theme.id}
                onExpand={() => handleExpand(theme.id)}
                onClose={handleClose}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {expandedId !== null && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
              onClick={handleClose}
            >
              <ThemeBox 
                theme={themes.find(t => t.id === expandedId)!}
                isExpanded={true}
                isFaded={false}
                onExpand={() => {}}
                onClose={handleClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Themes;