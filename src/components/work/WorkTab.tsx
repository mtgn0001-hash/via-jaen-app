
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Info, Home, Phone, MapPin, Scale } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";

type WorkTabProps = {
  lang: Language;
};

export function WorkTab({ lang }: WorkTabProps) {
  const t = translations[lang];
  const w = t.work;

  const shelters = [
    { city: "Jaén", phone: "953 219 100", open: "Nov-Feb" },
    { city: "Martos", phone: "953 210 000", open: "Nov-Ene" },
    { city: "Úbeda", phone: "953 750 440", open: "Campaña Aceituna" },
    { city: "Villacarrillo", phone: "953 440 000", open: "Nov-Feb" },
    { city: "Alcalá la Real", phone: "953 580 000", open: "Campaña" },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{w.title}</h2>
          <p className="text-sm text-muted-foreground">{w.subtitle}</p>
        </div>
        <SpeechButton text={`${w.title}. ${w.subtitle}`} language={lang} />
      </div>

      <Card className="border-none bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            {w.oliveCampaign}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{w.oliveDesc}</p>
          <div className="bg-white p-4 rounded-xl border space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                <Scale className="h-4 w-4" /> {w.rights}
              </h4>
              <SpeechButton text={w.rightsText} language={lang} />
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              {w.rightsText}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Home className="h-5 w-5 text-secondary" /> {w.shelterTitle}
          </h3>
          <SpeechButton text={w.shelterTitle} language={lang} />
        </div>
        <div className="grid gap-3">
          {shelters.map((s) => (
            <Card key={s.city} className="border-none shadow-sm bg-white overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{s.city}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase">{s.open}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${s.phone.replace(/\s/g, '')}`}
                  className="bg-muted px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
                >
                  <Phone className="h-3 w-3" /> {s.phone}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="bg-slate-50 p-4 rounded-2xl border flex gap-3">
        <Info className="h-5 w-5 text-slate-400 shrink-0" />
        <p className="text-[10px] text-slate-500 italic">
          {w.shelterNote}
        </p>
      </section>
    </div>
  );
}
