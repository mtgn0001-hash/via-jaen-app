
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, CreditCard, ExternalLink, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechButton } from "@/components/ui/SpeechButton";

type TransportTabProps = {
  lang: Language;
};

export function TransportTab({ lang }: TransportTabProps) {
  const t = translations[lang];
  const tr = t.transport;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{tr.title}</h2>
          <p className="text-sm text-muted-foreground">{tr.subtitle}</p>
        </div>
        <SpeechButton text={`${tr.title}. ${tr.subtitle}`} language={lang} />
      </div>

      <Card className="border-none shadow-md overflow-hidden bg-white">
        <CardHeader className="bg-primary/5 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              {tr.consortiumTitle}
            </CardTitle>
            <SpeechButton text={tr.consortiumDesc} language={lang} />
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tr.consortiumDesc}
          </p>
          <Button className="w-full rounded-xl h-12 gap-2" asChild>
            <a href="https://jaen.ctas.cti.es/" target="_blank" rel="noopener noreferrer">
              {tr.webLink} <ExternalLink className="h-4 w-4" />
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
                <h4 className="font-bold text-sm text-blue-900">{tr.cardTitle}</h4>
                <SpeechButton text={tr.cardDesc} language={lang} />
              </div>
              <p className="text-xs text-blue-800/70 leading-relaxed">
                {tr.cardDesc}
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
                <h4 className="font-bold text-sm text-slate-900">{tr.pointsTitle}</h4>
                <SpeechButton text={tr.pointsDesc} language={lang} />
              </div>
              <p className="text-xs text-slate-800/70 leading-relaxed">
                {tr.pointsDesc}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3">
        <Info className="h-5 w-5 text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-700 font-medium">
          {tr.transportTip}
        </p>
      </section>
    </div>
  );
}
