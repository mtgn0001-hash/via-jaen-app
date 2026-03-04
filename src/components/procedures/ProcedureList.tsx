"use client"

import { Language, translations } from "@/lib/translations";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, MapPin, BadgeInfo } from "lucide-react";

type ProcedureListProps = {
  lang: Language;
  toggleProcedure: (id: string) => void;
  completedProcedures: { [key: string]: boolean };
};

export function ProcedureList({ lang, toggleProcedure, completedProcedures }: ProcedureListProps) {
  const t = translations[lang];

  const flows = [
    {
      id: 'empadronamiento',
      title: 'Empadronamiento',
      icon: MapPin,
      steps: [
        { id: 'e1', label: 'Pedir Cita en el Ayuntamiento', desc: 'En Jaén se solicita en la Sede Electrónica o presencialmente.' },
        { id: 'e2', label: 'Documento de Identidad', desc: 'Pasaporte original y copia.' },
        { id: 'e3', label: 'Contrato de Alquiler', desc: 'O autorización del dueño de la vivienda.' },
        { id: 'e4', label: 'Recoger el Volante', desc: 'Es gratuito y acredita tu residencia legal en el municipio.' },
      ]
    },
    {
      id: 'nie_tie',
      title: 'Asignación de NIE / TIE',
      icon: FileCheck,
      steps: [
        { id: 'n1', label: 'Solicitud EX-15', desc: 'Descarga el formulario oficial en la sección de Formularios.' },
        { id: 'n2', label: 'Pago de Tasa 790-012', desc: 'Paga en el banco antes de ir a la cita.' },
        { id: 'n3', label: 'Cita en Policía / Extranjería', desc: 'Suele ser difícil conseguir cita; prueba los viernes a las 9 AM.' },
        { id: 'n4', label: 'Foto Carnet', desc: 'Fondo blanco, sin gafas de sol ni gorros.' },
      ]
    },
    {
      id: 'arraigo',
      title: 'Arraigo Social / Laboral',
      icon: BadgeInfo,
      steps: [
        { id: 'a1', label: 'Acreditar permanencia', desc: 'Debes demostrar 2 años (Laboral) o 3 años (Social) en España.' },
        { id: 'a2', label: 'Informe de Inserción', desc: 'Solicitado en Servicios Sociales de tu Ayuntamiento.' },
        { id: 'a3', label: 'Contrato de Trabajo', desc: 'Mínimo de 30 horas semanales o salario mínimo interprofesional.' },
        { id: 'a4', label: 'Antecedentes Penales', desc: 'Certificado de tu país de origen, legalizado y traducido.' },
      ]
    }
  ];

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
