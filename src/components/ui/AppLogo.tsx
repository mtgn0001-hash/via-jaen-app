
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

  const strokeColors = {
    default: "text-primary",
    white: "text-white",
    minimal: "text-primary",
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
      {/* Efecto de brillo de fondo para hacerlo "llamativo" */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("relative z-10 transition-all duration-500 group-hover:scale-110", strokeColors[variant])}
        style={{ width: size * 0.7, height: size * 0.7 }}
      >
        {/* Silueta Técnica de la Catedral de Jaén */}
        
        {/* Estructura Base y Fachada */}
        <path 
          d="M20 85V30H32V15H42V30H48V85M80 85V30H68V15H58V30H52V85M48 85V40H52V85" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        
        {/* Detalles Geométricos de las Torres (Arquitectura Recta) */}
        <path d="M24 40H28M72 40H76" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.6" />
        <path d="M24 50H28M72 50H76" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.4" />
        <path d="M24 60H28M72 60H76" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.2" />
        
        {/* Frontón Central y Puerta */}
        <path d="M42 45H58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.5" />
        <path d="M45 85V75H55V85" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        
        {/* Línea de tierra con degradado de opacidad */}
        <path 
          d="M10 85H90" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="square"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
