"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Github, Twitter, Instagram, Linkedin } from 'lucide-react';


export function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId) as HTMLElement;
    if (element) {
      const navbarHeight = 80;
      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Themes", href: "#themes" },
    { name: "Timeline", href: "#timeline" },
    { name: "FAQ", href: "#faq" },
    { name: "Register", href: "/register" }
  ];

  const socialLinks = [
    { icon: Mail, href: "mailto:contact@hashboot.dev", label: "Email" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-[#C540AB]/20 to-[#E055C3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-gradient-to-br from-[#F570DB]/15 to-[#C540AB]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <Image
                src="/images/shortlogo.png"
                alt="HashBoot Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white font-corsiva italic">
                HashBoot
              </h3>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-lg leading-relaxed font-inter max-w-md"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex items-center gap-2 text-[#C540AB] font-inter"
            >
              <Mail className="w-5 h-5" />
              <a 
                href="mailto:contact@hashboot.dev" 
                className="hover:text-[#E055C3] transition-colors duration-200"
              >
                contact@hashboot.dev
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white font-semibold text-lg mb-6 font-inter"
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={link.href.startsWith('#') ? (e) => handleSmoothScroll(e, link.href) : undefined}
                    className="text-white/70 hover:text-[#C540AB] transition-colors duration-200 font-inter"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Social Links */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white font-semibold text-lg mb-6 font-inter"
            >
              Connect
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-[#C540AB] hover:bg-[#C540AB]/10 hover:border-[#C540AB]/30 border border-gray-700/50 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/50 text-sm font-inter">
            © 2024 HashBoot. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-inter">
            <a href="#" className="text-white/50 hover:text-[#C540AB] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-[#C540AB] transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C540AB] to-transparent" />
    </footer>
  );
} 