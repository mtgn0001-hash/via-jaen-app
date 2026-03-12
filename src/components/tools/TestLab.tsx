
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Volume2, Smartphone, Eye, Beaker } from "lucide-react";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export function TestLab({ lang }: { lang: Language }) {
  const t = translations[lang].testLab || { title: "Test Lab", subtitle: "Experimental features" };
  const { toast } = useToast();
  const [customText, setCustomText] = useState("Hola Jaén, probando el laboratorio.");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const testVibration = (pattern: number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
      toast({ 
        title: "Feedback Háptico", 
        description: `Vibración enviada: [${pattern.join(', ')}ms]` 
      });
    } else {
      toast({ 
        variant: "destructive", 
        title: "No compatible", 
        description: "Tu navegador o dispositivo no soporta vibración." 
      });
    }
  };

  const handleSpeak = async () => {
    if (!customText.trim()) return;
    setIsSpeaking(true);
    try {
      const response = await textToSpeech({ 
        text: customText, 
        language: lang as any 
      });
      const audio = new Audio(response.media);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (e) {
      setIsSpeaking(false);
      toast({ 
        variant: "destructive", 
        title: "Error TTS", 
        description: "No se pudo generar la síntesis de voz." 
      });
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.title}</h3>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t.subtitle}</p>
      </div>

      <div className="grid gap-6">
        {/* Audio Lab */}
        <Card className="border-none bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl overflow-hidden border-2 border-primary/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3.5 rounded-2xl shadow-inner">
                <Volume2 className="h-7 w-7 text-primary" />
              </div>
              <h4 className="font-black text-sm uppercase tracking-tighter">{t.voiceLab}</h4>
            </div>
            
            <div className="space-y-4">
              <Input 
                value={customText} 
                onChange={(e) => setCustomText(e.target.value)}
                className="rounded-2xl h-14 border-none bg-slate-50 font-bold text-lg focus:ring-2 focus:ring-primary/20"
                placeholder={t.placeholder}
              />
              <Button 
                onClick={handleSpeak} 
                disabled={isSpeaking} 
                className="w-full h-14 rounded-2xl font-black text-md gap-3 shadow-lg shadow-primary/20"
              >
                {isSpeaking ? (
                  <Zap className="h-6 w-6 animate-pulse text-yellow-300" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
                {t.speakBtn}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Haptic Lab */}
        <Card className="border-none bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl overflow-hidden border-2 border-primary/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3.5 rounded-2xl shadow-inner">
                <Smartphone className="h-7 w-7 text-primary" />
              </div>
              <h4 className="font-black text-sm uppercase tracking-tighter">{t.hapticLab}</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => testVibration([50])} 
                className="rounded-[1.5rem] h-16 text-xs font-black uppercase border-2 hover:bg-primary/5 active:scale-95"
              >
                {t.vibrateShort}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => testVibration([100, 50, 100])} 
                className="rounded-[1.5rem] h-16 text-xs font-black uppercase border-2 hover:bg-primary/5 active:scale-95"
              >
                {t.vibrateDouble}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visual Lab Placeholder */}
        <Card className="border-none bg-slate-900 text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <CardContent className="p-10 text-center space-y-4 relative z-10">
            <div className="bg-white/10 p-4 rounded-full inline-block mb-2">
              <Eye className="h-10 w-10 text-primary" />
            </div>
            <h4 className="font-black text-lg uppercase tracking-widest">{t.visualLab}</h4>
            <p className="text-[10px] text-white/60 font-medium uppercase tracking-[0.2em]">
              Próximamente: Filtros de daltonismo y simulación de baja visión 2026.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center opacity-10 py-10">
        <Beaker className="h-16 w-16 text-primary" />
      </div>
    </div>
  );
}
