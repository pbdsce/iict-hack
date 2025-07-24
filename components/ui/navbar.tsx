'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/public/images/shortlogo.png';


const navLinks = [
  { title: 'Home', href: '#' },
  { title: 'Themes', href: '#themes' },
  { title: 'Timeline', href: '#timeline' },
  { title: 'FAQ', href: '#faq' },
];

export default function AnimatedNavbar() {
  // --- Step 1: Call ALL hooks unconditionally at the top ---
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- Step 2: Place the conditional return *after* all hooks ---
  // This ensures hook order is the same on every render.
  if (pathname === '/register') {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 1)', // Solid white background
      top: 0,
      width: '100%',
      borderRadius: '0px',
      marginTop: '0px',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white
      backdropFilter: 'blur(10px)',
      top: 0,
      width: '95%',
      borderRadius: '9999px', // Full capsule
      marginTop: '16px',
      border: '1px solid rgba(229, 231, 235, 0.5)', // Light gray border
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
  };

  return (
    <>
      <motion.nav
        initial="top"
        animate={scrolled ? 'scrolled' : 'top'}
        variants={navVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-6 py-4"
      >
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          {/* Constraining image size with Tailwind classes for better control */}
          <img 
            src={logo.src} 
            alt="Logo" 
            className="h-10 w-auto" 
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src='https://placehold.co/120x40/C83DAD/white?text=Logo'; 
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="font-semibold text-[#C83DAD] hover:text-[#A12A89] transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Register Button */}
        <div className="hidden md:block">
            <a href="/register">
                <motion.button
                    className="px-6 py-2 text-white font-bold text-base rounded-full transition-all duration-300
                            bg-[#C83DAD] shadow-lg shadow-[#C83DAD]/30
                            hover:bg-[#A12A89] hover:shadow-xl hover:shadow-[#C83DAD]/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Register
                </motion.button>
            </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#C83DAD] p-2">
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-50%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-white text-3xl font-semibold hover:text-[#C83DAD] transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <a href="/register">
                <motion.button
                    className="px-8 py-4 text-white font-bold text-xl rounded-full transition-all duration-300 mt-8
                            bg-[#C83DAD] shadow-lg shadow-[#C83DAD]/30
                            hover:bg-[#DE5FB9] hover:shadow-xl hover:shadow-[#C83DAD]/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Register Now
                </motion.button>
            </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
