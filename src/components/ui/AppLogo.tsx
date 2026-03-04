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
    default: "bg-primary/5",
    white: "bg-white/10",
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
        "relative flex items-center justify-center rounded-[1.25rem] transition-all duration-500",
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
        style={{ width: size * 0.75, height: size * 0.75 }}
      >
        {/* Silueta de la Catedral de Jaén: Trazos que definen las torres y el frontón real */}
        <path 
          d="M18 80V35C18 32 20 30 23 30H32V25C32 22 34 20 37 20H43V80M82 80V35C82 32 80 30 77 30H68V25C68 22 66 20 63 20H57V80M32 80V45C32 38 38 32 50 32C62 32 68 38 68 45V80" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Cúpula central estilizada */}
        <path 
          d="M42 32C42 27 45 24 50 24C55 24 58 27 58 32" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        {/* Detalles de balcones/ventanas (toque arquitectónico sutil) */}
        <path d="M22 40H28M72 40H78M45 45H55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        
        {/* Línea de suelo decorativa */}
        <path 
          d="M10 80H90" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
