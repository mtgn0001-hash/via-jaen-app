
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, MapPin, Signal } from "lucide-react";

type WifiPointsProps = {
  lang: Language;
};

export function WifiPoints({ lang }: WifiPointsProps) {
  const t = translations[lang].wifi;
  
  const points = [
    { name: 'Biblioteca Provincial', address: 'C. Santo Reino, 1', type: 'Public' },
    { name: 'Ayuntamiento de Jaén', address: 'Plaza de Santa María', type: 'Free' },
    { name: 'Estación de Autobuses', address: 'Plaza de la Libertad', type: 'Public' },
    { name: 'UJA Guest (Campus)', address: 'Las Lagunillas', type: 'Edu' },
    { name: 'Centro Social Bulevar', address: 'Calle Cataluña', type: 'Social' },
  ];

  return (
    <section className="space-y-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-xl">
          <Wifi className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-bold text-lg">{t.title}</h3>
      </div>
      
      <p className="text-xs text-muted-foreground mb-4">
        {t.desc}
      </p>

      <div className="grid gap-3">
        {points.map((p) => (
          <Card key={p.name} className="border-none bg-white shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Signal className="h-5 w-5 text-slate-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{p.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" /> {p.address}
                </div>
              </div>
              <div className="bg-green-100 px-2 py-1 rounded text-[8px] font-black text-green-700 uppercase tracking-tighter">
                FREE
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
