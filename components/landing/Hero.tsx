"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import defaults from "@/public/images/default.svg";
import variant from "@/public/images/variant.svg";

// Animation variants removed for better performance on slow systems

export function Hero() {
  // State to manage the hover effect for the logo
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Function to track register button clicks
  const trackClick = async (buttonType: string) => {
    try {
      await fetch('/api/clickTracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buttonType,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  return (
    // Set background to black and default text to white
    <div className="flex items-center justify-center -mt-16 min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="container h-full relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center items-center">
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
          </div>

          {/* Slogan with updated accent color */}
          <div className="mt-10 sm:mt-8 md:mt-10">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#C83DAD] mb-6 sm:mb-8 md:mb-10 font-corsiva italic px-4 leading-tight">
              Where Impossible is Just an Error Code.
            </h1>
            {/* IICT note (placed above the register button) */}
            <p className="mx-auto max-w-3xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed px-4">
              The <span className="font-semibold">SegFault Hackathon</span> is
              co-located and organized as a part of the
              <span className="font-semibold">
                {" "}
                Innovations In Compiler Technology (IICT)
              </span>{" "}
              Workshop. Check out the{" "}
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
          </div>

          {/* Enhanced description */}
          {/* <div>
            <p className="text-sm md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 font-inter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div> */}

          {/* Register Button with white glass effect */}
          <div className="mt-6 sm:mt-8 md:mt-10 px-4">
            <a 
              href="/register"
              onClick={() => trackClick('hero_register')}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}
