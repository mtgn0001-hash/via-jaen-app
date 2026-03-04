
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, CreditCard, ExternalLink, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";

type TransportTabProps = {
  lang: Language;
};

export function TransportTab({ lang }: TransportTabProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();
  const currentProvince = provincesData[progress.province] || provincesData.jaen;
  const transport = currentProvince.transport;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{t.transport.title}</h2>
          <p className="text-sm text-muted-foreground">{t.transport.subtitle} en <span className="font-black text-primary">{currentProvince.name}</span></p>
        </div>
        <SpeechButton text={`${t.transport.title}. ${currentProvince.name}`} language={lang} />
      </div>

      <Card className="border-none shadow-md overflow-hidden bg-white">
        <CardHeader className="bg-primary/5 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              {transport.name}
            </CardTitle>
            <SpeechButton text={transport.desc} language={lang} />
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {transport.desc}
          </p>
          <Button className="w-full rounded-xl h-12 gap-2" asChild>
            <a href={transport.url} target="_blank" rel="noopener noreferrer">
              {t.transport.webLink} <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="border-none bg-blue-50 border-blue-100">
          <CardContent className="p-4 flex gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-blue-900">{t.transport.cardTitle}</h4>
                <SpeechButton text={t.transport.cardDesc} language={lang} />
              </div>
              <p className="text-xs text-blue-800/70 leading-relaxed">
                {t.transport.cardDesc}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-slate-100">
          <CardContent className="p-4 flex gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
              <MapPin className="h-6 w-6 text-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">{t.transport.pointsTitle}</h4>
                <SpeechButton text={t.transport.pointsDesc} language={lang} />
              </div>
              <p className="text-xs text-slate-800/70 leading-relaxed">
                {t.transport.pointsDesc}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3">
        <Info className="h-5 w-5 text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-700 font-medium">
          {t.transport.transportTip}
        </p>
      </section>
    </div>
  );
}
