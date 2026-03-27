"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Youtube, 
  Globe, 
  Play,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Referent = {
  name: string;
  handle: string;
  spec: string;
  description: string;
  url: string;
  icon: any;
  platform: string;
  color: string;
  label: string;
};

export function CommunityReferents({ lang }: { lang: string }) {
  const [selectedRef, setSelectedRef] = useState<Referent | null>(null);

  const referents: Referent[] = [
    {
      name: "Hija de Inmigrantes",
      handle: "@hijadeinmigrantes",
      spec: "Identidad",
      label: "Identidad y Guía",
      description: "Referente en derechos, identidad y vivencias de las segundas generaciones en España. Ofrece una perspectiva real y necesaria.",
      url: OFFICIAL_LINKS.comunidad.hijaDeInmigrantes,
      icon: Instagram,
      platform: "Instagram",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Vicente Marín",
      handle: "Parainmigrantes",
      spec: "Leyes",
      label: "Abogado Experto",
      description: "Director de Parainmigrantes.info. Experto líder en trámites de extranjería, nacionalidad española y recursos legales.",
      url: OFFICIAL_LINKS.comunidad.vicenteMarin,
      icon: Youtube,
      platform: "YouTube",
      color: "bg-amber-100 text-amber-700"
    },
    {
      name: "Desirée Bela-Lobedde",
      handle: "@desireebela",
      spec: "Ayuda",
      label: "Activismo y Educación",
      description: "Escritora y activista. Su contenido se centra en la educación antirracista y el empoderamiento de la comunidad.",
      url: OFFICIAL_LINKS.comunidad.desireeBela,
      icon: Instagram,
      platform: "Instagram",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      name: "SOS Racismo",
      handle: "Federación",
      spec: "Leyes",
      label: "Denuncia Legal",
      description: "Organización dedicada a la lucha contra el racismo. Ofrecen apoyo legal y acompañamiento ante discriminaciones.",
      url: OFFICIAL_LINKS.comunidad.sosRacismo,
      icon: Globe,
      platform: "Web",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Quan Zhou",
      handle: "@gazpachoagridulce",
      spec: "Cultura",
      label: "Arte y Vivencias",
      description: "Ilustradora que narra la experiencia migrante desde el humor y el arte, ayudando a entender la dualidad cultural.",
      url: OFFICIAL_LINKS.comunidad.quanZhou,
      icon: Instagram,
      platform: "Instagram",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      name: "Safa El-Msaouri",
      handle: "@safaelmsaouri",
      spec: "Identidad",
      label: "Derechos Mujer",
      description: "Voz activa en la defensa de los derechos de las mujeres migrantes y la visibilidad de sus retos específicos.",
      url: OFFICIAL_LINKS.comunidad.safaElMsaouri,
      icon: Instagram,
      platform: "Instagram",
      color: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <section className="space-y-4 py-4">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-0.5">
          <h3 className="text-xl font-black text-[#1A1A1B] uppercase tracking-tighter flex items-center gap-2">
            Voces que te Guían
          </h3>
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest leading-none">
            Referentes de confianza en redes sociales
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SpeechButton 
            text="Sección Voces que te guían. Desliza para conocer referentes que apoyan a inmigrantes en redes sociales." 
            language={lang} 
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-2xl bg-primary/10 text-primary border border-primary/20"
            aria-label="Ver video en LSE sobre esta sección"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel className="w-full" opts={{ align: "start", dragFree: true }}>
        <CarouselContent className="-ml-3 px-2">
          {referents.map((ref) => (
            <CarouselItem key={ref.name} className="pl-3 basis-[160px]">
              <Card 
                className="border-none bg-white shadow-xl rounded-[2rem] overflow-hidden transition-all active:scale-95 cursor-pointer border-2 border-slate-100"
                onClick={() => setSelectedRef(ref)}
              >
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className={cn("p-3 rounded-full shadow-inner opacity-100", ref.color.split(' ')[0])}>
                    <ref.icon className={cn("h-6 w-6", ref.color.split(' ')[1])} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[13px] font-black text-[#1A1A1B] leading-tight line-clamp-1">{ref.name}</h4>
                    <Badge variant="secondary" className={cn("text-[9px] uppercase font-black px-2 py-0.5 border-none opacity-100", ref.color)}>
                      {ref.spec}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* DETALLE DEL REFERENTE (BOTTOM SHEET STYLE) */}
      <Dialog open={!!selectedRef} onOpenChange={() => setSelectedRef(null)}>
        <DialogContent className="sm:max-w-md rounded-t-[3rem] sm:rounded-[3rem] bg-white/95 backdrop-blur-2xl border-none shadow-2xl p-0 overflow-hidden outline-none">
          {selectedRef && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className={cn("p-10 flex flex-col items-center text-center gap-4", selectedRef.color.split(' ')[0])}>
                <div className="bg-white p-5 rounded-[2.5rem] shadow-xl">
                   <selectedRef.icon className={cn("h-10 w-10", selectedRef.color.split(' ')[1])} />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-3xl font-black text-[#1A1A1B] uppercase tracking-tighter">
                    {selectedRef.name}
                  </DialogTitle>
                  <p className="text-sm font-black opacity-80 uppercase tracking-widest text-slate-900">{selectedRef.handle}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h5 className="text-[11px] font-black uppercase text-slate-500 tracking-widest">Especialidad: {selectedRef.label}</h5>
                  <p className="text-md text-slate-900 leading-relaxed font-bold">
                    {selectedRef.description}
                  </p>
                </div>

                <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200 flex gap-3">
                  <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0" />
                  <p className="text-[11px] text-amber-900 font-black leading-tight uppercase">
                    Consulta siempre fuentes oficiales para trámites legales finales. Vía Jaén no gestiona estas cuentas externas.
                  </p>
                </div>

                <Button 
                  className="w-full h-16 rounded-[1.5rem] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black text-xl gap-3 shadow-xl active:scale-95 transition-all"
                  onClick={() => window.open(selectedRef.url, '_blank')}
                >
                  VER EN {selectedRef.platform.toUpperCase()} <ArrowUpRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}