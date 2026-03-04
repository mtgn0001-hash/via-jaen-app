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
        style={{ width: size * 0.7, height: size * 0.7 }}
      >
        {/* Silueta de la Catedral de Jaén: Trazos suaves y reconocibles */}
        <path 
          d="M20 80V35C20 32.2386 22.2386 30 25 30H35V80M65 80V30C65 27.2386 67.2386 25 70 25H80V80M35 80V45C35 36.7157 41.7157 30 50 30C58.2843 30 65 36.7157 65 45V80" 
          stroke="currentColor" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Detalle del frontón central/arco característico */}
        <path 
          d="M42 30C42 24.4772 45.5817 20 50 20C54.4183 20 58 24.4772 58 30" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        {/* Línea de base suave */}
        <path 
          d="M15 80H85" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
