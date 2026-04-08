"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  School, 
  MapPin,
  Home,
  UserCheck,
  HeartHandshake
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function FamilyHub({ lang }: { lang: string }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-emerald-800 uppercase tracking-tighter">Familias y Colegios</h3>
          <p className="text-[12px] text-[#1A1A1B] font-black uppercase tracking-widest">Educación y Ayudas Sociales en Jaén</p>
        </div>
        <SpeechButton 
          text="Portal de Familias y Colegios. Gestiona aquí ayudas al alquiler de la Junta de Andalucía, la Renta Mínima de Inserción, el Bono Carestía y la escolarización de tus hijos en centros de Jaén." 
          language={lang} 
        />
      </div>

      {/* VIVIENDA Y SUSTENTO */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-2">
          <h4 className="text-[12px] font-black uppercase text-emerald-800 tracking-widest flex items-center gap-2">
            <Home className="h-4 w-4" /> Vivienda y Sustento
          </h4>
          <SpeechButton text="Información sobre el Plan Vive de alquiler y ayudas directas para el sustento familiar en Andalucía." language={lang} />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ResourceLauncher 
            title="Ayuda al Alquiler (Plan Vive)"
            description="Acceso a las convocatorias de ayudas al alquiler de la Junta de Andalucía. Incluye el Bono Alquiler Joven y programas de fomento a la vivienda."
            url={OFFICIAL_LINKS.juntaAndalucia.ayudaAlquiler}
            triggerLabel="Solicitar Ayuda Alquiler"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResourceLauncher 
              title="Renta Mínima (RMISA)"
              description="Prestación económica para personas en situación de exclusión social o riesgo de estarlo en la comunidad andaluza."
              url={OFFICIAL_LINKS.juntaAndalucia.rmisa}
              triggerLabel="RMISA (Renta)"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Bono Carestía"
              description="Pago único de la Junta de Andalucía para apoyar a familias con menores a cargo y recursos limitados."
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
        <div className="flex justify-between items-center px-2">
          <h4 className="text-[12px] font-black uppercase text-emerald-800 tracking-widest flex items-center gap-2">
            <School className="h-4 w-4" /> Colegios y Guarderías
          </h4>
          <SpeechButton text="Buscador oficial de centros escolares en Jaén y tramitación de plazas para el primer ciclo de infantil." language={lang} />
        </div>
        <Card className="border-none bg-white rounded-[2.5rem] border-2 border-emerald-200 shadow-sm overflow-hidden">
          <CardContent className="p-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ResourceLauncher 
                title="Buscador de Centros (Escolarización)"
                description="Encuentra colegio en Jaén para Primaria y Secundaria. Consulta plazos de admisión y vacantes en el portal de la Consejería de Educación."
                url={OFFICIAL_LINKS.juntaAndalucia.escolarizacion}
                triggerLabel="Buscar Colegio en Jaén"
                variant="primary"
                lang={lang}
              />
              <ResourceLauncher 
                title="Guarderías (0-3 años)"
                description="Ayudas para el primer ciclo de educación infantil. Información sobre centros autorizados y bonificaciones en el precio de la plaza."
                url={OFFICIAL_LINKS.juntaAndalucia.guarderias}
                triggerLabel="Portal de Guarderías"
                variant="primary"
                lang={lang}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DEPENDENCIA Y TÍTULOS */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-2">
          <h4 className="text-[12px] font-black uppercase text-[#1A1A1B] tracking-widest flex items-center gap-2">
            <HeartHandshake className="h-4 w-4" /> Otros Títulos y Ayudas
          </h4>
          <SpeechButton text="Gestión de la Ley de Dependencia y el Título de Familia Numerosa de la Junta de Andalucía." language={lang} />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ResourceLauncher 
            title="Ley de Dependencia"
            description="Solicitud de valoración de grado de dependencia, servicio de teleasistencia y ayuda a domicilio en la provincia de Jaén."
            url={OFFICIAL_LINKS.juntaAndalucia.dependencia}
            triggerLabel="Gestionar Dependencia"
            variant="primary"
            lang={lang}
          />
          <ResourceLauncher 
            title="Familia Numerosa"
            description="Obtención, renovación y descarga del título de familia numerosa para acceder a beneficios fiscales y descuentos locales."
            url={OFFICIAL_LINKS.juntaAndalucia.familiaNumerosa}
            triggerLabel="Título Familia Numerosa"
            variant="primary"
            lang={lang}
          />
        </div>
      </section>

      <div className="bg-emerald-50 p-6 rounded-[2.5rem] border-2 border-emerald-100 flex gap-4 items-center shadow-inner mx-2">
        <UserCheck className="h-10 w-10 text-emerald-600 shrink-0" />
        <p className="text-[11px] text-emerald-900 font-bold uppercase leading-tight">
          CONSEJO: Para la mayoría de trámites de la Junta necesitarás el Certificado Digital o Cl@ve. Puedes solicitar ayuda en los Centros de Participación Activa de Jaén.
        </p>
      </div>
    </div>
  );
}