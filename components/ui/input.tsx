"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-[#C540AB] focus:ring-2 focus:ring-[#C540AB]/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input }; 