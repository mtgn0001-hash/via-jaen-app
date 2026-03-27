"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
  HeartPulse,
  Navigation,
  Phone,
  Heart
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/store";

export function HealthHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  const suapCenters = [
    { 
      name: "SUAP BULEVAR (URGENCIAS)", 
      address: "C.S. LAS FUENTEZUELAS, JAÉN",
      phone: "953 31 15 30",
      map: "Urgencias Bulevar Jaén"
    },
    { 
      name: "SUAP FELIPE ARCHE (URGENCIAS)", 
      address: "C.S. SAN FELIPE, JAÉN",
      phone: "953 31 15 00",
      map: "Centro de Salud San Felipe Jaén"
    }
  ];

  const handleCall = (number: string) => {
    if ('vibrate' in navigator) navigator.vibrate(number === '112' ? [200, 50, 200, 50, 200] : 100);
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  const handleNavigate = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500", isAccessible && "space-y-16")}>
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-[#1A1A1B] uppercase tracking-tighter", isAccessible && "text-5xl")}>SALUD Y URGENCIAS</h3>
          <p className="text-[12px] text-[#1A1A1B] font-black uppercase tracking-widest">INFORMACIÓN CRÍTICA 24H EN JAÉN</p>
        </div>
        <SpeechButton 
          text="Sección Salud y Urgencias. Aquí encontrarás el botón de emergencias 112, hospitales principales y centros de urgencia en Jaén. Puedes llamar directamente o ver la ruta en el mapa." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      {/* 1. BOTÓN DE PÁNICO 112 CON PULSO VITAL */}
      <div className="relative group">
        <Button 
          onClick={() => handleCall("112")}
          className={cn(
            "w-full h-36 rounded-[2rem] bg-destructive text-white border-4 border-white shadow-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all relative overflow-hidden animate-emergency-pulse",
            isAccessible && "h-56 rounded-none border-8"
          )}
          aria-label="Botón de emergencia: Llamar al 112 ahora mismo"
        >
          <ShieldAlert className={cn("h-14 w-14 text-white", isAccessible && "h-24 w-24")} />
          <span className={cn("text-4xl font-black uppercase tracking-tighter text-shadow-strong", isAccessible && "text-6xl")}>LLAMAR AL 112</span>
          <span className={cn("text-[14px] font-black", isAccessible && "text-2xl")}>EMERGENCIAS ANDALUCÍA</span>
        </Button>
      </div>

      {/* 2. HOSPITALES PRINCIPALES */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[14px] font-black uppercase text-[#1A1A1B] tracking-widest ml-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600 fill-red-600" /> HOSPITALES UNIVERSITARIOS
          </h4>
          <SpeechButton text="Hospital Universitario de Jaén y Hospital Médico-Quirúrgico. Ambos cuentan con servicios de urgencias resaltados." language={lang} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {[
            { name: "HOSP. UNIVERSITARIO", loc: "AV. DE MADRID, JAÉN", tel: "953 00 80 00", badge: "URGENCIAS 24H", query: "Hospital Universitario de Jaén Av. de Madrid" },
            { name: "HOSP. MÉDICO-QUIRÚRGICO", loc: "CARRETERA DE MADRID, JAÉN", tel: "953 00 80 00", badge: "TRAUMA / REHAB", query: "Hospital Neurotraumatológico Jaén Carretera de Madrid" }
          ].map((hosp) => (
            <Card key={hosp.name} className={cn("border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden border-2 border-slate-200", isAccessible && "rounded-none border-4")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className={cn("text-3xl font-black text-[#1A1A1B] uppercase leading-tight", isAccessible && "text-5xl")}>{hosp.name}</h4>
                    <p className={cn("text-md font-bold text-[#1A1A1B] flex items-center gap-1", isAccessible && "text-2xl mt-4")}>
                      <MapPin className="h-4 w-4 text-red-600" /> {hosp.loc}
                    </p>
                  </div>
                  <Badge className="bg-red-600 text-white font-black text-[10px] px-4 py-2 animate-emergency-pulse">{hosp.badge}</Badge>
                </div>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", isAccessible && "grid-cols-1 gap-6")}>
                  <Button 
                    onClick={() => handleCall(hosp.tel)}
                    variant="outline"
                    className={cn("h-16 rounded-2xl border-2 border-slate-900 text-[#1A1A1B] font-black gap-2 text-xl", isAccessible && "h-24 text-3xl")}
                  >
                    <Phone className={cn("h-6 w-6", isAccessible && "h-10 w-10")} /> LLAMAR
                  </Button>
                  <Button 
                    onClick={() => handleNavigate(hosp.query)}
                    className={cn("h-16 rounded-2xl font-black gap-3 shadow-lg text-xl", isAccessible && "h-24 text-3xl")}
                  >
                    <Navigation className={cn("h-6 w-6", isAccessible && "h-10 w-10")} /> NAVEGAR
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. URGENCIAS ATENCIÓN PRIMARIA (SUAP) */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[14px] font-black uppercase text-[#1A1A1B] tracking-widest ml-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-600" /> URGENCIAS PRIMARIA (SUAP)
          </h4>
          <SpeechButton text="Centros de Urgencias de Atención Primaria en Bulevar y Felipe Arche." language={lang} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {suapCenters.map(center => (
            <Card key={center.name} className={cn("border-none bg-white border-2 border-slate-200 rounded-[2.5rem] overflow-hidden shadow-lg", isAccessible && "rounded-none border-4")}>
              <CardContent className="p-8 space-y-6">
                <h5 className={cn("font-black text-2xl text-[#1A1A1B] uppercase leading-tight", isAccessible && "text-4xl")}>{center.name}</h5>
                <p className="text-[12px] font-bold text-[#1A1A1B] leading-tight uppercase opacity-70">
                  {center.address}
                </p>
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => handleCall(center.phone)}
                    variant="outline"
                    className={cn("w-full bg-slate-50 text-[#1A1A1B] border-2 border-slate-900 rounded-2xl font-black h-16 text-xl", isAccessible && "h-24 text-3xl")}
                  >
                    TEL: {center.phone}
                  </Button>
                  <Button 
                    onClick={() => handleNavigate(center.map)}
                    className={cn("w-full rounded-2xl font-black h-16 text-xl gap-2 shadow-md", isAccessible && "h-24 text-3xl")}
                  >
                    <Navigation className="h-5 w-5" /> VER MAPA
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. GESTIÓN DE CITAS */}
      <section className="space-y-4">
        <h4 className="text-[14px] font-black uppercase text-[#1A1A1B] tracking-widest ml-4 flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-red-600" /> CITAS Y PRESTACIONES SAS
        </h4>
        <div className="grid grid-cols-1 gap-4">
          <ResourceLauncher 
            title="CITA MÉDICA - CLICSALUD+"
            description="Solicita cita con tu médico de cabecera en Jaén a través del portal oficial del SAS."
            url={OFFICIAL_LINKS.salud.clicSalud}
            triggerLabel="PEDIR CITA ONLINE"
            variant="primary"
            lang={lang}
          />
        </div>
      </section>
    </div>
  );
}
