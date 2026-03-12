
"use client"

import { Language, translations } from "@/lib/translations";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, MapPin, BadgeInfo, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useLocalStorage } from "@/lib/store";
import { Button } from "@/components/ui/button";

type ProcedureListProps = {
  lang: Language;
  toggleProcedure: (id: string) => void;
  completedProcedures: { [key: string]: boolean };
};

export function ProcedureList({ lang, toggleProcedure, completedProcedures }: ProcedureListProps) {
  const langPack = translations[lang] || translations.es;
  const t = langPack;
  const { progress } = useLocalStorage();

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

  if (progress.easyReading) {
    return (
      <div className="space-y-8 pb-20">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tight">{t.procedures}</h2>
        <div className="grid gap-10">
          {flows.map(flow => (
            <section key={flow.id} className="space-y-6">
              <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-3xl border border-primary/10">
                <flow.icon className="h-10 w-10 text-primary" />
                <h3 className="text-3xl font-black uppercase text-slate-800">{flow.title}</h3>
              </div>
              <div className="grid gap-4">
                {flow.steps.map(step => (
                  <Card key={step.id} className="border-[6px] border-primary/5 rounded-[40px] shadow-lg bg-white">
                    <CardContent className="p-8 flex items-start gap-6">
                      <div className="bg-green-100 p-3 rounded-2xl">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl font-black leading-tight mb-2 uppercase tracking-tight">{step.label}</p>
                        <p className="text-lg font-bold text-muted-foreground leading-snug">{step.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {flow.id === 'nie_tie' && (
                <Card className="border-[6px] border-amber-500/10 rounded-[40px] shadow-lg bg-amber-50">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-6">
                       <div className="bg-amber-100 p-3 rounded-2xl h-fit">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                       </div>
                       <div className="space-y-2">
                         <h4 className="text-2xl font-black text-amber-900 uppercase tracking-tight">{t.nieAlertTitle}</h4>
                         <p className="text-lg font-bold text-amber-800 leading-snug">
                           {t.nieAlertDesc}
                         </p>
                       </div>
                    </div>
                    <Button 
                      asChild 
                      className="w-full h-16 rounded-[24px] bg-amber-600 hover:bg-amber-700 text-white font-black text-xl shadow-xl shadow-amber-600/20"
                    >
                      <a href="https://www.google.com/maps/search/?api=1&query=Plaza+de+las+Batallas+Jaen" target="_blank">
                        <MapPin className="h-6 w-6 mr-2" /> {t.goToPolice}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">{t.procedures} en Jaén</h2>
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
                  <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-black text-xs uppercase text-amber-900">{t.nieAlertTitle}</h4>
                        <p className="text-[10px] text-amber-800 leading-normal font-bold">
                          {t.nieAlertDesc}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-10 rounded-xl border-amber-200 bg-white text-amber-700 font-bold text-[10px] gap-2 hover:bg-amber-100 hover:border-amber-300 transition-all shadow-sm"
                      asChild
                    >
                      <a href="https://www.google.com/maps/search/?api=1&query=Plaza+de+las+Batallas+Jaen" target="_blank">
                        <MapPin className="h-3 w-3" /> {t.goToPolice}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="bg-blue-50 border-blue-100 mt-6">
        <CardContent className="p-4 flex gap-3">
          <BadgeInfo className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-primary/80 font-bold leading-relaxed">
            Truco para Jaén: Las citas en la Comisaría de Plaza de las Batallas suelen liberarse los viernes entre las 8:30 y las 9:30 de la mañana. ¡Estate atento!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
