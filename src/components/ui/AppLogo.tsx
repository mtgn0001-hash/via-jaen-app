
"use client"

import React from "react";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  size?: number;
  variant?: "default" | "white" | "minimal";
};

export function AppLogo({ className, size = 40, variant = "default" }: AppLogoProps) {
  const containerColors = {
    default: "bg-white border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    white: "bg-white/10 border-white/20",
    minimal: "bg-transparent border-transparent",
  };

  const fillColors = {
    default: "text-primary",
    white: "text-white",
    minimal: "text-primary",
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full border transition-all duration-500 overflow-hidden group",
        containerColors[variant],
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Efecto de profundidad sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-50 pointer-events-none" />
      
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("relative z-10 transition-all duration-500 group-hover:scale-110", fillColors[variant])}
        style={{ width: size * 0.6, height: size * 0.6 }}
      >
        {/* Corazón con Cruz Médica (Logo Salud) */}
        <path 
          d="M50 90C48 90 10 65 10 35C10 18 25 10 40 10C44 10 48 12 50 15C52 12 56 10 60 10C75 10 90 18 90 35C90 65 52 90 50 90Z" 
          fill="currentColor"
        />
        {/* Cruz en negativo */}
        <rect x="44" y="25" width="12" height="30" fill="white" rx="2" />
        <rect x="35" y="34" width="30" height="12" fill="white" rx="2" />
      </svg>
    </div>
  );
}
