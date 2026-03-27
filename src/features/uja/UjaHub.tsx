"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  GraduationCap, 
  Bus, 
  Zap,
  Globe,
  Award
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function UjaHub({ lang }: { lang: string }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-indigo-700 uppercase tracking-tighter">Estudiar UJA</h3>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Exclusivo: Universidad de Jaén y Ayudas Académicas</p>
        </div>
        <SpeechButton 
          text="Portal del Estudiante UJA. Información sobre la bonificación del 99 por ciento, becas MEC, procesos de matrícula y transporte al campus de Las Lagunillas." 
          language={lang} 
        />
      </div>

      {/* BECAS Y AYUDAS */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase text-indigo-700/80 tracking-widest ml-2 flex items-center gap-2">
            <Award className="h-3 w-3" /> Becas y Bonificaciones
          </h4>
          <SpeechButton text="Ayudas económicas para el estudio. La bonificación del 99 por ciento te permite pagar solo un euro por cada crédito aprobado el año anterior." language={lang} />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Bonificación del 99%"
            description="Iniciativa de la Junta de Andalucía para premiar el esfuerzo: paga solo el 1% de tus créditos aprobados."
            url={OFFICIAL_LINKS.uja.bonificacion99}
            triggerLabel="Ver Requisitos 99%"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Beca MEC"
              description="Becas de carácter general del Ministerio de Educación."
              url={OFFICIAL_LINKS.juntaAndalucia.becasMec}
              triggerLabel="Beca General"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Beca 6000"
              description="Ayuda para alumnos de post-obligatoria de la Junta de Andalucía."
              url={OFFICIAL_LINKS.juntaAndalucia.beca6000}
              triggerLabel="Beca 6000"
              variant="primary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* GESTIÓN ACADÉMICA */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 flex items-center gap-2">
            <Zap className="h-3 w-3" /> Servicios Campus
          </h4>
          <SpeechButton text="Acceso a matrícula, campus virtual Platea y consulta de notas oficiales." language={lang} />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Automatrícula"
            description="Acceso al portal de automatrícula oficial de la Universidad de Jaén."
            url={OFFICIAL_LINKS.uja.matricula}
            triggerLabel="Automatrícula UJA"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Campus Virtual"
              description="Acceso a Plate@ para contenidos de asignaturas."
              url={OFFICIAL_LINKS.uja.platea}
              triggerLabel="Plate@"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Consulta Notas"
              description="Consulta de expedientes y calificaciones académicas."
              url={OFFICIAL_LINKS.uja.notas}
              triggerLabel="Mis Notas"
              variant="primary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* TRANSPORTE */}
      <section className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 flex items-center gap-2">
            <Bus className="h-3 w-3" /> Transporte al Campus
          </h4>
          <SpeechButton text="Horarios de los autobuses que suben a la Universidad. Líneas 4, 7, 12, 14 y 17." language={lang} />
        </div>
        <Card className="border-none bg-indigo-50 rounded-3xl border border-indigo-100">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-sm">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-black text-xs text-indigo-950 uppercase">Buses Lagunillas</h5>
                <p className="text-[10px] text-indigo-800 font-bold uppercase">Líneas 4, 7, 12, 14, 17</p>
              </div>
            </div>
            <ResourceLauncher 
              title="Horarios Autobús"
              description="Consulta las líneas del Consorcio que suben a la Universidad."
              url={OFFICIAL_LINKS.transporte.horariosUja}
              triggerLabel="HORARIOS"
              variant="primary"
              lang={lang}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}