"use client";

import AnimatedNavbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";

export default function ConditionalNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show navbar on registration page
  const shouldShowNavbar = !pathname.startsWith("/register");

  if (shouldShowNavbar) {
    return (
      <>
        <AnimatedNavbar />
        {children}
      </>
    );
  }

  return <>{children}</>;
} 