"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Languages, 
  Home, 
  Bus, 
  ExternalLink, 
  Phone,
  FileCheck,
  MapPin,
  Building2,
  BookOpen,
  Info,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";

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
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-primary uppercase">{uni.name}</h2>
              <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Educación Superior en Jaén</p>
            </div>
          </div>
          <SpeechButton text={`${uni.name}. ${s.subtitle}`} language={lang} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button 
          onClick={() => window.open(OFFICIAL_LINKS.uja.home, "_blank")}
          className="w-full h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase"
        >
          Ir a la Página Principal UJA
        </Button>
        <Card className="border-none bg-primary/5 rounded-3xl overflow-hidden shadow-sm">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Relaciones Internacionales</h4>
                <p className="text-[10px] text-muted-foreground">Edificio C2 - Campus Las Lagunillas</p>
              </div>
            </div>
            <Button size="sm" className="rounded-xl h-10 px-4 font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95" asChild>
              <a href={`tel:${uni.phone.replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4 mr-2" /> Llamar
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="access" className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-14 bg-muted/50 p-1.5 rounded-[20px]">
          <TabsTrigger value="access" className="rounded-[14px]"><BookOpen className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="homologation" className="rounded-[14px]"><FileCheck className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="languages" className="rounded-[14px]"><Languages className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="housing" className="rounded-[14px]"><Home className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="transport" className="rounded-[14px]"><Bus className="h-4 w-4" /></TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Building2 className="h-5 w-5" />
                  <CardTitle className="text-lg">Acceso y Matrícula</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <ResourceLauncher 
                title="Automatrícula UJA"
                description="Entra directamente al sistema de gestión académica para formalizar tu plaza."
                url={OFFICIAL_LINKS.uja.matricula}
                triggerLabel="Acceder a Matrícula"
                lang={lang}
              />
              <ResourceLauncher 
                title="Portal de Acceso (Acceso Estudios)"
                description="Información detallada sobre preinscripción y requisitos para nuevos alumnos."
                url={OFFICIAL_LINKS.uja.acceso}
                triggerLabel="Portal de Acceso"
                variant="outline"
                lang={lang}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homologation" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-amber-50 p-3.5 rounded-2xl shadow-inner">
                  <FileCheck className="h-7 w-7 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg leading-tight">Homologación de Títulos</h4>
                  <p className="text-xs text-muted-foreground">
                    Para estudiar en la UJA necesitas que tus estudios previos sean reconocidos oficialmente.
                  </p>
                </div>
              </div>
              <Button className="w-full rounded-2xl h-12 gap-2 bg-slate-900" asChild>
                <a href="https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/gestion-titulos/estudios-universitarios/titulos-extranjeros/equivalencia-notas-medias.html" target="_blank">
                  Web de Equivalencias <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
            <CardHeader className="bg-green-50/50 pb-4">
              <div className="flex items-center gap-2 font-bold text-green-700">
                <Globe className="h-5 w-5" />
                <CardTitle className="text-lg">Idiomas (CEALM)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <ResourceLauncher 
                title="Centro de Estudios Avanzados en Lenguas Modernas"
                description="Cursos de español para extranjeros y certificaciones de idiomas oficiales."
                url={OFFICIAL_LINKS.uja.cealm}
                triggerLabel="Ver Cursos de Idiomas"
                lang={lang}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housing" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white rounded-3xl">
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl h-fit">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Alojamiento Universitario</h4>
                  <p className="text-xs text-muted-foreground">Consulta la bolsa de pisos y residencias de la UJA.</p>
                </div>
              </div>
              <ResourceLauncher 
                title="Buscador de Alojamiento UJA"
                description="Acceso al portal de alojamiento oficial de la universidad."
                url={OFFICIAL_LINKS.uja.alojamiento}
                triggerLabel="Ver Disponibilidad"
                lang={lang}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="bg-slate-100 p-4 rounded-2xl">
                  <Bus className="h-7 w-7 text-slate-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Transporte al Campus</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Líneas 4, 7 y 12 del bus urbano de Jaén.
                  </p>
                </div>
              </div>
              <Button className="w-full rounded-2xl h-12 gap-2" variant="secondary" asChild>
                <a href={OFFICIAL_LINKS.transporte.horariosUja} target="_blank">
                  Ver Horarios Consorcio <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}