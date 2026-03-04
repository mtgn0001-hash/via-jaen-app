
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
                  <CardTitle className="text-lg">{s.access}</CardTitle>
                </div>
                <SpeechButton text={`${s.access}. ${s.accessDesc}`} language={lang} />
              </div>
              <CardDescription className="text-xs font-medium">{s.accessDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h4 className="font-bold text-sm">Distrito Único Andaluz (DUA)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Para estudiar en la UJA, debes solicitar plaza a través del portal de la Junta de Andalucía.
                </p>
                <Button variant="outline" className="w-full rounded-xl h-11 font-bold text-primary border-primary/20 bg-white" asChild>
                  <a href="https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/" target="_blank">
                    Ir al Portal DUA <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl border-2 border-primary/5 bg-white text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Grados</p>
                  <span className="text-sm font-bold text-primary">Preinscripción Junio/Julio</span>
                </div>
                <div className="p-3 rounded-xl border-2 border-primary/5 bg-white text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Máster</p>
                  <span className="text-sm font-bold text-primary">Varias Fases</span>
                </div>
              </div>
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
                  <h4 className="font-bold text-lg leading-tight">{s.homologation}</h4>
                  <p className="text-xs text-muted-foreground">
                    {s.homologationDesc}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold">Documentos necesarios:</span>
                </div>
                <ul className="text-[10px] space-y-1 text-muted-foreground font-medium">
                  <li>• Título oficial con Apostilla de la Haya.</li>
                  <li>• Certificado de calificaciones (notas).</li>
                  <li>• Traducción jurada (si no está en español).</li>
                </ul>
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
                <CardTitle className="text-lg">{s.languages}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="font-bold text-sm">Centro de Estudios Avanzados en Lenguas Modernas (CEALM)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ofrecen cursos específicos de español para extranjeros y otros idiomas para la comunidad universitaria.
                </p>
              </div>
              <Button className="w-full rounded-2xl h-12 gap-2" variant="secondary" asChild>
                <a href="https://www.ujaen.es/servicios/cealm/" target="_blank">
                  Ver Cursos de Idiomas <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="housing" className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Card className="border-none shadow-sm bg-white rounded-3xl">
              <CardContent className="p-5 flex gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl h-fit">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Residencias Universitarias UJA</h4>
                  <p className="text-xs text-muted-foreground">Domingo Savio y Apartamentos Universitarios en el propio campus.</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 bg-muted/30 rounded-2xl border-2 border-dashed flex flex-col items-center text-center gap-2">
              <Home className="h-6 w-6 text-muted-foreground" />
              <p className="text-xs font-bold">Buscador de Alojamiento Externo</p>
              <p className="text-[10px] text-muted-foreground">La UJA dispone de una bolsa de pisos para estudiantes en los barrios de El Valle y El Bulevar.</p>
              <Button variant="link" className="h-auto p-0 text-primary font-black uppercase text-[10px] tracking-widest" asChild>
                <a href={uni.url} target="_blank">Consultar Bolsa</a>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="bg-slate-100 p-4 rounded-2xl">
                  <Bus className="h-7 w-7 text-slate-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{s.transport}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa la tarjeta del Consorcio o el carnet UJA para descuentos en los buses urbanos (Línea 4, 7, 12, 14, 17).
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Línea 4</p>
                  <p className="text-xs font-bold">UJA - Centro</p>
                </div>
                <div className="p-2 border rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Línea 7</p>
                  <p className="text-xs font-bold">UJA - Bulevar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="bg-primary p-6 rounded-[32px] text-white shadow-xl shadow-primary/20">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Globe className="h-5 w-5" /> ¿Eres estudiante internacional?
        </h3>
        <p className="text-xs text-white/80 leading-relaxed mb-4">
          El Edificio C2 del Campus Las Lagunillas es tu punto de referencia para cualquier duda sobre movilidad, visados de estudios y becas.
        </p>
        <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-12 font-bold" asChild>
          <a href={uni.internationalUrl} target="_blank">
            Web de Internacionalización <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </section>
    </div>
  );
}
