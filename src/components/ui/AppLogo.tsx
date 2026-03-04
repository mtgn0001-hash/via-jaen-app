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
    default: "bg-primary/10",
    white: "bg-white/20",
    minimal: "bg-transparent",
  };

  const strokeColors = {
    default: "text-primary",
    white: "text-white",
    minimal: "text-primary",
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-500",
        containerColors[variant],
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("transition-all duration-300", strokeColors[variant])}
        style={{ width: size * 0.6, height: size * 0.6 }}
      >
        {/* Silueta lineal (outline) de la Catedral de Jaén con formas suaves */}
        <path 
          d="M25 80V35C25 32 27 30 30 30H40V80M60 80V30H70C73 30 75 32 75 35V80M40 80V45C40 38 44 33 50 33C56 33 60 38 60 45V80" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        {/* Detalle de la cúpula/arco superior suavizado */}
        <path 
          d="M42 30C42 26 45 23 50 23C55 23 58 26 58 30" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
