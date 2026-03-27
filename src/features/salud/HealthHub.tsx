"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Stethoscope, 
  ShieldAlert, 
  Heart, 
  MapPin, 
  ExternalLink, 
  Plus, 
  Smartphone,
  Play,
  Volume2,
  Activity,
  Cross
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
    <div className="space-y-8 pb-24 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Recursos de Salud</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Servicios Médicos en Jaén</p>
      </div>

      {/* BLOQUE URGENCIAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none bg-destructive text-white rounded-[2.5rem] shadow-xl overflow-hidden relative group">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-3 rounded-2xl">
                <ShieldAlert className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-none text-[10px] font-black uppercase tracking-widest">24 HORAS</Badge>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Urgencias 112</h3>
              <p className="text-[10px] opacity-80 font-bold uppercase mt-1">Llamada Gratuita Nacional</p>
            </div>
            <Button 
              onClick={() => handleCall("112")}
              className="w-full h-14 rounded-2xl bg-white text-destructive hover:bg-white/90 font-black text-lg gap-3"
            >
              <Phone className="h-6 w-6" /> LLAMAR AHORA
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none bg-slate-900 text-white rounded-[2.5rem] shadow-xl overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-white/10 p-3 rounded-2xl">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black uppercase tracking-widest">JAÉN CAPITAL</Badge>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Hosp. Médico-Quirúrgico</h3>
              <p className="text-[10px] opacity-60 font-bold uppercase mt-1">Urgencias Hospitalarias</p>
            </div>
            <Button 
              onClick={() => handleCall("953 00 80 00")}
              className="w-full h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-lg gap-3 shadow-lg shadow-primary/20"
            >
              <Phone className="h-6 w-6" /> 953 00 80 00
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* FARMACIAS DE GUARDIA */}
      <Button 
        asChild
        className="w-full h-20 rounded-[2.5rem] bg-emerald-600 text-white hover:bg-emerald-700 font-black text-lg uppercase tracking-tighter flex justify-between px-8 active:scale-95 transition-all shadow-xl"
      >
        <a href={OFFICIAL_LINKS.salud.farmaciasGuardia} target="_blank">
          <span>Farmacias de Guardia</span>
          <div className="bg-white/20 p-3 rounded-full">
            <Plus className="h-6 w-6" />
          </div>
        </a>
      </Button>

      {/* SISTEMA PÚBLICO SAS */}
      <Card className="border-none bg-white/40 backdrop-blur-xl border-2 border-primary/10 rounded-[3rem] overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-primary text-2xl font-black uppercase tracking-tighter leading-none">Sistema Público SAS</h3>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Servicio Andaluz de Salud</p>
            </div>
            <Activity className="h-8 w-8 text-primary opacity-20" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button 
              asChild
              className="h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl active:scale-95 transition-all"
            >
              <a href={OFFICIAL_LINKS.salud.clicSalud} target="_blank">
                <span>Cita Médica - ClicSalud+</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              asChild
              className="h-16 rounded-2xl bg-white/60 hover:bg-white text-primary border border-primary/20 backdrop-blur-md font-black text-sm uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all shadow-sm"
            >
              <a href={OFFICIAL_LINKS.salud.appSaludResponde} target="_blank">
                <span>App Salud Responde</span>
                <Smartphone className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="space-y-3 pt-4 border-t border-primary/10">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Phone className="h-3 w-3" /> Teléfonos Directos Centros Jaén
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {centers.map(center => (
                <button 
                  key={center.name}
                  onClick={() => handleCall(center.phone)}
                  className="p-4 rounded-2xl bg-white/50 hover:bg-primary/5 border border-primary/5 transition-all flex items-center justify-between group active:scale-95"
                  aria-label={`Llamar a ${center.name}`}
                >
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{center.name}</p>
                    <p className="text-[10px] font-bold text-primary">{center.phone}</p>
                  </div>
                  <Phone className="h-4 w-4 text-primary opacity-20 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BIENESTAR Y SALUD MENTAL */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight ml-2">Salud Mental y Bienestar</h3>
        <Card className="border-none bg-purple-50 rounded-[2.5rem] shadow-none border border-purple-100 overflow-hidden">
          <CardContent className="p-6 flex items-center gap-6">
            <div className="bg-purple-500 p-4 rounded-3xl text-white shadow-lg">
              <Heart className="h-8 w-8" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-black text-lg uppercase text-purple-900 tracking-tighter leading-none">Apoyo Psicológico UJA</h4>
              <p className="text-[10px] text-purple-800/60 font-black uppercase">Para comunidad universitaria</p>
              <Button asChild size="sm" variant="outline" className="rounded-xl border-purple-200 text-purple-700 bg-white/50 h-9 font-bold">
                <a href={OFFICIAL_LINKS.uja.saludMental} target="_blank">Más Información</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ACCESIBILIDAD ADAPTADA */}
      {accMode === 'accessible' && (
        <section className="bg-blue-50 p-6 rounded-[2.5rem] border-2 border-blue-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-xs uppercase text-blue-900 flex items-center gap-2">
              <Play className="h-4 w-4" /> Salud en LSE
            </h4>
            <SpeechButton text="Cómo pedir cita médica y solicitar intérprete de lengua de signos en el hospital." language={lang} />
          </div>
          <p className="text-[10px] text-blue-800 font-bold leading-normal">
            En este video te explicamos cómo solicitar el servicio gratuito de intérprete de LSE en los hospitales de Jaén y cómo usar la web para pedir cita.
          </p>
        </section>
      )}
    </div>
  );
}
