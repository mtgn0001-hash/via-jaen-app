
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Info, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FormVisualGuideProps = {
  lang: Language;
};

export function FormVisualGuide({ lang }: FormVisualGuideProps) {
  const t = translations[lang];

  const guideFields = [
    { section: "Datos del Solicitante", fields: [
      { id: "nie", label: "PASAPORTE / NIE", hint: "Si es tu primera vez, pon tu número de pasaporte completo." },
      { id: "address", label: "DOMICILIO", hint: "Debe ser el mismo que aparece en tu volante de empadronamiento." }
    ]},
    { section: "Tipo de Autorización", fields: [
      { id: "arraigo", label: "CASILLA 4 (Arraigo)", hint: "Marca esta casilla si solicitas residencia por circunstancias excepcionales." }
    ]},
    { section: "Tasas 790-012", fields: [
      { id: "tie", label: "TIE Inicial", hint: "Suele ser el apartado 'Certificado de registro' o 'TIE que documenta la primera concesión'." }
    ]}
  ];

  return (
    <section className="space-y-6 pb-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-xl">{t.forms} - Guía Visual</h3>
        </div>
        <p className="text-xs text-muted-foreground">Toca los campos para saber qué poner.</p>
      </div>

      <TooltipProvider>
        <div className="grid gap-4">
          {guideFields.map((group) => (
            <Card key={group.section} className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-3xl overflow-hidden shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase font-black tracking-widest text-primary/60">{group.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.fields.map((field) => (
                  <Tooltip key={field.id}>
                    <TooltipTrigger asChild>
                      <div className="bg-white p-3 rounded-xl border flex items-center justify-between cursor-help hover:border-primary transition-colors group">
                        <span className="text-sm font-bold">{field.label}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[8px] uppercase font-black group-hover:bg-primary group-hover:text-white transition-colors">¿Cómo rellenar?</Badge>
                          <Info className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[200px] rounded-xl p-3 bg-slate-900 text-white border-none">
                      <p className="text-xs font-medium leading-relaxed">{field.hint}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
        <p className="text-[10px] text-emerald-800 leading-tight font-medium">
          Consejo: Siempre usa letra MAYÚSCULA y bolígrafo NEGRO para que el escáner de la oficina lo lea correctamente.
        </p>
      </div>
    </section>
  );
}
