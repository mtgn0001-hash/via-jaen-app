"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  School, 
  Baby, 
  Heart, 
  Wallet, 
  ExternalLink, 
  Info,
  Calendar,
  MapPin,
  Stethoscope,
  TreePine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgeCalculator } from "./AgeCalculator";

type FamilyResourcesProps = {
  lang: Language;
};

export function FamilyResources({ lang }: FamilyResourcesProps) {
  const t = translations[lang];
  const f = t.familyResources;

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{f.title}</h2>
        <p className="text-muted-foreground text-sm">{f.subtitle}</p>
      </div>

      <AgeCalculator lang={lang} />

      <Tabs defaultValue="education" className="w-full">
        <TabsList className="grid grid-cols-4 w-full h-12 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="education" className="rounded-xl"><School className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="aids" className="rounded-xl"><Wallet className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="health" className="rounded-xl"><Heart className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="leisure" className="rounded-xl"><TreePine className="h-4 w-4" /></TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <School className="h-5 w-5" />
                <CardTitle className="text-lg">{f.education}</CardTitle>
              </div>
              <CardDescription className="text-primary/70 font-medium">{f.marchNote}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-sm mb-1">{f.escolarizacion}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    La escolarización en Andalucía es obligatoria desde los 6 años, pero gratuita y recomendada desde los 3.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary mt-2" asChild>
                    <a href="https://www.juntadeandalucia.es/educacion/portals/web/escolarizacion" target="_blank">
                      Buscador de Centros (Jaén/Linares/Úbeda) <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[f.comedor, f.aulaMatinal, f.extraescolares].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2 px-3 rounded-lg border text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
                
                <p className="text-[10px] text-muted-foreground italic">
                  * Existen bonificaciones del 10 al 100% según la renta familiar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aids" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <AidCard 
              title={f.imv} 
              desc="Ayuda estatal para hogares con bajos ingresos." 
              link="https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d1a-6d06-4551-91e7-bc74a613703a"
            />
            <AidCard 
              title={f.rentaMinima} 
              desc="Prestación económica de la Junta de Andalucía." 
              link="https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad/areas/inclusion/renta-minima.html"
            />
            <AidCard 
              title={f.childAid} 
              desc="Complemento de ayuda para la infancia." 
              link="https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d1a-6d06-4551-91e7-bc74a613703a/simulador"
            />
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-red-50 p-3 rounded-2xl">
                  <Stethoscope className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{f.healthApp}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gestiona las citas del pediatra y vacunas desde tu móvil.
                  </p>
                </div>
              </div>
              <Button className="w-full rounded-xl gap-2 h-11" variant="outline" asChild>
                <a href="https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/" target="_blank">
                  {f.pediatra} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leisure" className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex gap-4">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Parque del Bulevar (Jaén)</h4>
                  <p className="text-xs text-muted-foreground">Áreas infantiles, paseos y zonas de sombra.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex gap-4">
                <Calendar className="h-5 w-5 text-secondary shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">{f.summerSchool}</h4>
                  <p className="text-xs text-muted-foreground">Organizadas por el Ayuntamiento en julio y agosto para facilitar la conciliación.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AidCard({ title, desc, link }: { title: string; desc: string; link: string }) {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardContent className="p-4">
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{desc}</p>
        <Button variant="secondary" size="sm" className="w-full rounded-lg text-[10px] h-8 font-bold" asChild>
          <a href={link} target="_blank">Ver Requisitos <ExternalLink className="h-3 w-3 ml-1" /></a>
        </Button>
      </CardContent>
    </Card>
  );
}
