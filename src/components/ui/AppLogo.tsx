
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
    default: "bg-primary/10 border-primary/20 shadow-[0_0_20px_rgba(124,58,237,0.1)]",
    white: "bg-white/10 border-white/20",
    minimal: "bg-transparent border-transparent",
  };

  const fillColors = {
    default: "fill-primary",
    white: "fill-white",
    minimal: "fill-primary",
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-[1.25rem] border transition-all duration-500 overflow-hidden group",
        containerColors[variant],
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Efecto de brillo de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("relative z-10 transition-all duration-500 group-hover:scale-110", fillColors[variant])}
        style={{ width: size * 0.7, height: size * 0.7 }}
      >
        {/* Silueta Sólida de la Catedral de Jaén */}
        <path 
          d="M15 85H85V30H72V15H62V30H55V35H45V30H38V15H28V30H15V85ZM45 80H55V70H45V80Z" 
          fill="currentColor"
        />
        
        {/* Detalles de Ventanales Estilizados (Negativo) */}
        <rect x="23" y="40" width="8" height="4" fill="white" fillOpacity="0.3" />
        <rect x="69" y="40" width="8" height="4" fill="white" fillOpacity="0.3" />
        <rect x="23" y="50" width="8" height="4" fill="white" fillOpacity="0.2" />
        <rect x="69" y="50" width="8" height="4" fill="white" fillOpacity="0.2" />
        <rect x="42" y="45" width="16" height="2" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  );
}
