"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Home, UserCheck, CreditCard, Library } from "lucide-react";

type CommonAndaluciaProps = {
  lang: Language;
};

export function CommonAndalucia({ lang }: CommonAndaluciaProps) {
  const t = translations[lang];

  const commonProcedures = [
    {
      title: 'Carné Joven Andaluz',
      desc: 'Descuentos en transporte, cultura y comercios para jóvenes de 14 a 30 años.',
      icon: CreditCard,
      url: 'https://www.patiojoven.es/carne-joven'
    },
    {
      title: 'Plan Vive Andalucía (Vivienda)',
      desc: 'Ayudas al alquiler y acceso a la vivienda para colectivos vulnerables.',
      icon: Home,
      url: 'https://www.juntadeandalucia.es/organismos/fomentoarticulaciondelterritorioyvivienda/areas/vivienda-rehabilitacion/plan-vive.html'
    },
    {
      title: 'Dependencia y Mayores',
      desc: 'Solicitud de valoración de grado de dependencia y teleasistencia.',
      icon: UserCheck,
      url: 'https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/dependencia.html'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Ayudas Junta de Andalucía</h2>
        <p className="text-muted-foreground text-sm">Trámites y beneficios comunes a todas las provincias andaluzas.</p>
      </div>

      <div className="grid gap-4">
        {commonProcedures.map((proc) => (
          <Card key={proc.title} className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center gap-2 font-bold text-primary">
                <proc.icon className="h-5 w-5" />
                <CardTitle className="text-lg">{proc.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">{proc.desc}</p>
              <Button className="w-full rounded-xl gap-2" variant="outline" asChild>
                <a href={proc.url} target="_blank">
                  Ver Trámite <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-emerald-50 border-emerald-100 p-4 rounded-3xl">
        <div className="flex gap-4 items-start">
          <Library className="h-6 w-6 text-emerald-600 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-emerald-900">Carpeta Ciudadana</h4>
            <p className="text-[10px] text-emerald-800">Gestiona todos tus certificados y trámites de la Junta en un solo lugar.</p>
            <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-emerald-700" asChild>
              <a href="https://www.juntadeandalucia.es/servicios/carpeta-ciudadana.html" target="_blank">Acceder <ExternalLink className="h-3 w-3 ml-1" /></a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
