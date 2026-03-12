
"use client"

import { useState, useEffect, useRef } from "react";
import { Language, translations } from "@/lib/translations";
import { useLocalStorage } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft, RefreshCw, Send, User, Bot, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { textToSpeech } from "@/ai/flows/tts-flow";

type Node = {
  id: string;
  text: string;
  options: { label: string; next: string; link?: string }[];
};

const tree: Record<string, Node> = {
  start: {
    id: 'start',
    text: '¿En qué te puedo ayudar hoy en Jaén?',
    options: [
      { label: 'Papeles / Cita', next: 'legal' },
      { label: 'Trabajo / Olivar', next: 'work' },
      { label: 'Salud / Médico', next: 'health' }
    ]
  },
  legal: {
    id: 'legal',
    text: '¿Qué trámite legal necesitas?',
    options: [
      { label: 'Pedir NIE/TIE', next: 'tie_info' },
      { label: 'Empadronamiento', next: 'padron_info' },
      { label: 'Asilo / Protección', next: 'asylum_info' }
    ]
  },
  tie_info: {
    id: 'tie_info',
    text: 'Para el TIE necesitas cita en Comisaría. Los viernes a las 9 AM es el mejor momento para probar.',
    options: [
      { label: 'Ir a Cita Previa', next: 'start', link: 'https://icp.administracionelectronica.gob.es/icpco/index.html' },
      { label: 'Ver Documentos', next: 'start' }
    ]
  },
  work: {
    id: 'work',
    text: '¿Buscas trabajo en la aceituna?',
    options: [
      { label: 'Campaña Olivar', next: 'olive_info' },
      { label: 'Otros trabajos', next: 'other_work' }
    ]
  },
  health: {
    id: 'health',
    text: 'Para salud en Jaén, necesitas la tarjeta sanitaria del SAS.',
    options: [
      { label: 'Pedir Tarjeta', next: 'start', link: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/' },
      { label: 'Urgencias Jaén', next: 'start' }
    ]
  },
  olive_info: {
    id: 'olive_info',
    text: 'La campaña empieza en Noviembre. Te recomiendo contactar con Jaén Acoge.',
    options: [
      { label: 'Ver Albergues', next: 'start' },
      { label: 'Derechos Laborales', next: 'start' }
    ]
  }
};

export function JaenBot({ lang }: { lang: Language }) {
  const t = translations[lang].bot;
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;
  const [history, setHistory] = useState<string[]>(['start']);
  const currentNodeId = history[history.length - 1];
  const node = tree[currentNodeId] || tree.start;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (accMode === 'auditory') {
      speakText(node.text);
    }
  }, [history, accMode]);

  const speakText = async (text: string) => {
    setIsSpeaking(true);
    try {
      const response = await textToSpeech({ text, language: lang as any });
      const audio = new Audio(response.media);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (e) {
      console.error(e);
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
    <div className="space-y-6 pb-20 max-w-lg mx-auto">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.title}</h3>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t.subtitle}</p>
      </div>

      <Card className="border-none bg-slate-50/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[500px]">
        <div className="p-4 bg-primary text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-xl">
               {isSpeaking ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Bot className="h-5 w-5" />}
             </div>
             <span className="font-black text-xs uppercase tracking-widest">Asistente Virtual</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setHistory(['start'])} className="text-white hover:bg-white/10 rounded-full" aria-label="Reiniciar chat">
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
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm font-medium text-slate-800 border">
                    {tree[id]?.text || t.welcome}
                 </div>
               </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="p-6 bg-white/80 border-t space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {node.options.map((opt) => (
              <Button 
                key={opt.label} 
                variant="outline"
                onClick={() => handleOption(opt.next, opt.link)}
                className="h-12 rounded-2xl justify-between px-4 border-2 border-primary/10 hover:border-primary hover:bg-primary/5 group"
                aria-label={`Opción: ${opt.label}`}
              >
                <span className="font-bold text-xs uppercase tracking-tight">{opt.label}</span>
                <Send className="h-4 w-4 text-primary opacity-20 group-hover:opacity-100 transition-all" />
              </Button>
            ))}
          </div>
          
          {history.length > 1 && (
            <Button variant="ghost" onClick={handleBack} className="w-full text-[10px] font-black uppercase tracking-widest gap-2 text-muted-foreground" aria-label="Volver atrás">
              <ArrowLeft className="h-3 w-3" /> {t.back}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
