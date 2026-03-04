
"use client"

import { useState } from "react";
import { Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { useToast } from "@/hooks/use-toast";

type SpeechButtonProps = {
  text: string;
  language?: string;
  variant?: "ghost" | "outline" | "secondary" | "default";
  size?: "sm" | "icon" | "default";
};

export function SpeechButton({ text, language = "es", variant = "ghost", size = "icon" }: SpeechButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSpeak = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await textToSpeech({ 
        text, 
        language: language as any 
      });
      const audio = new Audio(response.media);
      audio.play();
    } catch (error) {
      console.error("TTS failed:", error);
      toast({
        variant: "destructive",
        title: "Error de audio",
        description: "No se pudo generar el audio en este momento."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleSpeak}
      disabled={loading}
      className="rounded-full h-8 w-8 p-0"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}
