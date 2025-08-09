"use client";

import React from 'react';
import Image from 'next/image';
import { Mail, Twitter, Linkedin, Globe } from 'lucide-react';


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
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "Register", href: "/register" }
  ];

  // removed partners block per request

  const socialLinks = [
    { icon: Mail, href: "mailto:ashutosh@compilertech.org", label: "Email" },
    { icon: Twitter, href: "https://x.com/compiler_tech", label: "X (Twitter)" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/compiler-technology", label: "LinkedIn" }
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
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/shortlogo.png"
                alt="SegFault Logo"
                width={70}
                height={70}
                className="object-contain brightness-0 invert"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white font-corsiva italic">SEGFAULT</h3>
            </div>
            
            <p className="text-white/70 text-lg leading-relaxed font-inter max-w-md">
              SEGFAULT Hackathon is co-located with the Innovations In Compiler Technology (IICT) Workshop. Learn more on the IICT site.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-[#C540AB] font-inter">
              <Globe className="w-5 h-5" />
              <a 
                href="https://compilertech.org/" 
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[#E055C3] transition-colors duration-200"
              >
                Visit IICT Website
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 font-inter">
              Quick Links
            </h4>
            <ul className="space-y-3">
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
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 font-inter">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-[#C540AB] hover:bg-[#C540AB]/10 hover:border-[#C540AB]/30 border border-gray-700/50 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            {/* empty space where partners were previously shown */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-white/50 text-sm font-inter">
            <span>© 2025 SEGFAULT @ IICT.</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm font-inter">
            <span>Made with</span>
            <span className="text-[#E255A1]" aria-hidden>❤</span>
            <span>by</span>
            <a href="https://pointblank.club" target="_blank" rel="noreferrer noopener" className="inline-flex items-center">
              <Image src="https://www.pointblank.club/_next/static/media/logo.8d55ed6e.svg" alt="Point Blank" className="h-3 w-auto opacity-90 hover:opacity-100 transition-opacity" width={100} height={100} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C540AB] to-transparent" />
    </footer>
  );
} 