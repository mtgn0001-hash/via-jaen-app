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
        {/* Silueta Rectilínea de la Catedral de Jaén */}
        <path 
          d="M10 85h80V35H75V15h-12v20H55v5H45v-5h-7V15H26v20H10v50zM42 75h16v10H42V75z" 
          fill="currentColor"
        />
        {/* Detalles negativos */}
        <rect x="18" y="45" width="6" height="4" fill="white" fillOpacity="0.4" />
        <rect x="76" y="45" width="6" height="4" fill="white" fillOpacity="0.4" />
        <rect x="18" y="55" width="6" height="4" fill="white" fillOpacity="0.3" />
        <rect x="76" y="55" width="6" height="4" fill="white" fillOpacity="0.3" />
        <rect x="42" y="50" width="16" height="2" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  );
}