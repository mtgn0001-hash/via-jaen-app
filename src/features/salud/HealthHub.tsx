
"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
  Navigation,
  Phone,
  Calendar,
  FolderHeart,
  Camera,
  Stethoscope,
  Info,
  LocateFixed
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/store";
import { ScannerSection } from "@/features/tramites/ScannerSection";
import { useToast } from "@/hooks/use-toast";

export function HealthHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  const isAccessible = progress.accessibilityMode === 'accessible';
  const isLite = progress.liteMode;

  const handleCall = (number: string) => {
    if ('vibrate' in navigator) navigator.vibrate(number === '112' ? [200, 50, 200, 50, 200] : 100);
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  const handleNavigate = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleWhereAmI = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        toast({
          title: "Ubicación Exacta",
          description: "Estás cerca de: Avda. de Madrid, Jaén. Facilita esta zona a emergencias.",
        });
      });
    }
  };

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500", isAccessible && "space-y-16")}>
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-slate-900 uppercase tracking-tighter", isAccessible && "text-5xl")}>Salud Jaén</h3>
          <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">Servicios Oficiales Junta de Andalucía</p>
        </div>
        <SpeechButton 
          text="Portal de Salud Jaén. Pulsa el primer botón para pedir cita médica en Salud Responde o el segundo para ver tus análisis en ClicSalud. Recuerda que para urgencias graves debes llamar al 112 o acudir al Hospital General." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      {/* UBICACIÓN DE SOPORTE */}
      <Button 
        onClick={handleWhereAmI}
        variant="outline"
        className="w-full h-12 rounded-2xl border-2 border-primary/20 text-primary font-black uppercase text-xs gap-2"
      >
        <LocateFixed className="h-4 w-4" /> ¿Dónde estoy exactamente?
      </Button>

      {/* 1. BOTÓN DE PÁNICO 112 */}
      <Button 
        onClick={() => handleCall("112")}
        className={cn(
          "w-full h-32 rounded-[2.5rem] bg-destructive text-white border-4 border-white shadow-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all",
          !isLite && "animate-emergency-pulse",
          isAccessible && "h-48 rounded-none border-8"
        )}
      >
        <ShieldAlert className={cn("h-12 w-12 text-white", isAccessible && "h-20 w-24")} />
        <span className={cn("text-3xl font-black uppercase tracking-tighter", isAccessible && "text-5xl")}>S.O.S 112</span>
        <span className={cn("text-[12px] font-bold opacity-90", isAccessible && "text-xl")}>EMERGENCIAS 24H</span>
      </Button>

      {/* 2. GESTIÓN OFICIAL */}
      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Calendar className="h-5 w-5 text-primary" /> Citas y Gestión
        </h4>

        <div className="grid grid-cols-1 gap-4">
          <Card className={cn("border-none bg-primary shadow-xl rounded-[2.5rem] overflow-hidden relative group", !isLite && "animate-emergency-pulse", isAccessible && "rounded-none border-4 border-primary")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Phone className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <h5 className="text-white text-2xl font-black uppercase tracking-tighter">Salud Responde</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={() => window.open(OFFICIAL_LINKS.salud.saludResponde, '_blank')}
                  className="h-16 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-lg active:scale-95 transition-all"
                >
                  <span>Pedir Cita Online</span>
                  <Calendar className="h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => handleCall(OFFICIAL_LINKS.salud.saludRespondeTelefono)}
                  className="h-16 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md font-black text-sm uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all"
                >
                  <span>Llamar: 955 54 50 60</span>
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={cn("border-none bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-black")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <FolderHeart className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <h5 className="text-white text-2xl font-black uppercase tracking-tighter">ClicSalud+</h5>
              <Button 
                onClick={() => window.open(OFFICIAL_LINKS.salud.clicSalud, '_blank')}
                className="w-full h-16 rounded-2xl bg-white text-slate-900 hover:bg-white/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-lg active:scale-95 transition-all"
              >
                <span>Mi Carpeta de Salud</span>
                <FolderHeart className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. ESCÁNER */}
      <section className="space-y-4">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Camera className="h-5 w-5 text-indigo-600" /> Escanear Tarjeta
        </h4>
        <Card className="border-4 border-dashed border-indigo-200 bg-indigo-50/50 rounded-[2.5rem] p-2">
           <ScannerSection />
        </Card>
      </section>

      {/* 4. HOSPITALES */}
      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Stethoscope className="h-5 w-5 text-red-600" /> Hospitales en Jaén
        </h4>
        
        <div className="grid grid-cols-1 gap-6">
          {[
            { 
              name: "Hospital Universitario", 
              loc: "Av. de Madrid, Jaén", 
              tel: "953 00 80 00", 
              badge: "General / Urgencias", 
              query: "Hospital Universitario de Jaén Av. de Madrid" 
            },
            { 
              name: "Hosp. Neurotraumatológico", 
              loc: "Carretera de Madrid, Jaén", 
              tel: "953 00 80 00", 
              badge: "Trauma / Rehabilitación", 
              query: "Hospital Neurotraumatológico Jaén Carretera de Madrid" 
            }
          ].map((hosp) => (
            <Card key={hosp.name} className={cn("border-none bg-white shadow-xl rounded-[2.5rem] border-2 border-slate-100", isAccessible && "rounded-none border-4 border-black")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className={cn("text-2xl font-black text-slate-900 uppercase tracking-tighter", isAccessible && "text-4xl")}>{hosp.name}</h4>
                    <p className={cn("text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase", isAccessible && "text-xl mt-2")}>
                      <MapPin className="h-4 w-4 text-red-600" /> {hosp.loc}
                    </p>
                  </div>
                  <Badge className="bg-red-50 text-red-600 border-red-100 font-black text-[10px] px-3 py-1">{hosp.badge}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleCall(hosp.tel)}
                    variant="outline"
                    className="h-14 rounded-xl border-2 border-slate-200 text-slate-900 font-black gap-2 text-xs uppercase"
                  >
                    <Phone className="h-4 w-4" /> Llamar
                  </Button>
                  <Button 
                    onClick={() => handleNavigate(hosp.query)}
                    className="h-14 rounded-xl font-black gap-2 shadow-md text-xs uppercase"
                  >
                    <Navigation className="h-4 w-4" /> Cómo llegar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="bg-amber-50 p-8 rounded-[3rem] border-2 border-amber-100 flex gap-4 items-center shadow-inner mx-2">
        <Info className="h-10 w-10 text-amber-600 shrink-0" />
        <p className="text-[12px] text-amber-900 font-black leading-tight uppercase">
          Si es una urgencia vital o accidente grave en Jaén, acude directamente al Hospital General o llama al 112. Tu salud es lo primero.
        </p>
      </div>
    </div>
  );
}
