"use client"

import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Globe,
  Award,
  BookOpen,
  Smartphone,
  Users,
  Info,
  ExternalLink,
  Loader2,
  LocateFixed,
  CalendarDays
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";

export function UjaHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  const isAccessible = progress.accessibilityMode === 'accessible';
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const handleDirectAccess = (url: string, name: string) => {
    setLoadingLink(url);
    
    if (isAccessible && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Redirigiendo a la web oficial de la UJA: ${name}`);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = progress.speechRate || 0.9;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      window.open(url, '_blank');
      setLoadingLink(null);
    }, isAccessible ? 1500 : 500);
  };

  const handleWhereAmI = () => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    toast({
      title: "Campus Las Lagunillas",
      description: "Estás en Jaén Capital. Abriendo el mapa del campus para orientarte...",
    });
    setTimeout(() => {
      window.open("https://www.google.com/maps/search/?api=1&query=Universidad+de+Jaen+Campus+Las+Lagunillas", "_blank");
    }, 1000);
  };

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500 pb-20", isAccessible && "space-y-16")}>
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-indigo-800 uppercase tracking-tighter", isAccessible && "text-5xl")}>Vida UJA</h3>
          <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">Portal del Estudiante • Las Lagunillas</p>
        </div>
        <SpeechButton 
          text="Portal del Estudiante Vida UJA. Accede directamente a la automatrícula, becas, servicios internacionales y transporte." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          onClick={() => handleDirectAccess(OFFICIAL_LINKS.uja.home, "Página Principal UJA")}
          className="w-full h-20 rounded-[2rem] bg-indigo-600 text-white font-black text-lg gap-3 shadow-xl active:scale-95 transition-all uppercase tracking-tighter"
        >
          <GraduationCap className="h-7 w-7" /> SITIO WEB OFICIAL UJA
        </Button>
        
        <Button 
          onClick={handleWhereAmI}
          variant="outline"
          className="w-full h-12 rounded-2xl border-2 border-indigo-200 text-indigo-700 font-black uppercase text-xs gap-2"
        >
          <LocateFixed className="h-4 w-4" /> ¿Dónde estoy en el Campus?
        </Button>
      </div>

      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <BookOpen className="h-5 w-5" /> Trámites Académicos
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className={cn("border-none bg-slate-50 border-2 border-indigo-100 rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none")}>
            <CardContent className="p-8 space-y-6 relative z-10">
              <h5 className="text-indigo-900 text-2xl font-black uppercase tracking-tighter">Automatrícula y Grados</h5>
              <ResourceLauncher 
                title="Automatrícula UJA"
                description="Acceso al portal de automatrícula. 1. Identifícate con tu cuenta TIC. 2. Selecciona tu plan de estudios. 3. Confirma las asignaturas."
                url={OFFICIAL_LINKS.uja.matricula}
                triggerLabel="ACCEDER A MATRÍCULA"
                variant="primary"
                lang={lang}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Becas Propias</h5>
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <ResourceLauncher 
                  title="Becas y Ayudas UJA"
                  description="Consulta la convocatoria de becas propias de la Universidad de Jaén para este curso."
                  url={OFFICIAL_LINKS.uja.becas}
                  triggerLabel="VER BECAS"
                  variant="outline"
                  lang={lang}
                />
              </CardContent>
            </Card>

            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Calendario</h5>
                  <CalendarDays className="h-5 w-5 text-indigo-600" />
                </div>
                <ResourceLauncher 
                  title="Calendario Académico"
                  description="Fechas de exámenes, festivos y periodos lectivos oficiales de la UJA."
                  url={OFFICIAL_LINKS.uja.calendario}
                  triggerLabel="VER FECHAS"
                  variant="outline"
                  lang={lang}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Globe className="h-5 w-5" /> Erasmus e Internacional
        </h4>

        <Card className={cn("border-none bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-black")}>
          <CardContent className="p-8 space-y-8">
            <div className="flex gap-5 items-start">
              <div className="bg-indigo-600 p-4 rounded-3xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h5 className="text-white text-xl font-black uppercase tracking-tighter">Movilidad Internacional</h5>
                <p className="text-white/60 text-[11px] font-medium leading-relaxed">Servicios para estudiantes desplazados.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResourceLauncher 
                title="Buddy Program"
                description="Programa de acompañamiento para alumnos extranjeros. Consigue un tutor local que te ayude a tu llegada."
                url={OFFICIAL_LINKS.uja.buddyProgram}
                triggerLabel="BUDDY PROGRAM"
                variant="white"
                lang={lang}
              />
              <ResourceLauncher 
                title="Cursos de Español"
                description="Acceso al CEALM para cursos de lengua y cultura española para extranjeros."
                url={OFFICIAL_LINKS.uja.cealm}
                triggerLabel="CURSOS ESPAÑOL"
                variant="white"
                lang={lang}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="bg-indigo-50 p-8 rounded-[3rem] border-2 border-indigo-100 flex gap-4 items-center shadow-inner mx-2">
        <Info className="h-10 w-10 text-indigo-600 shrink-0" />
        <div className="space-y-1">
          <p className="text-[12px] text-indigo-900 font-black leading-tight uppercase">
            CONSEJO UJA: Casi todas las gestiones requieren tu Certificado Digital. Si no lo tienes, acude al Edificio C2 para ayuda técnica.
          </p>
        </div>
      </div>
    </div>
  );
}