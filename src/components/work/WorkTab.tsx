
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Info, Home, Phone, MapPin, Scale } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";

type WorkTabProps = {
  lang: Language;
};

export function WorkTab({ lang }: WorkTabProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();
  const currentProvince = provincesData[progress.province] || provincesData.jaen;
  const work = currentProvince.work;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{t.work.title}</h2>
          <p className="text-sm text-muted-foreground">Situación laboral en <span className="font-black text-primary">{currentProvince.name}</span></p>
        </div>
        <SpeechButton text={`${t.work.title}. ${currentProvince.name}`} language={lang} />
      </div>

      <Card className="border-none bg-primary/5 rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
            <Briefcase className="h-5 w-5 text-primary" />
            {work.campaign}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed font-medium">{work.desc}</p>
          <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-black text-sm text-primary flex items-center gap-2 uppercase">
                <Scale className="h-4 w-4" /> {t.work.rights}
              </h4>
              <SpeechButton text={t.work.rightsText} language={lang} />
            </div>
            <p className="text-xs text-muted-foreground leading-normal font-medium">
              {t.work.rightsText}
            </p>
          </div>
        </CardContent>
      </Card>

      {work.shelters.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-lg flex items-center gap-2 uppercase text-slate-800">
              <Home className="h-5 w-5 text-secondary" /> {t.work.shelterTitle}
            </h3>
            <SpeechButton text={t.work.shelterTitle} language={lang} />
          </div>
          <div className="grid gap-3">
            {work.shelters.map((s) => (
              <Card key={s.city} className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="bg-secondary/10 p-2.5 rounded-xl">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{s.city}</h4>
                      <p className="text-[10px] text-muted-foreground font-black uppercase">{s.open}</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${s.phone.replace(/\s/g, '')}`}
                    className="bg-primary text-white px-5 py-2.5 rounded-2xl text-[12px] font-black flex items-center gap-2 shadow-md active:scale-95 transition-transform"
                  >
                    <Phone className="h-4 w-4" /> {s.phone}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <section className="bg-slate-50 p-5 rounded-3xl border flex gap-3">
        <Info className="h-5 w-5 text-slate-400 shrink-0" />
        <p className="text-[11px] text-slate-500 italic font-medium">
          {t.work.shelterNote}
        </p>
      </section>
    </div>
  );
}
