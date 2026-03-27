"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  School, 
  Baby, 
  MapPin,
  Home,
  UserCheck
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function FamilyHub({ lang }: { lang: string }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-emerald-800 uppercase tracking-tighter">Familias y Colegios</h3>
          <p className="text-[12px] text-[#1A1A1B] font-black uppercase tracking-widest">Educación y Ayudas Sociales</p>
        </div>
        <SpeechButton text="Portal para familias. Recursos de educación y ayudas sociales." language={lang} />
      </div>

      {/* VIVIENDA Y SUSTENTO */}
      <section className="space-y-3">
        <h4 className="text-[12px] font-black uppercase text-emerald-800 tracking-widest ml-2 flex items-center gap-2">
          <Home className="h-4 w-4" /> Vivienda y Sustento
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <ResourceLauncher 
            title="Ayuda al Alquiler"
            description="Plan Vive Andalucía y Bono Alquiler Joven en Jaén."
            url={OFFICIAL_LINKS.juntaAndalucia.ayudaAlquiler}
            triggerLabel="Solicitar Alquiler"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResourceLauncher 
              title="Renta Mínima"
              description="RMISA de la Junta de Andalucía."
              url={OFFICIAL_LINKS.juntaAndalucia.rmisa}
              triggerLabel="RMISA"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Bono Carestía"
              description="Pago único para familias con menores."
              url={OFFICIAL_LINKS.juntaAndalucia.bonoCarestia}
              triggerLabel="Bono Carestía"
              variant="primary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* EDUCACIÓN INFANTIL */}
      <section className="space-y-3">
        <h4 className="text-[12px] font-black uppercase text-emerald-800 tracking-widest ml-2 flex items-center gap-2">
          <School className="h-4 w-4" /> Colegios y Guarderías
        </h4>
        <Card className="border-none bg-white rounded-[2.5rem] border-2 border-emerald-200 shadow-sm">
          <CardContent className="p-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ResourceLauncher 
                title="Escolarización"
                description="Buscador de colegios y admisión para Primaria y Secundaria."
                url={OFFICIAL_LINKS.juntaAndalucia.escolarizacion}
                triggerLabel="Buscar Colegio Jaén"
                variant="primary"
                lang={lang}
              />
              <ResourceLauncher 
                title="Guarderías (0-3 años)"
                description="Ayudas para el primer ciclo de educación infantil."
                url={OFFICIAL_LINKS.juntaAndalucia.guarderias}
                triggerLabel="Ayuda Guardería"
                variant="primary"
                lang={lang}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DEPENDENCIA Y TÍTULOS */}
      <section className="space-y-3">
        <h4 className="text-[12px] font-black uppercase text-[#1A1A1B] tracking-widest ml-2 flex items-center gap-2">
          <UserCheck className="h-4 w-4" /> Otros Títulos y Dependencia
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <ResourceLauncher 
            title="Ayuda a la Dependencia"
            description="Solicitud de teleasistencia y ayuda a domicilio."
            url={OFFICIAL_LINKS.juntaAndalucia.dependencia}
            triggerLabel="Gestionar Dependencia"
            variant="primary"
            lang={lang}
          />
          <ResourceLauncher 
            title="Familia Numerosa"
            description="Obtención y renovación del título oficial."
            url={OFFICIAL_LINKS.juntaAndalucia.familiaNumerosa}
            triggerLabel="Título Familia Numerosa"
            variant="primary"
            lang={lang}
          />
        </div>
      </section>
    </div>
  );
}