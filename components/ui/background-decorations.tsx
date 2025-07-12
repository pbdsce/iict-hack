"use client";
import React from "react";

// Floating gradient shapes component with minimal animations
const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient circle - top right - STATIC */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(88, 28, 135, 0.08) 50%, rgba(0, 0, 0, 0.6) 100%)"
        }}
      />

      {/* Medium gradient circle - left side - SUBTLE ANIMATION */}
      <div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.06) 50%, rgba(0, 0, 0, 0.7) 100%)",
          animationDuration: "4s"
        }}
      />

      {/* Small gradient circle - bottom left - STATIC */}
      <div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(190, 24, 93, 0.05) 50%, rgba(0, 0, 0, 0.8) 100%)"
        }}
      />

      {/* Floating geometric square - STATIC */}
      <div
        className="absolute top-1/3 right-1/4 w-32 h-32 opacity-8 rounded-xl"
        style={{
          background: "linear-gradient(45deg, rgba(79, 70, 229, 0.06) 0%, rgba(67, 56, 202, 0.08) 50%, rgba(0, 0, 0, 0.8) 100%)"
        }}
      />

      {/* Animated gradient rectangle - center right - STATIC */}
      <div
        className="absolute top-1/2 right-10 w-56 h-40 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.06) 0%, rgba(124, 58, 237, 0.08) 50%, rgba(0, 0, 0, 0.9) 100%)"
        }}
      />

      {/* Small floating dots - STATIC */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-15"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '147, 51, 234' : '59, 130, 246'}, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)`
          }}
        />
      ))}

      {/* Large background gradient - bottom - VERY SUBTLE ANIMATION */}
      <div
        className="absolute bottom-0 left-0 w-full h-96 animate-pulse"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(88, 28, 135, 0.02) 50%, rgba(0, 0, 0, 0.4) 100%)",
          animationDuration: "6s"
        }}
      />

      {/* Diagonal gradient lines - STATIC */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-3"
        style={{
          background: `
            linear-gradient(45deg, transparent 49%, rgba(88, 28, 135, 0.15) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(67, 56, 202, 0.1) 50%, transparent 51%)
          `,
          backgroundSize: "200px 200px"
        }}
      />
    </div>
  );
};

// Main background decorations component
export const BackgroundDecorations = () => {
  return (
    <>
      {/* Main background gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(15, 15, 25, 0.95) 100%)
          `
        }}
      />
      
      {/* Floating shapes */}
      <FloatingShapes />
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 opacity-3 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(88, 28, 135, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(67, 56, 202, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />
    </>
  );
};

export default BackgroundDecorations; 