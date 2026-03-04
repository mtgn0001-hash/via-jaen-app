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
        "relative flex items-center justify-center rounded-2xl transition-all duration-500",
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
        {/* Silueta Rectilínea de la Catedral de Jaén (Sin formas redondeadas) */}
        {/* Cuerpo y Torres con líneas arquitectónicas más fieles */}
        <path 
          d="M15 85V35H25V20H35V35H40V85M85 85V35H75V20H65V35H60V85M40 85V45H45V40H55V45H60V85" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        
        {/* Detalles de la fachada (ventanales y cornisas) en líneas rectas */}
        <path d="M19 45H21M79 45H81M47 55H53M47 65H53" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.4" />
        
        {/* Línea de base sólida */}
        <path 
          d="M10 85H90" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="square"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
