
"use client"

import { Share2, Info, Mic, MapPin, WifiOff, Cloud } from "lucide-react";
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

  const currentProvince = provincesData[progress.province] || provincesData.jaen;

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 px-4 py-3 border-b border-border/50">
      <div className="flex justify-between items-center max-w-lg mx-auto mb-3">
        <div className="flex items-center gap-1">
          <SidebarTrigger className="mr-2 h-10 w-10 text-primary hover:bg-primary/10 rounded-xl" />
          <h1 className="font-headline font-black text-xl tracking-tighter text-primary uppercase">
            {t.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isOffline ? (
            <Badge variant="outline" className="h-10 rounded-xl px-3 flex items-center gap-2 border-orange-200 bg-orange-50 text-orange-700 font-bold text-[10px]">
              <WifiOff className="h-3 w-3" /> OFFLINE
            </Badge>
          ) : (
            <Badge variant="outline" className="h-10 rounded-xl px-3 flex items-center gap-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-[10px]">
              <Cloud className="h-3 w-3" /> ONLINE
            </Badge>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-primary/10 h-10 w-10"
            onClick={handleVoiceCommand}
          >
            <Mic className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto space-y-3">
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

      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </header>
  );
}
