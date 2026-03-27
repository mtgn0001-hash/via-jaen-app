"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  Play, 
  Building2, 
  ShieldCheck, 
  Stethoscope, 
  Briefcase,
  ChevronRight,
  Info,
  MapPin,
  Loader2,
  Zap
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { SpeechButton } from "@/components/ui/SpeechButton";

type ProcedureListProps = {
  lang: Language;
};

export function ProcedureList({ lang }: ProcedureListProps) {
  const t = translations[lang] || translations.es;
  const l = t.launcher;
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  const [isOtherCitasOpen, setIsOtherCitasOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunch = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1200);
  };

  const otherCitas = [
    {
      title: 'Alta en el Padrón',
      desc: 'Sede Electrónica Ayuntamiento de Jaén',
      url: 'https://sede.aytojaen.es/',
      icon: Building2,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Cita Médica (SAS)',
      desc: 'ClicSalud+ y Salud Responde',
      url: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/',
      icon: Stethoscope,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Seguridad Social',
      desc: 'Cita Previa Tesorería (Jaén)',
      url: 'https://portal.seg-social.gob.es/wps/portal/importass/importass',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Admisión UJA',
      desc: 'Grados y Matrícula Universidad',
      url: 'https://www.ujaen.es/estudios/acceso',
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="space-y-8 pb-24 animate-in slide-in-from-bottom-4 duration-700">
      {/* HEADER MINIMALISTA */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Trámites</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Gestión de Residencia y Citas Oficiales</p>
      </div>

      {/* BLOQUE PRINCIPAL: TIE/NIE */}
      <Card className="border-none bg-primary shadow-2xl rounded-[3rem] overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Zap className="h-32 w-32 text-white" />
        </div>
        
        <CardContent className="p-8 space-y-6 relative z-10">
          <div className="space-y-2">
            <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none">Gestión TIE y NIE</h3>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <MapPin className="h-3 w-3" /> Plaza de las Batallas (Jaén)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={() => handleLaunch('https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html')}
              className="h-16 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl active:scale-95 transition-all"
            >
              <span>Solicitar / Renovar NIE (EX-15)</span>
              <FileText className="h-5 w-5" />
            </Button>

            <Button 
              onClick={() => handleLaunch('https://icp.administracionelectronica.gob.es/icpco/index.html')}
              className="h-16 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md font-black text-sm uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all"
            >
              <span>Tarjeta TIE (Huellas/Recogida)</span>
              <ExternalLink className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl flex gap-3 items-center">
            <Info className="h-5 w-5 text-white shrink-0" />
            <p className="text-[10px] text-white font-bold leading-tight">
              Si no hay citas disponibles online, acude presencialmente a la Comisaría de la Plaza de las Batallas ya que la disponibilidad cambia semanalmente.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* BOTÓN OTRAS CITAS */}
      <Button 
        onClick={() => setIsOtherCitasOpen(true)}
        className="w-full h-20 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border-2 border-primary/10 text-primary hover:bg-primary/5 font-black text-lg uppercase tracking-tighter flex justify-between px-8 group active:scale-95 transition-all shadow-xl"
      >
        <span>Otras Citas y Trámites</span>
        <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
          <ChevronRight className="h-6 w-6" />
        </div>
      </Button>

      {/* ACCESIBILIDAD ADAPTADA */}
      {accMode === 'accessible' && (
        <section className="bg-emerald-50 p-6 rounded-[2.5rem] border-2 border-emerald-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-xs uppercase text-emerald-900 flex items-center gap-2">
              <Play className="h-4 w-4" /> Guía en LSE
            </h4>
            <SpeechButton text="Instrucción de citas: Si no encuentras cita previa online para el TIE o el NIE, es importante que acudas físicamente a la Comisaría de la Plaza de las Batallas, ya que la disponibilidad de citas se actualiza semanalmente." language={lang} />
          </div>
          <p className="text-[10px] text-emerald-800 font-bold leading-normal">
            Aviso importante: Si el sistema de citas online está saturado, la oficina de Jaén recomienda acudir en persona para consultar la asignación semanal.
          </p>
        </section>
      )}

      {/* BOTTOM SHEET: OTRAS CITAS */}
      <Dialog open={isOtherCitasOpen} onOpenChange={setIsOtherCitasOpen}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white/90 backdrop-blur-3xl border-none shadow-2xl p-0 overflow-hidden outline-none">
          <DialogHeader className="p-8 bg-primary/5 border-b border-primary/5">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-3 rounded-2xl shadow-lg">
                <ChevronRight className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-2xl font-black text-primary uppercase tracking-tighter">Otras Gestiones</DialogTitle>
                <DialogDescription className="font-bold text-xs uppercase tracking-widest opacity-60">Servicios Públicos Jaén</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 grid gap-3">
            {otherCitas.map((cita) => (
              <Card 
                key={cita.title} 
                className="border-none bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer rounded-3xl"
                onClick={() => handleLaunch(cita.url)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`${cita.color} p-3 rounded-2xl`}>
                      <cita.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900 leading-none mb-1">{cita.title}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold">{cita.desc}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-primary/30" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2">
             {isLoading ? (
               <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase">
                 <Loader2 className="h-3 w-3 animate-spin" /> Conectando con la Sede...
               </div>
             ) : (
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center px-8 leading-tight">
                 Estás navegando hacia servidores oficiales externos. Vía Jaén no almacena tus datos de navegación.
               </p>
             )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}