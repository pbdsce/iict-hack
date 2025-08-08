'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

type Brand = {
  name: string;
  href: string;
  logo?: string; // remote image URL
  tier?: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
};

const sponsors: Brand[] = [
  {
    name: 'NVIDIA',
    href: 'https://www.nvidia.com/',
    tier: 'Platinum',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg',
  },
  {
    name: 'Quadric',
    href: 'https://quadric.io/',
    tier: 'Bronze',
    logo: 'https://quadric.io/wp-content/uploads/2023/03/Quadric_Logo_FA_72_DPI.png',
  },
];

const partners: Brand[] = [
  {
    name: 'Point Blank',
    href: 'https://pointblank.club',
    logo: 'https://www.pointblank.club/_next/static/media/logo.8d55ed6e.svg',
  },
  {
    name: 'ACM',
    href: 'https://www.acm.org/',
    logo: 'https://www.acm.org/binaries/content/gallery/global/top-menu/acm_logo_tablet.svg',
  },
  {
    name: 'ISOFT',
    href: 'https://isoft.acm.org/',
    // If their site exposes a logo, replace below; fallback handled
    logo: 'https://isoft.acm.org/images/isoft-logo.png',
  },
];

function ImageOrFallback({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  if (!brand.logo || failed) {
    return (
      <div className="w-full h-16 md:h-20 flex items-center justify-center">
        <span className="text-white/90 font-semibold">{brand.name}</span>
      </div>
    );
  }
  return (
    <Image
      src={brand.logo}
      alt={`${brand.name} logo`}
      width={240}
      height={80}
      className="object-contain w-auto h-12 md:h-16"
      onError={() => setFailed(true)}
    />
  );
}

export default function SponsorsSection() {
  const shouldReduceMotion = useReducedMotion();
  const baseAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.6 },
      };

  const tiers: Array<'Platinum' | 'Gold' | 'Silver' | 'Bronze'> = [
    'Platinum',
    'Gold',
    'Silver',
    'Bronze',
  ];

  return (
    <section id="sponsors" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...baseAnimation} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
            Sponsors
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full" />
          <p className="mt-6 text-white/70 max-w-3xl mx-auto text-sm md:text-base">
            We’re grateful to our sponsors and partners for supporting the SEGFAULT Hackathon at IICT.
          </p>
        </motion.div>

        <div className="space-y-10">
          {tiers.map((tier) => {
            const items = sponsors.filter((s) => s.tier === tier);
            if (items.length === 0) return null;
            return (
              <div key={tier} className="text-center">
                <motion.h3
                  {...baseAnimation}
                  className="text-white/90 font-semibold tracking-wide mb-6 uppercase text-center"
                >
                  {tier}
                </motion.h3>
                <div className="mx-auto w-full max-w-5xl">
                  <div className="flex flex-wrap justify-center gap-6">
                    {items.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 flex items-center justify-center w-56 md:w-60 h-24 hover:shadow-lg hover:shadow-[#C83DAD]/20"
                      >
                        <ImageOrFallback brand={brand} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div {...baseAnimation} className="text-center mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
            Partners
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full" />
        </motion.div>

        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4 flex items-center justify-center w-56 md:w-60 h-24 hover:shadow-lg hover:shadow-[#C83DAD]/20"
              >
                <ImageOrFallback brand={brand} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


