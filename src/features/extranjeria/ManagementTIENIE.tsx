"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, MapPin, Zap, Info, Loader2 } from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";

export function ManagementTIENIE() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunch = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1000);
  };

  return (
    <Card className="border-none bg-primary shadow-2xl rounded-[3rem] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-10">
         <Zap className="h-32 w-32 text-white" />
      </div>
      
      <CardContent className="p-8 space-y-6 relative z-10">
        <div className="space-y-2">
          <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none">Gestión TIE y NIE</h3>
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <MapPin className="h-3 w-3" /> Plaza de las Batallas (Jaén)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button 
            onClick={() => handleLaunch(OFFICIAL_LINKS.extranjeria.ex15)}
            className="h-16 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl active:scale-95 transition-all"
          >
            <span>Solicitar / Renovar NIE (EX-15)</span>
            <FileText className="h-5 w-5" />
          </Button>

          <Button 
            onClick={() => handleLaunch(OFFICIAL_LINKS.extranjeria.citaPrevia)}
            className="h-16 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md font-black text-sm uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all"
          >
            <span>Tarjeta TIE (Huellas/Recogida)</span>
            <ExternalLink className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl flex gap-3 items-center">
          <Info className="h-5 w-5 text-white shrink-0" />
          <p className="text-[10px] text-white font-bold leading-tight">
            Recuerda: Si no encuentras cita online, acude presencialmente a la Comisaría de la Plaza de las Batallas para consultar.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
