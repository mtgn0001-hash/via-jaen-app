"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Users, ShieldAlert, PlusCircle, ArrowUpRight, MessageSquare } from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function CommunityReferents({ lang }: { lang: string }) {
  const referents = [
    {
      name: "Hija de Inmigrantes",
      desc: "Guía sobre extranjería, derechos y vivencias desde una perspectiva real.",
      url: OFFICIAL_LINKS.comunidad.hijaDeInmigrantes,
      platform: "Instagram"
    },
    {
      name: "Legalteam",
      desc: "Asesoría experta en trámites de residencia y nacionalidad en España.",
      url: OFFICIAL_LINKS.comunidad.legalteam,
      platform: "Instagram"
    }
  ];

  const handleLaunch = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-primary uppercase tracking-tighter flex items-center gap-2">
            <Users className="h-5 w-5" /> Comunidad y Referentes
          </h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Voces de Ayuda y Experiencia</p>
        </div>
        <SpeechButton 
          text="Sección de comunidad. Aquí puedes encontrar a personas que explican los trámites en redes sociales de forma sencilla. Son perfiles de confianza que ayudan a la comunidad." 
          language={lang} 
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {referents.map((ref) => (
          <Card key={ref.name} className="border-none bg-white shadow-lg rounded-[2rem] overflow-hidden border border-primary/5 active:scale-[0.98] transition-all group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLaunch(ref.url)}
                  className="rounded-xl h-10 px-4 font-black text-[10px] uppercase gap-2 border border-primary/10 hover:bg-primary/5"
                  aria-label={`Enlace externo al perfil de Instagram de ${ref.name}`}
                >
                  Ver Perfil <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">{ref.name}</h4>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                  "{ref.desc}"
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AVISO DE SEGURIDAD SOCIAL */}
      <div className="bg-amber-50 p-5 rounded-[2rem] border border-amber-100 flex gap-4 items-start shadow-sm">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-800 font-bold leading-normal">
          Estás saliendo a una red externa. Estos perfiles ofrecen información de apoyo y orientación. Consulta siempre con la Sede Electrónica para trámites oficiales y plazos legales.
        </p>
      </div>

      {/* SUGERIR REFERENTE */}
      <div className="flex justify-center pt-2">
        <Button 
          variant="outline" 
          onClick={() => handleLaunch(OFFICIAL_LINKS.comunidad.sugerirReferente)}
          className="h-12 rounded-2xl border-2 border-dashed border-primary/20 text-primary hover:border-primary font-black text-[10px] uppercase gap-2 px-8"
        >
          <PlusCircle className="h-4 w-4" /> Sugerir Referente de Jaén
        </Button>
      </div>
    </div>
  );
}
