"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Youtube, 
  Globe, 
  ArrowUpRight,
  ShieldAlert
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
import { useLocalStorage } from "@/lib/store";

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
  const { progress } = useLocalStorage();
  const [selectedRef, setSelectedRef] = useState<Referent | null>(null);
  const isAccessible = progress.accessibilityMode === 'accessible';

  const referents: Referent[] = [
    {
      name: "Hija de Inmigrantes",
      handle: "@hijadeinmigrantes",
      spec: "Identidad",
      label: "Identidad y Guía",
      description: "Referente en derechos, identidad y vivencias de las segundas generaciones en España.",
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
      description: "Director de Parainmigrantes.info. Experto líder en trámites de extranjería y nacionalidad.",
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
      description: "Escritora y activista. Contenido sobre educación antirracista y empoderamiento.",
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
      description: "Organización dedicada a la lucha contra el racismo y apoyo legal.",
      url: OFFICIAL_LINKS.comunidad.sosRacismo,
      icon: Globe,
      platform: "Web",
      color: "bg-red-100 text-red-700"
    }
  ];

  const renderCard = (ref: Referent) => (
    <Card 
      key={ref.name}
      className={cn(
        "border-none bg-white shadow-xl rounded-[2rem] overflow-hidden border-2 border-slate-200 cursor-pointer active:scale-95 transition-all",
        isAccessible && "rounded-none border-4 border-primary mb-4"
      )}
      onClick={() => setSelectedRef(ref)}
      role="button"
      tabIndex={0}
      aria-label={`Referente: ${ref.name}, experto en ${ref.spec}.`}
    >
      <CardContent className={cn("p-6 flex flex-col items-center text-center gap-3", isAccessible && "flex-row text-left gap-6 p-8")}>
        <div className={cn("p-4 rounded-full shadow-inner", ref.color.split(' ')[0], isAccessible && "rounded-2xl p-6")}>
          <ref.icon className={cn("h-8 w-8", ref.color.split(' ')[1], isAccessible && "h-12 w-12")} aria-hidden="true" />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className={cn("text-[15px] font-black text-[#1A1A1B] leading-tight line-clamp-2", isAccessible && "text-3xl")}>{ref.name}</h4>
          <Badge className={cn("text-[10px] uppercase font-black px-2 py-1 border-none", ref.color, isAccessible && "text-lg px-4 py-2")}>
            {ref.spec}
          </Badge>
          {isAccessible && <p className="text-xl mt-4 font-bold text-foreground line-clamp-2">{ref.description}</p>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="space-y-4 py-4" aria-labelledby="comm-title">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-0.5">
          <h3 id="comm-title" className="text-xl font-black text-[#1A1A1B] uppercase tracking-tighter">
            Voces que te Guían
          </h3>
          <p className="text-[11px] text-[#1A1A1B] font-black uppercase tracking-widest leading-none">
            Referentes de confianza
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SpeechButton 
            text="Sección Voces que te guían. Referentes que apoyan a inmigrantes en redes sociales." 
            language={lang} 
          />
        </div>
      </div>

      {isAccessible ? (
        <div className="flex flex-col animate-in fade-in duration-700">
          {referents.map(renderCard)}
        </div>
      ) : (
        <Carousel className="w-full" opts={{ align: "start", dragFree: true }}>
          <CarouselContent className="-ml-3 px-2">
            {referents.map((ref) => (
              <CarouselItem key={ref.name} className="pl-3 basis-[180px]">
                {renderCard(ref)}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {/* DETALLE DEL REFERENTE */}
      <Dialog open={!!selectedRef} onOpenChange={() => setSelectedRef(null)}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white border-none shadow-2xl p-0 overflow-hidden outline-none">
          {selectedRef && (
            <div>
              <div className={cn("p-10 flex flex-col items-center text-center gap-4", selectedRef.color.split(' ')[0])}>
                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl">
                   <selectedRef.icon className={cn("h-12 w-12", selectedRef.color.split(' ')[1])} aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-3xl font-black text-[#1A1A1B] uppercase tracking-tighter">
                    {selectedRef.name}
                  </DialogTitle>
                  <p className="text-md font-black uppercase tracking-widest text-slate-900">{selectedRef.handle}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h5 className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Especialidad: {selectedRef.label}</h5>
                  <p className="text-lg text-[#1A1A1B] leading-relaxed font-bold">
                    {selectedRef.description}
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 flex gap-3">
                  <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0" />
                  <p className="text-[12px] text-amber-900 font-black leading-tight uppercase">
                    Consulta siempre fuentes oficiales para trámites legales finales.
                  </p>
                </div>

                <Button 
                  className="w-full h-18 rounded-[1.5rem] font-black text-xl gap-3 shadow-xl active:scale-95 transition-all"
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
