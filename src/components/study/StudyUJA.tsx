"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Map, 
  Languages, 
  Home, 
  Bus, 
  ExternalLink, 
  Phone,
  FileCheck,
  MapPin,
  Building2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

type StudyUJAProps = {
  lang: Language;
};

export function StudyUJA({ lang }: StudyUJAProps) {
  const t = translations[lang];
  const s = t.studyUJA;

  const campusLocations = [
    { name: 'Secretaría / Relaciones Int. (C2)', url: 'https://maps.app.goo.gl/jaen_campus_c2' },
    { name: 'Biblioteca Central (R1)', url: 'https://maps.app.goo.gl/jaen_campus_r1' },
    { name: 'Comedor Universitario', url: 'https://maps.app.goo.gl/jaen_campus_comedor' },
    { name: 'Campus de Linares', url: 'https://maps.app.goo.gl/linares_campus' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="bg-[#612d8a] p-2 rounded-xl">
            <GraduationCap className="h-6 w-6 text-[#c5a059]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#612d8a]">{s.title}</h2>
        </div>
        <p className="text-muted-foreground text-sm">{s.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          className="bg-[#612d8a] hover:bg-[#4d246e] text-white rounded-2xl h-14 flex items-center justify-between px-6 shadow-lg transition-all active:scale-95"
          asChild
        >
          <a href="tel:+34953212121">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#c5a059]" />
              <span className="font-bold">{s.contactSecretariat}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">+34 953 21 21 21</span>
          </a>
        </Button>
      </div>

      <Tabs defaultValue="access" className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-12 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="access" className="rounded-xl"><Building2 className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="homologation" className="rounded-xl"><FileCheck className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="housing" className="rounded-xl"><Home className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="transport" className="rounded-xl"><Bus className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="languages" className="rounded-xl"><Languages className="h-4 w-4" /></TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-[#612d8a]/5 pb-4">
              <div className="flex items-center gap-2 text-[#612d8a] font-bold">
                <Building2 className="h-5 w-5" />
                <CardTitle className="text-lg">{s.access}</CardTitle>
              </div>
              <CardDescription className="text-[#612d8a]/70">{s.accessDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-sm mb-1">Preinscripción DUA</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Todo el acceso universitario en Andalucía se gestiona a través del Distrito Único Andaluz.
                </p>
                <Button variant="link" className="p-0 h-auto text-xs font-bold text-[#612d8a] mt-2" asChild>
                  <a href="https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/" target="_blank">
                    Ir al Distrito Único Andaluz <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <BadgeItem label={s.degree} />
                <BadgeItem label={s.master} />
                <BadgeItem label={s.scholarships} />
                <BadgeItem label="Erasmus+" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homologation" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-amber-50 p-3 rounded-2xl">
                  <FileCheck className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{s.homologation}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.homologationDesc}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-xs uppercase text-slate-500 mb-1">{s.apostille}</h5>
                  <p className="text-xs">Tus títulos deben estar legalizados por el Convenio de La Haya para ser válidos.</p>
                </div>
                <Button className="w-full rounded-xl gap-2 h-11 bg-slate-800" asChild>
                  <a href="https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/gestion-titulos/estudios-universitarios/titulos-extranjeros/equivalencia-notas-medias.html" target="_blank">
                    {s.equivalence} <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housing" className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex gap-4">
                <MapPin className="h-5 w-5 text-[#612d8a] shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Barrios en Jaén</h4>
                  <p className="text-xs text-muted-foreground">Av. de Andalucía (El Gran Eje), El Valle (cerca UJA), Bulevar.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white border-2 border-[#612d8a]/10">
              <CardContent className="p-4">
                <h4 className="text-sm font-bold mb-2">Alojamiento UJA</h4>
                <p className="text-xs text-muted-foreground mb-3">Plataforma oficial para buscar pisos y residencias.</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl text-[#612d8a] border-[#612d8a]" asChild>
                  <a href="https://www.ujaen.es/servicios/alojamiento" target="_blank">Ver Plataforma <ExternalLink className="h-3 w-3 ml-1" /></a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 p-3 rounded-2xl">
                  <Bus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Tarjeta TUI</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tu carnet universitario para buses, biblioteca y descuentos.
                  </p>
                </div>
              </div>
              <div className="bg-[#612d8a]/5 p-3 rounded-xl">
                <h5 className="font-bold text-xs text-[#612d8a]">Campus Linares</h5>
                <p className="text-xs text-muted-foreground">Conexión directa en bus desde la Estación de Autobuses de Jaén (45 min).</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-green-50 p-3 rounded-2xl">
                  <Languages className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Español en el CEALM</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cursos intensivos y semestrales de lengua española.
                  </p>
                </div>
              </div>
              <Button className="w-full rounded-xl h-11" variant="secondary" asChild>
                <a href="https://www.ujaen.es/centro-de-estudios-avanzados-en-lenguas-modernas" target="_blank">
                  Web del CEALM <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-[#612d8a]">
          <Map className="h-5 w-5" /> {s.mapTitle}
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {campusLocations.map((loc) => (
            <a 
              key={loc.name}
              href={loc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <span className="text-xs font-bold text-slate-700">{loc.name}</span>
              <MapPin className="h-4 w-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function BadgeItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 p-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white">
      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
      {label}
    </div>
  );
}
