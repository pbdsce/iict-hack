'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/fulllogo.svg';

// Animation variants
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

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div 
        className="container h-full relative z-10 px-1"
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
            <div className="relative">
              <Image 
                src={logo.src} 
                alt="HashBoot" 
                width={100} 
                height={100} 
                className="w-72 md:w-[40rem] drop-shadow-2xl mb-10" 
                priority
              />
            </div>
          </motion.div>
          
          {/* Slogan */}
          <motion.div 
            className="mb-12"
            variants={sloganVariants}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#C540AB] mb-4 font-corsiva italic">
                Boot Your Brain. Hash the Impossible.
            </h1>
          </motion.div>

          {/* Enhanced description */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-8 font-inter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </motion.div>

          {/* Register Button */}
          <motion.div 
            variants={buttonVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mb-16"
          >
            <Link href="/register">
              <motion.button 
                className="px-8 py-4 bg-[#C540AB] text-white font-bold text-lg rounded-xl hover:bg-[#E055C3] transition-all duration-300 shadow-lg shadow-[#C540AB]/25 hover:shadow-xl hover:shadow-[#C540AB]/40 font-inter"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(197, 64, 171, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Event Timer (uncommented and styled) */}
          {/* <motion.div 
            className="mt-16"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <EventTimer targetDate={new Date("2025-04-27T00:00:00").toISOString()} />
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
}