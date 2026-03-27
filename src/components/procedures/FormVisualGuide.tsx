
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Info, FileText, CheckCircle2, MapPin, ExternalLink, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FormVisualGuideProps = {
  lang: Language;
};

export function FormVisualGuide({ lang }: FormVisualGuideProps) {
  const t = translations[lang];

  const guideSections = [
    { 
      section: "NIE / Certificados (Modelo EX-15)", 
      url: "https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html",
      where: "Comisaría de Policía (Plaza de las Batallas, Jaén)",
      fields: [
        { id: "nie", label: "PASAPORTE / NIE", hint: "Si es tu primera vez, escribe el número de tu pasaporte. Usa siempre MAYÚSCULAS." },
        { id: "address", label: "DOMICILIO", hint: "Pon la dirección exacta de tu volante de empadronamiento." }
      ]
    },
    { 
      section: "Empadronamiento Municipal", 
      url: "https://sede.aytojaen.es/",
      where: "Ayuntamiento de Jaén (Plaza de Santa María)",
      fields: [
        { id: "housing", label: "DATOS VIVIENDA", hint: "Debes aportar contrato de alquiler original o autorización del dueño." },
        { id: "members", label: "CONVIVIENTES", hint: "Añade a todos los miembros de tu familia que vivan contigo." }
      ]
    },
    { 
      section: "Tarjeta Sanitaria (SAS)", 
      url: "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/",
      where: "Centro de Salud más cercano a tu casa",
      fields: [
        { id: "seg_social", label: "Nº SEGURIDAD SOCIAL", hint: "Si trabajas, pon tu número de afiliación. Si no, solicita el alta por residencia." }
      ]
    }
  ];

  return (
    <section className="space-y-6 pb-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="font-black text-2xl uppercase tracking-tighter text-primary">{t.forms} - Guía Pro</h3>
        </div>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Toca los campos para saber qué poner y accede al documento.</p>
      </div>

      <TooltipProvider>
        <div className="grid gap-6">
          {guideSections.map((group) => (
            <Card key={group.section} className="border-none shadow-xl bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-black text-primary uppercase">{group.section}</CardTitle>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
                       <MapPin className="h-3 w-3 text-primary/40" /> {group.where}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2 border-primary/20 hover:bg-primary/10 text-primary font-black text-[10px] uppercase" asChild>
                    <a href={group.url} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                      Acceder
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  {group.fields.map((field) => (
                    <Tooltip key={field.id}>
                      <TooltipTrigger asChild>
                        <div className="bg-white/80 p-4 rounded-2xl border border-primary/10 flex items-center justify-between cursor-help hover:border-primary transition-all group shadow-sm">
                          <span className="text-sm font-bold text-slate-800">{field.label}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[9px] uppercase font-black px-3 py-1 bg-primary/5 border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">¿Cómo rellenar?</Badge>
                            <Info className="h-4 w-4 text-primary/40 group-hover:text-primary" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] rounded-[1.5rem] p-4 bg-slate-900 text-white border-none shadow-2xl">
                        <p className="text-xs font-medium leading-relaxed">{field.hint}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>

      <div className="bg-emerald-50 p-6 rounded-[2.5rem] border-2 border-emerald-100 flex gap-4 items-center shadow-inner">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 shrink-0" />
        <div className="space-y-1">
           <h4 className="font-black text-xs uppercase text-emerald-900">REGLA DE ORO</h4>
           <p className="text-[10px] text-emerald-800 leading-normal font-bold">
             Usa siempre letra MAYÚSCULA y bolígrafo NEGRO. Asegúrate de que los nombres coincidan exactamente con tu pasaporte para evitar retrasos en Jaén.
           </p>
        </div>
      </div>
    </section>
  );
}
