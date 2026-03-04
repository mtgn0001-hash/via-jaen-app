
"use client"

import React from "react";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  size?: number;
  variant?: "default" | "white" | "minimal";
};

export function AppLogo({ className, size = 40, variant = "default" }: AppLogoProps) {
  const colors = {
    default: "text-primary",
    white: "text-white",
    minimal: "text-foreground",
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all duration-300", colors[variant], className)}
      style={{ width: size, height: size }}
    >
      {/* Silueta minimalista pura de la Catedral de Jaén */}
      <path 
        d="M20 85V25H35V85H20ZM65 85V25H80V85H65ZM35 85V40C35 30 42 25 50 25C58 25 65 30 65 40V85H35Z" 
        fill="currentColor" 
      />
    </svg>
  );
}
