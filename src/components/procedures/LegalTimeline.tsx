
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, History, ShieldCheck, Flag, CheckCircle2 } from "lucide-react";

type LegalTimelineProps = {
  lang: Language;
};

export function LegalTimeline({ lang }: LegalTimelineProps) {
  // Safe access to translations with fallback to Spanish
  const langPack = translations[lang] || translations.es;
  const t = langPack.arraigo || translations.es.arraigo;
  
  const [nationality, setNationality] = useState<string>("");
  const [entryDate, setEntryDate] = useState<string>("");
  const [calculated, setCalculated] = useState(false);

  const calculateMilestones = () => {
    if (!entryDate) return [];
    const entry = new Date(entryDate);
    
    // Milestones
    const arraigoFormacion = new Date(entry);
    arraigoFormacion.setFullYear(entry.getFullYear() + 2);

    const arraigoSocial = new Date(entry);
    arraigoSocial.setFullYear(entry.getFullYear() + 3);

    let nationalYears = 10;
    if (nationality === "ibero" || nationality === "philippines" || nationality === "equatorial") nationalYears = 2;
    if (nationality === "refugee") nationalYears = 5;
    
    const nationalDate = new Date(entry);
    nationalDate.setFullYear(entry.getFullYear() + nationalYears);

    return [
      { date: arraigoFormacion, title: "Arraigo para la Formación", icon: History, color: "bg-blue-500" },
      { date: arraigoSocial, title: "Arraigo Social", icon: ShieldCheck, color: "bg-primary" },
      { date: nationalDate, title: "Nacionalidad Española", icon: Flag, color: "bg-red-500" },
    ];
  };

  const milestones = calculateMilestones();

  return (
    <Card className="border-none bg-slate-50 rounded-3xl overflow-hidden shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">{t.title}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">{t.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t.q1}</label>
            <Select onValueChange={setNationality}>
              <SelectTrigger className="h-12 rounded-2xl border-none shadow-sm font-bold bg-white">
                <SelectValue placeholder="Selecciona..." />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="general" className="font-bold">General (10 años nac.)</SelectItem>
                <SelectItem value="ibero" className="font-bold">Iberoamérica / Marruecos (2 años)</SelectItem>
                <SelectItem value="refugee" className="font-bold">Refugiado (5 años)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t.q2}</label>
            <Input 
              type="date" 
              value={entryDate} 
              onChange={(e) => setEntryDate(e.target.value)}
              className="h-12 rounded-2xl border-none shadow-sm font-bold bg-white"
            />
          </div>

          <Button 
            onClick={() => setCalculated(true)} 
            disabled={!entryDate}
            className="w-full h-12 rounded-xl text-md font-bold"
          >
            Ver Línea de Tiempo
          </Button>

          {calculated && entryDate && (
            <div className="pt-6 relative">
              <div className="absolute left-[19px] top-6 bottom-0 w-0.5 bg-primary/20" />
              <div className="space-y-8 relative">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className={`${m.color} h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0 z-10 shadow-lg`}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
                      <h4 className="font-bold text-sm text-primary">{m.title}</h4>
                      <p className="text-xs font-black text-slate-500 mt-1 uppercase">
                        {m.date.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground bg-slate-50 p-1.5 rounded-lg w-fit">
                        <CheckCircle2 className="h-3 w-3" /> Requisito de residencia continua
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
