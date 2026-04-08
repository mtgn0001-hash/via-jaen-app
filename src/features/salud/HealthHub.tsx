"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
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

  const handleWhereAmI = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        toast({
          title: "Ubicación Jaén",
          description: "Estás en el área metropolitana de Jaén. Facilita esta zona a emergencias si es necesario.",
        });
      });
    }
  };

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500", isAccessible && "space-y-16")}>
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-slate-900 uppercase tracking-tighter", isAccessible && "text-5xl")}>Salud Jaén</h3>
          <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">Servicios Junta de Andalucía</p>
        </div>
        <SpeechButton 
          text="Portal de Salud Jaén. Accede a ClicSalud para tu historial, recetas y citas. En emergencias, llama al 112." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      <Button 
        onClick={handleWhereAmI}
        variant="outline"
        className="w-full h-12 rounded-2xl border-2 border-primary/20 text-primary font-black uppercase text-xs gap-2"
      >
        <LocateFixed className="h-4 w-4" /> ¿Dónde estoy hoy?
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
        <span className={cn("text-[12px] font-bold opacity-90", isAccessible && "text-xl")}>URGENCIAS 24H</span>
      </Button>

      {/* 2. GESTIÓN OFICIAL */}
      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Calendar className="h-5 w-5 text-primary" /> Gestión de Salud
        </h4>

        <div className="grid grid-cols-1 gap-4">
          <Card className={cn("border-none bg-primary shadow-xl rounded-[2.5rem] overflow-hidden relative group", isAccessible && "rounded-none border-4 border-primary")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <FolderHeart className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="flex justify-between items-start">
                <h5 className="text-white text-2xl font-black uppercase tracking-tighter">ClicSalud+</h5>
                <Badge className="bg-white/20 text-white border-none font-black text-[10px]">RECOMENDADO</Badge>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <ResourceLauncher 
                  title="Acceso a ClicSalud+"
                  description="Plataforma oficial para gestionar tus citas, consultar tu historial médico, ver vacunas y descargar tus recetas electrónicas."
                  url={OFFICIAL_LINKS.salud.clicSalud}
                  triggerLabel="ENTRAR A LA PLATAFORMA"
                  variant="white"
                  lang={lang}
                />
                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-[11px] text-white/90 font-bold leading-tight">
                    TIP: Usa tu Certificado Digital o Cl@ve para ver todos tus informes médicos de Jaén.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn("border-none bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-black")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Phone className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <h5 className="text-white text-2xl font-black uppercase tracking-tighter">Asistencia Telefónica</h5>
              <div className="space-y-4">
                <p className="text-xs text-white/60 font-medium">Llama a Salud Responde para citas rápidas o dudas sanitarias.</p>
                <Button 
                  onClick={() => handleCall(OFFICIAL_LINKS.salud.saludRespondeTelefono)}
                  className="w-full h-16 rounded-2xl bg-white text-slate-900 font-black text-sm uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all"
                >
                  <span>955 54 50 60</span>
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. ESCÁNER INTELIGENTE */}
      <section className="space-y-4">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Camera className="h-5 w-5 text-indigo-600" /> Escanear Tarjeta Sanitaria
        </h4>
        <div className="bg-indigo-50/50 rounded-[2.5rem] p-2 border-4 border-dashed border-indigo-100">
           <ScannerSection />
        </div>
      </section>

      {/* 4. HOSPITALES JAÉN */}
      <section className="space-y-6">
        <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
          <Stethoscope className="h-5 w-5 text-red-600" /> Urgencias Hospitalarias
        </h4>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className={cn("border-none bg-white shadow-xl rounded-[2.5rem] border-2 border-slate-100", isAccessible && "rounded-none border-4 border-black")}>
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className={cn("text-2xl font-black text-slate-900 uppercase tracking-tighter", isAccessible && "text-4xl")}>Hospital Universitario</h4>
                  <p className={cn("text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase", isAccessible && "text-xl mt-2")}>
                    <MapPin className="h-4 w-4 text-red-600" /> Av. de Madrid, Jaén
                  </p>
                </div>
                <Badge className="bg-red-50 text-red-600 border-red-100 font-black text-[10px] px-3 py-1">CENTRO PRINCIPAL</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleCall("953 00 80 00")}
                  variant="outline"
                  className="h-14 rounded-xl border-2 border-slate-200 text-slate-900 font-black gap-2 text-xs uppercase"
                >
                  <Phone className="h-4 w-4" /> Llamar
                </Button>
                <Button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Hospital+Universitario+Jaen`, '_blank')}
                  className="h-14 rounded-xl font-black gap-2 shadow-md text-xs uppercase"
                >
                  <LocateFixed className="h-4 w-4" /> Cómo llegar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="bg-amber-50 p-8 rounded-[3rem] border-2 border-amber-100 flex gap-4 items-center shadow-inner mx-2">
        <Info className="h-10 w-10 text-amber-600 shrink-0" />
        <p className="text-[12px] text-amber-900 font-black leading-tight uppercase">
          RECUERDA: Si es una urgencia vital grave en Jaén, acude directamente al Hospital General o llama al 112. Tu salud es lo primero.
        </p>
      </div>
    </div>
  );
}