
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
        className={cn("w-2/3 h-2/3", colors[variant])}
      >
        {/* Silueta ultra-minimalista de la Catedral de Jaén */}
        {/* Un diseño de tres bloques esenciales: dos torres y arco central */}
        <path 
          d="M20 80V30H35V80H20Z M65 80V30H80V80H65Z M35 80V45C35 37 42 32 50 32C58 32 65 37 65 45V80H35Z" 
          fill="currentColor" 
        />
      </svg>
    </div>
  );
}
