"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export function NavbarFinal({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Themes",
      link: "#themes",
    },
    {
      name: "Timeline",
      link: "#timeline",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId) as HTMLElement;
    if (element) {
      const navbarHeight = 80; // Account for navbar height + some padding
      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top + window.pageYOffset - navbarHeight;
      
      // Force smooth scrolling with our polyfill for better mobile support
      smoothScrollPolyfill(elementPosition);
    }
  };

  // Smooth scroll polyfill for mobile devices
  const smoothScrollPolyfill = (targetPosition: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // 800ms duration
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const ease = progressPercentage < 0.5 
        ? 2 * progressPercentage * progressPercentage 
        : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + (distance * ease));
      
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="bg-white border-b border-gray-200 font-inter shadow-sm">
          <div className="flex items-center">
            <NavbarLogo />
          </div>
          <div className="flex items-center justify-center space-x-8 flex-1">
            {navItems.map((item, idx) => (
              <a
                key={`nav-link-${idx}`}
                href={item.link}
                onClick={(e) => handleSmoothScroll(e, item.link)}
                className="text-[#C540AB] hover:text-[#E055C3] font-medium transition-colors duration-200 font-inter"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton href="/register" variant="primary" className="bg-[#C540AB] text-white hover:bg-[#E055C3] font-inter">Register</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="bg-white">
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            className="bg-white font-inter"
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  handleSmoothScroll(e, item.link);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-[#C540AB] hover:text-[#E055C3] font-inter font-medium w-full py-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.3 + (idx * 0.1), // Start after menu is done (0.3s) + stagger
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <span className="block">{item.name}</span>
              </motion.a>
            ))}
            <motion.div 
              className="flex w-full flex-col gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + (navItems.length * 0.1) + 0.1, // After all links + extra delay
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                href="/register"
                variant="primary"
                className="w-full bg-[#C540AB] text-white hover:bg-[#E055C3] font-inter"
              >
                Register
              </NavbarButton>
            </motion.div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {children}
    </div>
  );
}
