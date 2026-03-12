
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, MapPin, BadgeInfo, CheckCircle2, Clock, AlertTriangle, Play, X } from "lucide-react";
import { useLocalStorage } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ProcedureListProps = {
  lang: Language;
  toggleProcedure: (id: string) => void;
  completedProcedures: { [key: string]: boolean };
};

export function ProcedureList({ lang, toggleProcedure, completedProcedures }: ProcedureListProps) {
  const langPack = translations[lang] || translations.es;
  const t = langPack;
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;
  const [showLSE, setShowLSE] = useState(false);

  const flows = [
    {
      id: 'empadronamiento',
      title: 'Empadronamiento (Padrón)',
      icon: MapPin,
      steps: [
        { id: 'e1', label: 'Pedir Cita Ayuntamiento', desc: 'En Jaén se solicita en sede.aytojaen.es o llamando al 010.' },
        { id: 'e2', label: 'Llevar Pasaporte Original', desc: 'Obligatorio pasaporte en vigor y fotocopia.' },
        { id: 'e3', label: 'Documento de Vivienda', desc: 'Contrato de alquiler o autorización firmada del dueño.' },
        { id: 'e4', label: 'Recoger el Volante', desc: 'Te servirá para médico, colegio y trámites de extranjería.' },
      ]
    },
    {
      id: 'nie_tie',
      title: 'NIE / TIE (Tarjeta)',
      icon: FileCheck,
      steps: [
        { id: 'n1', label: 'Formulario EX-15/EX-17', desc: 'Descárgalo en la sección de Formularios de esta app.' },
        { id: 'n2', label: 'Pagar Tasa 790-012', desc: 'Imprescindible pagar en el banco ANTES de ir a la cita.' },
        { id: 'n3', label: 'Cita en Comisaría', desc: 'Plaza de las Batallas. Recuerda: prueba los viernes a las 9 AM.' },
        { id: 'n4', label: 'Foto de Carné', desc: 'Reciente, fondo blanco, sin gafas ni gorra.' },
      ]
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{t.procedures} en Jaén</h2>
        </div>
        {accMode === 'visual' && (
          <Button 
            onClick={() => setShowLSE(true)}
            variant="secondary" 
            className="rounded-full gap-2 h-10 border-2 border-primary/20 bg-white/50 animate-pulse"
          >
            <Play className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase">{t.accessibility.lseBtn}</span>
          </Button>
        )}
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-3">
        {flows.map((flow) => (
          <AccordionItem key={flow.id} value={flow.id} className="border rounded-2xl px-4 bg-white overflow-hidden shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <flow.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold">{flow.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 mt-2">
                {flow.steps.map((step) => (
                  <div key={step.id} className="flex gap-4 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                    <Checkbox 
                      id={step.id} 
                      checked={completedProcedures[step.id] || false}
                      onCheckedChange={() => toggleProcedure(step.id)}
                      className="mt-1 h-5 w-5 rounded-md"
                      aria-label={`Marcar paso: ${step.label}`}
                    />
                    <div className="grid gap-1">
                      <label htmlFor={step.id} className="text-sm font-bold leading-none cursor-pointer">
                        {step.label}
                      </label>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {flow.id === 'nie_tie' && (
                  <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-black text-xs uppercase text-amber-900">¡IMPORTANTE!</h4>
                        <p className="text-[10px] text-amber-800 leading-normal font-bold">
                          Si no encuentras citas disponibles en el sistema online, te recomendamos acudir presencialmente a la Comisaría (Plaza de las Batallas).
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-10 rounded-xl border-amber-200 bg-white text-amber-700 font-bold text-[10px] gap-2 shadow-sm"
                      asChild
                    >
                      <a href="https://www.google.com/maps/search/?api=1&query=Plaza+de+las+Batallas+Jaen" target="_blank">
                        <MapPin className="h-3 w-3" /> Cómo llegar a la Comisaría
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog open={showLSE} onOpenChange={setShowLSE}>
        <DialogContent className="rounded-[2.5rem] bg-white p-0 overflow-hidden border-none max-w-lg">
          <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
             <div className="text-center space-y-4">
                <div className="bg-primary p-4 rounded-full inline-block animate-bounce">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <p className="text-white font-black uppercase text-xs tracking-widest">Guía en Lengua de Signos (LSE)</p>
                <p className="text-white/60 text-[10px] px-8 italic">Simulación: Aquí se reproduciría el video explicativo de los trámites de Jaén.</p>
             </div>
             <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowLSE(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/10"
             >
               <X className="h-6 w-6" />
             </Button>
          </div>
          <div className="p-8 text-center space-y-2">
            <h3 className="text-xl font-black text-primary uppercase">Guía Visual</h3>
            <p className="text-sm text-muted-foreground">Vídeos explicativos para facilitar la comprensión de los trámites en la provincia de Jaén.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
