
"use client"

import { Share2, Info, Mic, MapPin, WifiOff, Cloud, Zap } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QRCodeShare } from "@/components/ui/QRCodeShare";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  lang: Language;
  completion: number;
};

export function Header({ lang, completion }: HeaderProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();
  const [showQR, setShowQR] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    handleStatus();
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const handleVoiceCommand = () => {
    toast({
      title: "Asistente de Voz",
      description: "Dí una palabra clave como 'Trabajo', 'Salud' o 'Cita'.",
    });
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const isEasy = progress.easyReading;

  return (
    <header className={`sticky top-0 bg-white/80 backdrop-blur-xl z-40 px-4 border-b border-border/50 ${isEasy ? 'py-5' : 'py-3'}`}>
      <div className="flex justify-between items-center max-w-lg mx-auto mb-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className={`h-12 w-12 text-primary hover:bg-primary/10 rounded-2xl ${isEasy ? 'scale-110' : ''}`} />
          <div className="flex flex-col">
            <h1 className={`font-headline font-black tracking-tighter text-primary uppercase leading-none ${isEasy ? 'text-2xl' : 'text-xl'}`}>
              {t.title}
            </h1>
            {isEasy && <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Modo Fácil Activado</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEasy && (
            <>
              {isOffline ? (
                <Badge variant="outline" className="h-10 rounded-xl px-3 flex items-center gap-2 border-orange-200 bg-orange-50 text-orange-700 font-bold text-[10px]">
                  <WifiOff className="h-3 w-3" /> OFFLINE
                </Badge>
              ) : (
                <Badge variant="outline" className="h-10 rounded-xl px-3 flex items-center gap-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  <Cloud className="h-3 w-3" /> ONLINE
                </Badge>
              )}
            </>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full hover:bg-primary/10 ${isEasy ? 'h-12 w-12 bg-primary/5' : 'h-10 w-10'}`}
            onClick={handleVoiceCommand}
          >
            <Mic className={`${isEasy ? 'h-7 w-7' : 'h-5 w-5'} text-primary`} />
          </Button>
        </div>
      </div>
      
      {!isEasy && (
        <div className="max-w-lg mx-auto space-y-3 mt-3">
          <div className="bg-primary/5 px-3 py-2 rounded-2xl flex items-center gap-2 border border-primary/10">
            <Info className="h-3 w-3 text-primary" />
            <p className="text-[10px] font-bold text-primary/80 leading-none">
              {t.tipsDesc}
            </p>
          </div>

          <div className="px-1">
            <div className="flex justify-between items-end mb-1 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
              <span>{t.progress}</span>
              <span className="text-primary">{completion}%</span>
            </div>
            <Progress value={completion} className="h-1.5 rounded-full bg-primary/10" />
          </div>
        </div>
      )}

      {isEasy && (
        <div className="max-w-lg mx-auto flex items-center gap-2 mt-2">
           <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
           <p className="text-xs font-black text-primary uppercase tracking-tighter">Interfaz simplificada para ti</p>
        </div>
      )}

      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </header>
  );
}
