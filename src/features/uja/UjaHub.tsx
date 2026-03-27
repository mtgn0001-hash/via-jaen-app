"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck, 
  Bus, 
  Zap,
  Globe,
  Award
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";

export function UjaHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-indigo-600 uppercase tracking-tighter">Estudiar UJA</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Exclusivo: Universidad de Jaén y Ayudas Académicas</p>
        </div>
        <SpeechButton text="Estudiar en la UJA. Becas y servicios académicos exclusivos de la Universidad de Jaén." language={lang} />
      </div>

      {/* BECAS Y AYUDAS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Award className="h-3 w-3" /> Becas y Bonificaciones
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Bonificación del 99%"
            description="Iniciativa de la Junta de Andalucía para premiar el esfuerzo: paga solo el 1% de tus créditos aprobados."
            url={OFFICIAL_LINKS.uja.bonificacion99}
            lseInstructions="Cómo se aplica automáticamente el descuento del 99% en tu matrícula de la UJA."
            triggerLabel="Ver Requisitos 99%"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Beca MEC"
              description="Becas de carácter general del Ministerio de Educación."
              url={OFFICIAL_LINKS.juntaAndalucia.becasMec}
              triggerLabel="Beca General"
              variant="secondary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Beca 6000"
              description="Ayuda para alumnos de post-obligatoria de la Junta de Andalucía."
              url={OFFICIAL_LINKS.juntaAndalucia.beca6000}
              triggerLabel="Beca 6000"
              variant="secondary"
              lang={lang}
            />
          </div>
          <ResourceLauncher 
            title="Beca Adriano"
            description="Para alumnos que no cumplen requisitos de renta de la beca general."
            url={OFFICIAL_LINKS.juntaAndalucia.becaAdriano}
            triggerLabel="Beca Adriano / 2ª Oportunidad"
            variant="outline"
            lang={lang}
          />
        </div>
      </section>

      {/* GESTIÓN ACADÉMICA */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Zap className="h-3 w-3" /> Servicios Campus Las Lagunillas
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Automatrícula"
            description="Acceso al portal de automatrícula oficial de la Universidad de Jaén."
            url={OFFICIAL_LINKS.uja.matricula}
            triggerLabel="Automatrícula UJA"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Campus Virtual"
              description="Acceso a Plate@ para contenidos de asignaturas."
              url={OFFICIAL_LINKS.uja.platea}
              triggerLabel="Plate@"
              variant="secondary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Consulta Notas"
              description="Consulta de expedientes y calificaciones académicas."
              url={OFFICIAL_LINKS.uja.notas}
              triggerLabel="Mis Notas"
              variant="secondary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* INTERNACIONAL Y MOVILIDAD */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Globe className="h-3 w-3" /> Movilidad
        </h4>
        <ResourceLauncher 
          title="Erasmus+ y Movilidad"
          description="Ayudas para estancias en el extranjero para estudiantes de la UJA."
          url={OFFICIAL_LINKS.uja.erasmus}
          triggerLabel="Becas Erasmus+ UJA"
          variant="outline"
          lang={lang}
        />
      </section>

      {/* TRANSPORTE */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Bus className="h-3 w-3" /> Transporte al Campus
        </h4>
        <Card className="border-none bg-slate-50 rounded-3xl border border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-black text-xs text-indigo-900 uppercase">Buses Lagunillas</h5>
                <p className="text-[10px] text-indigo-800/60 font-bold uppercase">Líneas 4, 7, 12, 14, 17</p>
              </div>
            </div>
            <ResourceLauncher 
              title="Horarios Autobús"
              description="Consulta las líneas del Consorcio que suben a la Universidad."
              url={OFFICIAL_LINKS.transporte.horariosUja}
              triggerLabel="HORARIOS"
              variant="outline"
              lang={lang}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
