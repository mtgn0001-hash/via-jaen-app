
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
  ExternalLink, 
  Plus, 
  Smartphone,
  Play,
  Stethoscope,
  HeartPulse
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";

export function HealthHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  const centers = [
    { name: "C.S. Las Fuentezuelas", phone: "953 31 15 30" },
    { name: "C.S. San Felipe", phone: "953 31 15 00" },
    { name: "C.S. El Valle", phone: "953 31 15 15" },
    { name: "C.S. Belén", phone: "953 31 15 45" }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-red-600 uppercase tracking-tighter">Salud</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Exclusivo: Citas y Urgencias</p>
        </div>
        <SpeechButton text="Portal de Salud. Gestión exclusiva de citas y urgencias en Jaén." language={lang} />
      </div>

      {/* BLOQUE URGENCIAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-none bg-destructive text-white rounded-3xl shadow-xl overflow-hidden relative group">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase">24H</Badge>
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight">112</h4>
            <Button 
              onClick={() => handleCall("112")}
              className="w-full h-10 rounded-xl bg-white text-destructive hover:bg-white/90 font-black text-xs"
            >
              LLAMAR AHORA
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none bg-slate-900 text-white rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="bg-white/10 p-2 rounded-xl">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
              <Badge className="bg-red-500/20 text-red-500 border-none text-[8px] font-black uppercase">CAPITAL</Badge>
            </div>
            <h4 className="text-xs font-black uppercase tracking-tight">Hosp. Médico-Quirúrgico</h4>
            <Button 
              onClick={() => handleCall("953 00 80 00")}
              className="w-full h-10 rounded-xl bg-red-600 text-white font-black text-[10px] hover:bg-red-700"
            >
              953 00 80 00
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* FARMACIAS Y CITA */}
      <div className="grid grid-cols-1 gap-3">
        <Button 
          asChild
          className="h-16 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl"
        >
          <a href={OFFICIAL_LINKS.salud.farmaciasGuardia} target="_blank">
            <span>Farmacias de Guardia</span>
            <Plus className="h-5 w-5" />
          </a>
        </Button>

        <Button 
          asChild
          className="h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl"
        >
          <a href={OFFICIAL_LINKS.salud.clicSalud} target="_blank">
            <span>Cita Médica - ClicSalud+</span>
            <ExternalLink className="h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* CENTROS LOCALES */}
      <section className="space-y-3 pt-2">
        <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-2 flex items-center gap-2">
          <Smartphone className="h-3 w-3" /> Teléfonos Directos Jaén
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {centers.map(center => (
            <button 
              key={center.name}
              onClick={() => handleCall(center.phone)}
              className="p-4 rounded-2xl bg-white/50 hover:bg-red-50 border border-red-100 transition-all flex flex-col items-start gap-1 active:scale-95 text-left"
            >
              <p className="text-[10px] font-black text-slate-800 uppercase leading-none">{center.name}</p>
              <p className="text-[9px] font-bold text-red-600">{center.phone}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ACCESIBILIDAD LSE */}
      {accMode === 'accessible' && (
        <section className="bg-red-50 p-6 rounded-[2.5rem] border-2 border-red-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-xs uppercase text-red-900 flex items-center gap-2">
              <Play className="h-4 w-4" /> Salud en LSE
            </h4>
            <SpeechButton text="Cómo pedir cita médica y solicitar intérprete de lengua de signos en el hospital." language={lang} />
          </div>
          <p className="text-[10px] text-red-800 font-bold leading-normal">
            Este video explica exclusivamente cómo usar los servicios de salud y el derecho a intérprete en los hospitales de Jaén.
          </p>
        </section>
      )}
    </div>
  );
}
