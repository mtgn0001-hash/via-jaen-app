"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Youtube, 
  Globe, 
  Users, 
  ShieldAlert, 
  PlusCircle, 
  ArrowUpRight, 
  Play,
  UserCheck
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

export function CommunityReferents({ lang }: { lang: string }) {
  const referents = [
    {
      name: "Hija de Inmigrantes",
      handle: "@hijadeinmigrantes",
      spec: "Derechos, identidad y guía de vida.",
      url: OFFICIAL_LINKS.comunidad.hijaDeInmigrantes,
      icon: Instagram,
      platform: "Instagram"
    },
    {
      name: "Vicente Marín",
      handle: "Parainmigrantes",
      spec: "Abogado experto en nacionalidad y arraigo.",
      url: OFFICIAL_LINKS.comunidad.vicenteMarin,
      icon: Youtube,
      platform: "YouTube"
    },
    {
      name: "Desirée Bela-Lobedde",
      handle: "@desireebela",
      spec: "Activismo y educación antirracista.",
      url: OFFICIAL_LINKS.comunidad.desireeBela,
      icon: Instagram,
      platform: "Instagram"
    },
    {
      name: "SOS Racismo",
      handle: "Federación Estatal",
      spec: "Denuncia legal y apoyo antidiscriminación.",
      url: OFFICIAL_LINKS.comunidad.sosRacismo,
      icon: Globe,
      platform: "Web Oficial"
    },
    {
      name: "Quan Zhou",
      handle: "@gazpachoagridulce",
      spec: "Cultura y vivencias desde el arte.",
      url: OFFICIAL_LINKS.comunidad.quanZhou,
      icon: Instagram,
      platform: "Instagram"
    },
    {
      name: "Safa El-Msaouri",
      handle: "@safaelmsaouri",
      spec: "Derechos de las mujeres migrantes.",
      url: OFFICIAL_LINKS.comunidad.safaElMsaouri,
      icon: Instagram,
      platform: "Instagram"
    }
  ];

  const handleLaunch = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center px-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-primary uppercase tracking-tighter flex items-center gap-2">
            <Users className="h-5 w-5" /> Comunidad y Voces de Apoyo
          </h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
            Aprende de quienes ya han pasado por esto
          </p>
        </div>
        <div className="flex items-center gap-2">
           <SpeechButton 
            text="Sección de comunidad. Aquí tienes personas que ayudan a los extranjeros en redes sociales. Pulsa para ver sus videos y aprender sobre tus derechos." 
            language={lang} 
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary/5 text-primary border border-primary/10">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {referents.map((ref) => (
              <CarouselItem key={ref.name} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                <Card className="border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden border border-primary/5 h-full transition-all hover:scale-[1.02] active:scale-95 group">
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-inner">
                          <ref.icon className="h-6 w-6" />
                        </div>
                        <div className="text-[8px] font-black uppercase text-primary/40 bg-primary/5 px-2 py-1 rounded-lg">
                          {ref.platform}
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-6">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none truncate">{ref.name}</h4>
                        <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest">{ref.handle}</p>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic mt-2">
                          "{ref.spec}"
                        </p>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleLaunch(ref.url)}
                      className="w-full rounded-2xl h-11 font-black text-[10px] uppercase gap-2 bg-slate-50 text-primary border-2 border-primary/5 hover:bg-primary hover:text-white transition-all shadow-sm"
                      aria-label={`Botón externo: Abrir ${ref.platform} de ${ref.name} experto en ${ref.spec}`}
                    >
                      Ver en {ref.platform} <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-end gap-2 mt-4 px-4">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl border-2" />
            <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl border-2" />
          </div>
        </Carousel>
      </div>

      {/* AVISO DE SEGURIDAD Y CONTEXTO */}
      <div className="px-4">
        <div className="bg-amber-50 p-5 rounded-[2.5rem] border border-amber-100 flex gap-4 items-start shadow-sm">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[10px] text-amber-800 font-bold leading-normal">
              Estás saliendo a una red externa. Estos referentes ofrecen consejos y apoyo real en redes sociales. 
            </p>
            <p className="text-[8px] text-amber-700/60 font-black uppercase tracking-widest">
              Vía Jaén no gestiona estas cuentas; consulta siempre las fuentes oficiales para trámites legales.
            </p>
          </div>
        </div>
      </div>

      {/* SUGERIR REFERENTE */}
      <div className="flex justify-center pt-2 px-4">
        <Button 
          variant="outline" 
          onClick={() => handleLaunch(OFFICIAL_LINKS.comunidad.sugerirReferente)}
          className="w-full h-14 rounded-[1.5rem] border-2 border-dashed border-primary/20 text-primary hover:border-primary font-black text-[10px] uppercase gap-2 px-8 bg-primary/5"
        >
          <PlusCircle className="h-4 w-4" /> Sugerir Referente Útil
        </Button>
      </div>
    </div>
  );
}
