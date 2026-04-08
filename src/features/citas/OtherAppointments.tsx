"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Stethoscope, 
  Briefcase, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  Loader2
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { OFFICIAL_LINKS } from "@/services/links-service";

export function OtherAppointments() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const appointments = [
    {
      title: 'Alta en el Padrón',
      desc: 'Sede Electrónica Ayuntamiento de Jaén',
      url: OFFICIAL_LINKS.ayuntamiento.padron,
      icon: Building2,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Cita Médica (SAS)',
      desc: 'ClicSalud+ y Salud Responde',
      url: OFFICIAL_LINKS.salud.clicSalud,
      icon: Stethoscope,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Seguridad Social',
      desc: 'Cita Previa Tesorería (Jaén)',
      url: OFFICIAL_LINKS.seguridadSocial?.cita || "https://portal.seg-social.gob.es/",
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Web Universidad (UJA)',
      desc: 'Página principal y acceso general',
      url: OFFICIAL_LINKS.uja.home,
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const handleLaunch = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1000);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full h-20 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border-2 border-primary/10 text-primary hover:bg-primary/5 font-black text-lg uppercase tracking-tighter flex justify-between px-8 group active:scale-95 transition-all shadow-xl"
      >
        <span>Otras Citas y Trámites</span>
        <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
          <ChevronRight className="h-6 w-6 text-primary group-hover:text-white transition-all" />
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            {appointments.map((cita) => (
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
                  <ExternalLink className="h-4 w-4 text-primary/60" />
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
    </>
  );
}