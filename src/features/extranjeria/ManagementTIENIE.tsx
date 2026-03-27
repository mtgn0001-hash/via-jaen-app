"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { MapPin, Zap, Info, Scale } from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { useLocalStorage } from "@/lib/store";

export function ManagementTIENIE() {
  const { progress } = useLocalStorage();
  const lang = progress.language;

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-6">
        {/* BLOQUE PRINCIPAL: TIE/NIE - VISIBILIDAD MÁXIMA */}
        <Card className="border-none bg-primary shadow-2xl rounded-[3rem] overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-20">
             <Zap className="h-32 w-32 text-white" />
          </div>
          
          <CardContent className="p-8 space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none text-shadow-strong">Identidad</h3>
              <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 opacity-100">
                <MapPin className="h-4 w-4 text-white" /> Plaza de las Batallas (Jaén)
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ResourceLauncher 
                title="Modelo EX-15 (NIE)"
                description="Solicitud de Número de Identidad de Extranjero y Certificados. Debes buscar el enlace EX-15 en la página de modelos."
                url={OFFICIAL_LINKS.extranjeria.ex15}
                lseInstructions="Cómo rellenar el papel blanco EX-15 para tu primera vez en Jaén."
                triggerLabel="Solicitar / Renovar NIE"
                variant="white"
                lang={lang}
              />

              <ResourceLauncher 
                title="Cita Huellas / TIE"
                description="Reserva de cita previa para la toma de huellas o recogida de tarjeta física en la Comisaría de Jaén."
                url={OFFICIAL_LINKS.extranjeria.citaPrevia}
                lseInstructions="Diferencia entre el número NIE y la tarjeta física con foto."
                triggerLabel="Tarjeta TIE (Citas)"
                variant="secondary"
                lang={lang}
              />
            </div>

            <div className="bg-white/20 p-5 rounded-2xl flex gap-3 items-center backdrop-blur-md border border-white/30 shadow-inner">
              <Info className="h-6 w-6 text-white shrink-0" />
              <p className="text-[11px] text-white font-black leading-tight uppercase tracking-tight">
                Recuerda: Consultas presenciales en Plaza de las Batallas. Los viernes a las 9:00 AM suelen liberar nuevas citas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* RECURSOS ADICIONALES EXTRANJERÍA */}
        <div className="grid grid-cols-1 gap-3 px-2">
          <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest ml-2 flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" /> Apoyo Legal y Protección
          </h4>
          
          <div className="grid grid-cols-1 gap-2">
            <ResourceLauncher 
              title="Arraigo Social/Laboral"
              description="Información oficial sobre los procedimientos de arraigo para regularizar tu situación en España."
              url={OFFICIAL_LINKS.extranjeria.arraigo}
              triggerLabel="Info Arraigo"
              variant="primary"
              lang={lang}
            />
            
            <ResourceLauncher 
              title="Abogado de Oficio"
              description="Cómo solicitar asistencia jurídica gratuita a través del Colegio de Abogados de Jaén si no tienes recursos."
              url={OFFICIAL_LINKS.extranjeria.asistenciaJuridica}
              triggerLabel="Asistencia Legal Jaén"
              variant="primary"
              lang={lang}
            />

            <div className="flex gap-2">
              <ResourceLauncher 
                title="Asilo"
                description="Recursos y cita para Protección Internacional en la provincia de Jaén."
                url={OFFICIAL_LINKS.extranjeria.proteccionInternacional}
                triggerLabel="Asilo / Protección"
                variant="primary"
                lang={lang}
              />
              <ResourceLauncher 
                title="Retorno"
                description="Programas oficiales de retorno voluntario a tu país de origen."
                url={OFFICIAL_LINKS.extranjeria.retornoVoluntario}
                triggerLabel="Retorno Voluntario"
                variant="primary"
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}