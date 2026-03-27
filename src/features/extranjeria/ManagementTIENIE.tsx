"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { MapPin, Zap, Info, Scale } from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { useLocalStorage } from "@/lib/store";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function ManagementTIENIE() {
  const { progress } = useLocalStorage();
  const lang = progress.language;

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">Trámites de Identidad</h3>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">Gestión TIE y NIE en Jaén</p>
          </div>
          <SpeechButton 
            text="Sección Extranjería. Aquí puedes solicitar el Modelo EX-15 para el NIE y pedir cita para la toma de huellas de la tarjeta TIE en la Comisaría de la Plaza de las Batallas de Jaén. Recuerda que las citas suelen salir los viernes a las 9 de la mañana." 
            language={lang} 
          />
        </div>

        <Card className="border-none bg-primary shadow-2xl rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-20">
             <Zap className="h-32 w-32 text-white" />
          </div>
          
          <CardContent className="p-8 space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-white text-4xl font-black uppercase tracking-tighter leading-none text-shadow-strong">Identidad</h3>
              <p className="text-white text-[13px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin className="h-5 w-5 text-white" /> Plaza de las Batallas (Jaén)
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ResourceLauncher 
                title="Modelo EX-15 (NIE)"
                description="Solicitud de Número de Identidad de Extranjero y Certificados. Debes rellenar este PDF oficial y llevarlo a Comisaría."
                url={OFFICIAL_LINKS.extranjeria.ex15}
                triggerLabel="Solicitar / Renovar NIE"
                variant="white"
                lang={lang}
              />

              <ResourceLauncher 
                title="Cita Huellas / TIE"
                description="Reserva de cita previa para la toma de huellas o recogida de tarjeta física en la oficina de Jaén."
                url={OFFICIAL_LINKS.extranjeria.citaPrevia}
                triggerLabel="Tarjeta TIE (Citas)"
                variant="white"
                lang={lang}
              />
            </div>

            <div className="bg-white/20 p-6 rounded-3xl flex gap-4 items-center border border-white/30 shadow-inner">
              <Info className="h-8 w-8 text-white shrink-0" />
              <p className="text-[13px] text-white font-black leading-tight uppercase">
                Si no hay citas disponibles online, acude presencialmente a la oficina de la Plaza de las Batallas ya que la disponibilidad cambia semanalmente.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 px-2">
          <div className="flex justify-between items-center">
            <h4 className="text-[12px] font-black uppercase text-[#1A1A1B] tracking-widest ml-2 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" /> Apoyo Legal y Protección
            </h4>
            <SpeechButton text="Ayuda legal y protección. Información sobre Arraigo, Asistencia Jurídica gratuita del Colegio de Abogados de Jaén, y solicitudes de Asilo o Retorno Voluntario." language={lang} />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <ResourceLauncher 
              title="Arraigo Social/Laboral"
              description="Información sobre procedimientos de arraigo para regularizar tu situación tras 2 o 3 años en España."
              url={OFFICIAL_LINKS.extranjeria.arraigo}
              triggerLabel="Información de Arraigo"
              variant="primary"
              lang={lang}
            />
            
            <ResourceLauncher 
              title="Abogado de Oficio"
              description="Asistencia jurídica gratuita a través del Colegio de Abogados de Jaén para trámites de extranjería."
              url={OFFICIAL_LINKS.extranjeria.asistenciaJuridica}
              triggerLabel="Asistencia Legal Jaén"
              variant="primary"
              lang={lang}
            />

            <div className="grid grid-cols-2 gap-3">
              <ResourceLauncher 
                title="Asilo"
                description="Recursos para Protección Internacional en Jaén."
                url={OFFICIAL_LINKS.extranjeria.proteccionInternacional}
                triggerLabel="Asilo"
                variant="primary"
                lang={lang}
              />
              <ResourceLauncher 
                title="Retorno"
                description="Programas oficiales de retorno voluntario a tu país de origen."
                url={OFFICIAL_LINKS.extranjeria.retornoVoluntario}
                triggerLabel="Retorno"
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