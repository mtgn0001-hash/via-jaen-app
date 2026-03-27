"use client"

import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@/lib/store";
import { translations, Language } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Send, Bot, Volume2 } from "lucide-react";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  text: string;
  options: { label: string; next: string; link?: string }[];
};

const getTree = (lang: Language): Record<string, Node> => {
  const labels = {
    legal: lang === 'es' ? 'Papeles / Cita' : lang === 'en' ? 'Papers / Appt' : lang === 'fr' ? 'Papiers' : lang === 'ar' ? 'أوراق' : 'Документи',
    work: lang === 'es' ? 'Trabajo / Olivar' : lang === 'en' ? 'Work' : lang === 'fr' ? 'Travail' : lang === 'ar' ? 'عمل' : 'Робота',
    health: lang === 'es' ? 'Salud / Médico' : lang === 'en' ? 'Health' : lang === 'fr' ? 'Santé' : lang === 'ar' ? 'صحة' : 'Здоров\'я',
  };

  return {
    start: {
      id: 'start',
      text: translations[lang].botWelcome,
      options: [
        { label: labels.legal, next: 'legal' },
        { label: labels.work, next: 'work' },
        { label: labels.health, next: 'health' }
      ]
    },
    legal: {
      id: 'legal',
      text: lang === 'es' ? '¿Qué trámite legal necesitas?' : 'Which legal procedure do you need?',
      options: [
        { label: 'NIE/TIE', next: 'start' },
        { label: 'Padron', next: 'start' }
      ]
    },
    work: {
      id: 'work',
      text: lang === 'es' ? '¿Buscas trabajo en la aceituna?' : 'Are you looking for work in the olive harvest?',
      options: [
        { label: 'Info', next: 'start' }
      ]
    },
    health: {
      id: 'health',
      text: lang === 'es' ? 'Necesitas la tarjeta sanitaria.' : 'You need a health card.',
      options: [
        { label: 'OK', next: 'start' }
      ]
    }
  };
};

export function JaenBot({ lang }: { lang: Language }) {
  const { progress } = useLocalStorage();
  const t = translations[lang] || translations.es;
  const tree = getTree(lang);
  
  const [history, setHistory] = useState<string[]>(['start']);
  const currentNodeId = history[history.length - 1];
  const node = tree[currentNodeId] || tree.start;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (progress.accessibilityMode === 'accessible' || progress.easyReading) {
      speakText(node.text);
    }
  }, [history, lang, node.text]);

  const speakText = async (text: string) => {
    setIsSpeaking(true);
    try {
      const response = await textToSpeech({ text, language: lang as any });
      const audio = new Audio(response.media);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (e) {
      console.error("Bot TTS Error:", e);
      setIsSpeaking(false);
    }
  };

  const handleOption = (next: string, link?: string) => {
    if (link) window.open(link, '_blank');
    if ('vibrate' in navigator) navigator.vibrate(50);
    setHistory([...history, next]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-lg mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="space-y-1">
        <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.botTitle}</h3>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t.botSubtitle}</p>
      </div>

      <Card className="border-none bg-card/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[500px]">
        <div className="p-4 bg-primary text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-xl">
               {isSpeaking ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Bot className="h-5 w-5" />}
             </div>
             <span className="font-black text-xs uppercase tracking-widest">{t.botTitle}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setHistory(['start'])} 
            className="text-white hover:bg-white/10 rounded-full"
            aria-label="Reiniciar conversación"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {history.map((id, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="flex items-start gap-3">
                 <div className="bg-primary/10 p-2 rounded-full mt-1">
                   <Bot className="h-3 w-3 text-primary" />
                 </div>
                 <div className="bg-card p-4 rounded-2xl rounded-tl-none shadow-sm text-sm font-black text-foreground border-2">
                    {tree[id]?.text || t.botWelcome}
                 </div>
               </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="p-6 bg-background/80 border-t space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {node.options.map((opt) => (
              <Button 
                key={opt.label} 
                variant="outline"
                onClick={() => handleOption(opt.next, opt.link)}
                className="h-14 rounded-2xl justify-between px-6 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 group active:scale-95 transition-all"
                aria-label={`Opción: ${opt.label}`}
              >
                <span className="font-black text-sm uppercase tracking-tight">{opt.label}</span>
                <Send className={cn("h-4 w-4 text-primary opacity-40 group-hover:opacity-100 transition-all", lang === 'ar' && "rotate-180")} />
              </Button>
            ))}
          </div>
          
          {history.length > 1 && (
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              className="w-full h-10 text-[10px] font-black uppercase tracking-widest gap-2 text-muted-foreground hover:text-primary"
              aria-label="Volver al mensaje anterior"
            >
              <ArrowLeft className={cn("h-3 w-3", lang === 'ar' && "rotate-180")} /> 
              {lang === 'es' ? 'Volver' : 'Back'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}