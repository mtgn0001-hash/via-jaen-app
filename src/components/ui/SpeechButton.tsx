"use client"

import { useState, useEffect } from "react";
import { Volume2, Loader2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/lib/store";

type SpeechButtonProps = {
  text: string;
  language?: string;
  variant?: "ghost" | "outline" | "secondary" | "default";
  size?: "sm" | "icon" | "default";
  className?: string;
};

export function SpeechButton({ text, language, variant = "ghost", size = "icon", className }: SpeechButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  
  const currentLang = language || progress.language || 'es';
  const isAccessible = progress.accessibilityMode === 'accessible';

  // Use Web Speech API for faster response and "Fin de información" logic
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      toast({
        variant: "destructive",
        title: "No compatible",
        description: "Tu navegador no soporta síntesis de voz."
      });
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language to synthesis codes
    const langMap: Record<string, string> = {
      es: 'es-ES',
      en: 'en-GB',
      fr: 'fr-FR',
      ar: 'ar-SA',
      uk: 'uk-UA'
    };
    
    utterance.lang = langMap[currentLang] || 'es-ES';
    utterance.rate = 0.9; // Slightly slower for clarity

    utterance.onstart = () => {
      setIsPlaying(true);
      // Logic to highlight parent or associated text could go here via a global event if needed
    };

    utterance.onend = () => {
      setIsPlaying(false);
      
      // Closing notification logic
      const endMsg = currentLang === 'es' ? 'Fin de la información. ¿Deseas volver al menú principal?' :
                     currentLang === 'en' ? 'End of information. Do you want to return to the main menu?' :
                     'End of information.';
      
      const endUtterance = new SpeechSynthesisUtterance(endMsg);
      endUtterance.lang = langMap[currentLang] || 'es-ES';
      window.speechSynthesis.speak(endUtterance);
    };

    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // Only show if accessible mode is on, or as a manual toggle
  if (!isAccessible && variant === "ghost") return null;

  return (
    <Button 
      variant={isPlaying ? "default" : variant} 
      size={size} 
      onClick={(e) => {
        e.stopPropagation();
        handleSpeak();
      }}
      className={`rounded-full shadow-lg transition-all active:scale-90 ${isPlaying ? 'animate-pulse ring-4 ring-yellow-400' : ''} ${className}`}
      aria-label={isPlaying ? "Detener lectura" : "Escuchar esta sección en voz alta"}
    >
      {isPlaying ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
}