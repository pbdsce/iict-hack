'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import defaults from '@/public/images/default.svg';
import variant from '@/public/images/variant.svg';

// Animation variants (unchanged)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const logoVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0
  }
};

const sloganVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

export function Hero(){
  // State to manage the hover effect for the logo
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    // Set background to black and default text to white
    <div className="flex items-center justify-center -mt-16 min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="container h-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-7xl mx-auto">
          {/* Logo with animation */}
          <motion.div 
            className="flex justify-center items-center"
            variants={logoVariants}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              duration: 1.2
            }}
          >
            {/* Logo container with state-based hover events */}
            <div 
              className="relative w-[60rem] -mb-10"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Default Logo Image */}
              <Image 
                src={defaults}
                alt="SegFault" 
                className="w-full h-auto transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 0 : 1 }}
              />
              {/* Variant Logo Image (positioned absolutely on top) */}
              <Image 
                src={variant}
                alt="SegFault Variant" 
                className="w-full h-auto absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 1 : 0 }}
              />
            </div>
          </motion.div>
          
          {/* Slogan with updated accent color */}
          <motion.div 
            className="mt-10 sm:mt-8 md:mt-10"
            variants={sloganVariants}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#C83DAD] mb-6 sm:mb-8 md:mb-10 font-corsiva italic px-4 leading-tight">
              Where Impossible is Just an Error Code.            
            </h1>
            {/* IICT note (placed above the register button) */}
            <p className="mx-auto max-w-3xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed px-4">
              The <span className="font-semibold">SegFault Hackathon</span> is co-located and organized as a part of the
              <span className="font-semibold"> Innovations In Compiler Technology (IICT)</span> Workshop. Check out the
              {" "}
              <a
                href="https://compilertech.org/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#F481C9] underline underline-offset-4 hover:text-[#DE5FB9]"
              >
                IICT Website here
              </a>
              .
            </p>
          </motion.div>

          {/* Enhanced description */}
          {/* <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 font-inter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </motion.div> */}

          {/* Register Button with white glass effect */}
          <motion.div 
            variants={buttonVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-6 sm:mt-8 md:mt-10 px-4"
          >
            <a href="/register">
              <motion.button 
                className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 font-inter
                           bg-white/10 backdrop-blur-md border border-white/20 shadow-lg
                           hover:bg-white/20 hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register For Hackathon
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
