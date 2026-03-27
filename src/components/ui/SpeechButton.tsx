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
      document.querySelectorAll('.speech-highlight').forEach(el => el.classList.remove('speech-highlight'));
      return;
    }

    // Preparar texto con pausas gramaticales
    // Usamos puntuación para forzar pausas naturales
    const processedText = text
      .replace(/\. /g, '. ... ') // Pausa larga tras punto
      .replace(/, /g, ', .. ');   // Pausa corta tras coma

    const utterance = new SpeechSynthesisUtterance(processedText);
    
    // Map language to synthesis codes
    const langMap: Record<string, string> = {
      es: 'es-ES',
      en: 'en-GB',
      fr: 'fr-FR',
      ar: 'ar-SA',
      uk: 'uk-UA'
    };
    
    utterance.lang = langMap[currentLang] || 'es-ES';
    
    // Calibración de Calidad
    utterance.rate = progress.speechRate || 0.9; 
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Selección de voz premium si está disponible
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith(utterance.lang) && 
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      // Intentar encontrar el contenedor padre para resaltarlo
      const parentCard = document.querySelector(`[aria-label*="${text.substring(0, 20)}"]`) || 
                         document.activeElement?.closest('.card, section, div');
      if (parentCard) parentCard.classList.add('speech-highlight');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      document.querySelectorAll('.speech-highlight').forEach(el => el.classList.remove('speech-highlight'));
      
      // Notificación de cierre con pausa
      setTimeout(() => {
        const endMsg = currentLang === 'es' ? 'Fin de la información.' :
                       currentLang === 'en' ? 'End of information.' :
                       'End.';
        const endUtterance = new SpeechSynthesisUtterance(endMsg);
        endUtterance.lang = langMap[currentLang] || 'es-ES';
        endUtterance.rate = progress.speechRate || 0.9;
        window.speechSynthesis.speak(endUtterance);
      }, 500);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      document.querySelectorAll('.speech-highlight').forEach(el => el.classList.remove('speech-highlight'));
    };

    window.speechSynthesis.speak(utterance);
  };

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
