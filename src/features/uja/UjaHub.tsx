"use client"

import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Bus, 
  Zap,
  Globe,
  Award,
  BookOpen,
  Home,
  Utensils,
  Smartphone,
  Users,
  MapPin,
  Stethoscope,
  Info,
  ShieldCheck,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Loader2
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { ScannerSection } from "@/features/tramites/ScannerSection";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function UjaHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
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

  const DirectLinkButton = ({ url, label, variant = "default" }: { url: string, label: string, variant?: any }) => (
    <Button 
      onClick={() => handleDirectAccess(url, label)}
      disabled={loadingLink === url}
      className={cn(
        "w-full h-16 rounded-2xl font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl active:scale-95 transition-all",
        variant === "white" ? "bg-white text-indigo-600 hover:bg-white/90" : "bg-indigo-600 text-white hover:bg-indigo-700",
        isAccessible && "border-4 border-black rounded-none h-20 text-xl"
      )}
    >
      <span>{label}</span>
      {loadingLink === url ? <Loader2 className="h-5 w-5 animate-spin" /> : <ExternalLink className="h-5 w-5" />}
    </Button>
  );

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500 pb-20", isAccessible && "space-y-16")}>
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-indigo-800 uppercase tracking-tighter", isAccessible && "text-5xl")}>Vida UJA</h3>
          <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">Portal del Estudiante • Las Lagunillas</p>
        </div>
        <SpeechButton 
          text="Portal del Estudiante Vida UJA. Accede directamente a la automatrícula, becas, servicios internacionales, comedores y transporte." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <BookOpen className="h-5 w-5" /> Trámites Académicos
          </h4>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className={cn("border-none bg-indigo-600 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-indigo-800")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <GraduationCap className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="space-y-1">
                <h5 className="text-white text-2xl font-black uppercase tracking-tighter">Automatrícula y Grados</h5>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Acceso Directo Seguro</p>
              </div>
              <DirectLinkButton url={OFFICIAL_LINKS.uja.matricula} label="ACCEDER A MATRÍCULA" variant="white" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Becas y Ayudas</h5>
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <DirectLinkButton url={OFFICIAL_LINKS.uja.becas} label="VER BECAS" />
              </CardContent>
            </Card>

            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Carné Digital</h5>
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                </div>
                <DirectLinkButton url="https://www.ujaen.es/servicios/tic/servicios/app-uja" label="APP UJA" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <Globe className="h-5 w-5" /> Erasmus e Internacional
          </h4>
        </div>

        <Card className={cn("border-none bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-black")}>
          <CardContent className="p-8 space-y-8">
            <div className="flex gap-5 items-start">
              <div className="bg-indigo-600 p-4 rounded-3xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h5 className="text-white text-xl font-black uppercase tracking-tighter">Conecta con la UJA</h5>
                <p className="text-white/60 text-[11px] font-medium leading-relaxed">Servicios para estudiantes desplazados.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DirectLinkButton url={OFFICIAL_LINKS.uja.buddyProgram} label="BUDDY PROGRAM" />
              <DirectLinkButton url={OFFICIAL_LINKS.uja.cealm} label="CURSOS ESPAÑOL" />
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="bg-indigo-50 p-8 rounded-[3rem] border-2 border-indigo-100 flex gap-4 items-center shadow-inner mx-2">
        <Info className="h-10 w-10 text-indigo-600 shrink-0" />
        <div className="space-y-1">
          <p className="text-[12px] text-indigo-900 font-black leading-tight uppercase">
            CONSEJO UJA: Verifica siempre los plazos en la Sede Electrónica.
          </p>
          <p className="text-[10px] text-indigo-800/70 font-bold uppercase">
            Todos los enlaces se abren en ventana nueva para tu seguridad.
          </p>
        </div>
      </div>
    </div>
  );
}
