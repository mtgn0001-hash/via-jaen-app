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
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";

type StudyUJAProps = {
  lang: Language;
};

export function StudyUJA({ lang }: StudyUJAProps) {
  const t = translations[lang];
  const s = t.studyUJA;
  const { progress } = useLocalStorage();
  const currentProvince = provincesData[progress.province] || provincesData.jaen;
  const uni = currentProvince.university;

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">{uni.name}</h2>
        </div>
        <p className="text-muted-foreground text-sm">{s.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          className="rounded-2xl h-14 flex items-center justify-between px-6 shadow-lg bg-primary text-white"
          asChild
        >
          <a href={`tel:${uni.phone.replace(/\s/g, '')}`}>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span className="font-bold">{s.contactSecretariat}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{uni.phone}</span>
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
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Building2 className="h-5 w-5" />
                <CardTitle className="text-lg">{s.access}</CardTitle>
              </div>
              <CardDescription>{s.accessDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-sm mb-1">Preinscripción DUA</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Todo el acceso universitario en Andalucía se gestiona a través del Distrito Único Andaluz.
                </p>
                <Button variant="link" className="p-0 h-auto text-xs font-bold mt-2 text-primary" asChild>
                  <a href="https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/" target="_blank">
                    Ir al Distrito Único Andaluz <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {s.degree}
                </div>
                <div className="flex items-center gap-2 p-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {s.master}
                </div>
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
              <Button className="w-full rounded-xl gap-2 h-11 bg-slate-800" asChild>
                <a href="https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/gestion-titulos/estudios-universitarios/titulos-extranjeros/equivalencia-notas-medias.html" target="_blank">
                  {s.equivalence} <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housing" className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex gap-4">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Residencias Universitarias</h4>
                  <p className="text-xs text-muted-foreground">Consulta las opciones oficiales de alojamiento de la {uni.name}.</p>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" size="sm" className="w-full rounded-xl h-12" asChild>
              <a href={uni.url} target="_blank">Web de la Universidad <ExternalLink className="h-3 w-3 ml-1" /></a>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-green-50 p-3 rounded-2xl">
                  <Languages className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Español para Extranjeros</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cursos de lengua española para estudiantes internacionales.
                  </p>
                </div>
              </div>
              <Button className="w-full rounded-xl h-11" variant="secondary" asChild>
                <a href={uni.internationalUrl} target="_blank">
                  Relaciones Internacionales <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
