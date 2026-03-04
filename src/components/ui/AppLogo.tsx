
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
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full bg-white shadow-sm overflow-hidden",
        variant === "white" ? "bg-white/10" : "bg-white",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-3/4 h-3/4", colors[variant])}
      >
        {/* Silueta Estilizada Catedral de Jaén - Estética 2026 */}
        {/* Torre Izquierda */}
        <path d="M22 80V35L36 28V80H22Z" fill="currentColor" />
        {/* Torre Derecha */}
        <path d="M64 80V28L78 35V80H64Z" fill="currentColor" />
        {/* Cuerpo Central */}
        <path d="M36 80V42C36 35 42 30 50 30C58 30 64 35 64 42V80H36Z" fill="currentColor" />
        {/* Detalle Rosetón Abstracto */}
        <circle cx="50" cy="45" r="4" fill="white" fillOpacity="0.3" />
        {/* Base Sólida */}
        <path d="M20 80H80V85H20V80Z" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
