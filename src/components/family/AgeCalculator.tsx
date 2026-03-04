"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, GraduationCap, Calendar, Info } from "lucide-react";

type AgeCalculatorProps = {
  lang: Language;
};

export function AgeCalculator({ lang }: AgeCalculatorProps) {
  const t = translations[lang];
  const f = t.familyResources;
  const [age, setAge] = useState<string>("");

  const getStage = (ageNum: number) => {
    if (ageNum < 0) return null;
    if (ageNum < 3) return { stage: "Primer Ciclo Infantil (Guardería)", action: "Solicitud en Abril/Mayo", icon: Baby, color: "bg-blue-500" };
    if (ageNum >= 3 && ageNum <= 5) return { stage: "Educación Infantil", action: "Matriculación en MARZO", icon: GraduationCap, color: "bg-green-500" };
    if (ageNum >= 6 && ageNum <= 11) return { stage: "Educación Primaria (Obligatoria)", action: "Matriculación en MARZO", icon: GraduationCap, color: "bg-primary" };
    if (ageNum >= 12 && ageNum <= 15) return { stage: "ESO (Secundaria Obligatoria)", action: "Matriculación en MARZO", icon: GraduationCap, color: "bg-purple-500" };
    if (ageNum >= 16) return { stage: "Bachillerato / FP / Universidad", action: "Consultar plazos específicos", icon: GraduationCap, color: "bg-slate-700" };
    return null;
  };

  const stageInfo = age ? getStage(parseInt(age)) : null;

  return (
    <Card className="border-2 border-primary/20 bg-primary/5 rounded-3xl overflow-hidden shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary p-2 rounded-xl">
            <Baby className="h-5 w-5 text-white" />
          </div>
          <div className="grid">
            <h3 className="font-bold text-sm leading-none">{f.calculatorTitle}</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{f.calculatorDesc}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input 
              type="number" 
              placeholder="Edad del niño/a" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12 rounded-2xl border-none shadow-sm text-lg font-bold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold uppercase">
              Años
            </div>
          </div>

          {stageInfo && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border-2 border-primary/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`${stageInfo.color} p-2 rounded-lg`}>
                    <stageInfo.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-bold text-sm">{stageInfo.stage}</div>
                </div>
                
                <div className="flex items-center gap-2 bg-amber-50 p-2 px-3 rounded-xl border border-amber-100">
                  <Calendar className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-amber-700">{stageInfo.action}</span>
                </div>

                <div className="flex gap-2 items-start text-[10px] text-muted-foreground leading-normal">
                  <Info className="h-3 w-3 mt-0.5 shrink-0" />
                  <p>En Andalucía, la solicitud de plaza escolar se realiza principalmente durante todo el mes de marzo para el curso siguiente.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
