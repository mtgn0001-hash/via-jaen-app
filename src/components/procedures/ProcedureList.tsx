
"use client"

import { Language, translations } from "@/lib/translations";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, MapPin, BadgeInfo, CheckCircle2 } from "lucide-react";
import { useLocalStorage } from "@/lib/store";

type ProcedureListProps = {
  lang: Language;
  toggleProcedure: (id: string) => void;
  completedProcedures: { [key: string]: boolean };
};

export function ProcedureList({ lang, toggleProcedure, completedProcedures }: ProcedureListProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();

  const flows = [
    {
      id: 'empadronamiento',
      title: 'Empadronamiento',
      icon: MapPin,
      steps: [
        { id: 'e1', label: 'Pedir Cita Ayuntamiento', desc: 'En Jaén se solicita online o presencial.' },
        { id: 'e2', label: 'Llevar Pasaporte', desc: 'Original y fotocopia.' },
        { id: 'e3', label: 'Contrato Alquiler', desc: 'O permiso del dueño.' },
        { id: 'e4', label: 'Recoger Papel', desc: 'Es gratis y te acredita.' },
      ]
    },
    {
      id: 'nie_tie',
      title: 'NIE / TIE',
      icon: FileCheck,
      steps: [
        { id: 'n1', label: 'Solicitud EX-15', desc: 'Usa el botón de Descargar PDF.' },
        { id: 'n2', label: 'Pagar Tasa', desc: 'Ve al banco antes de tu cita.' },
        { id: 'n3', label: 'Cita en Policía', desc: 'Prueba los viernes a las 9 AM.' },
        { id: 'n4', label: 'Llevar Foto', desc: 'Fondo blanco y sin gafas.' },
      ]
    }
  ];

  // VISTA LECTURA FÁCIL
  if (progress.easyReading) {
    return (
      <div className="space-y-8 pb-20">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tight">{t.procedures}</h2>
        <div className="grid gap-10">
          {flows.map(flow => (
            <section key={flow.id} className="space-y-6">
              <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-3xl">
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
            </section>
          ))}
        </div>
      </div>
    );
  }

  // VISTA ESTÁNDAR
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">{t.procedures}</h2>
      
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
                  <div key={step.id} className="flex gap-4 items-start p-2 rounded-xl hover:bg-muted/50 transition-colors">
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
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-4 flex gap-3">
          <BadgeInfo className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-primary/80 font-medium">
            {t.claveNote}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
