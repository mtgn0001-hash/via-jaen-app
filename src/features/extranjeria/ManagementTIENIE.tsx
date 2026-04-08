"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { MapPin, Info, Scale, Luggage, ExternalLink } from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { useLocalStorage } from "@/lib/store";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function ManagementTIENIE() {
  const { progress } = useLocalStorage();
  const lang = progress.language;

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">TRÁMITES DE IDENTIDAD</h3>
            <p className="text-[12px] text-muted-foreground font-black uppercase tracking-[0.2em]">GESTIÓN TIE Y NIE EN JAÉN</p>
          </div>
          <SpeechButton 
            text="Sección Extranjería. Aquí puedes acceder al Ministerio de Inclusión para el NIE y pedir cita para la tarjeta TIE en la Comisaría de la Plaza de las Batallas." 
            language={lang} 
          />
        </div>

        <Card className="border-none bg-primary shadow-2xl rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-25">
             <Luggage className="h-40 w-40 text-white" />
          </div>
          
          <CardContent className="p-10 space-y-8 relative z-10">
            <div className="space-y-2">
              <h3 className="text-white text-5xl font-black uppercase tracking-tighter leading-none text-shadow-strong">IDENTIDAD</h3>
              <p className="text-white text-[14px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin className="h-5 w-5 text-white" /> PLAZA DE LAS BATALLAS (JAÉN)
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <Button 
                asChild
                className="w-full h-16 rounded-2xl bg-white text-primary border-none shadow-xl font-black uppercase tracking-tight flex justify-between px-6 active:scale-95 transition-all"
              >
                <a href={OFFICIAL_LINKS.extranjeria.ex15}>
                  <span>SOLICITAR / RENOVAR NIE</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>

              <ResourceLauncher 
                title="CITA HUELLAS / TIE"
                description="Reserva de cita previa para la toma de huellas o recogida de tarjeta física en la oficina de Jaén."
                url={OFFICIAL_LINKS.extranjeria.citaPrevia}
                triggerLabel="TARJETA TIE (CITAS)"
                variant="white"
                lang={lang}
              />
            </div>

            <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl flex gap-4 items-center border border-white/30 shadow-inner">
              <Info className="h-10 w-10 text-white shrink-0" />
              <p className="text-[14px] text-white font-black leading-tight uppercase">
                Si no hay citas disponibles online, acude presencialmente a la oficina de la Plaza de las Batallas ya que la disponibilidad cambia semanalmente.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 px-2">
          <div className="flex justify-between items-center">
            <h4 className="text-[14px] font-black uppercase text-[#1A1A1B] tracking-widest ml-2 flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" /> APOYO LEGAL Y PROTECCIÓN
            </h4>
            <SpeechButton text="Ayuda legal y protección en el portal de Migraciones. Información sobre Arraigo, Asistencia Jurídica gratuita y solicitudes de Asilo." language={lang} />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <ResourceLauncher 
              title="ARRAIGO SOCIAL/LABORAL"
              description="Acceso al portal de Migraciones. Una vez dentro: 1. Busca en el menú lateral 'Información sobre procedimientos'. 2. Selecciona 'Autorizaciones por circunstancias excepcionales' para ver los requisitos del Arraigo."
              url={OFFICIAL_LINKS.extranjeria.arraigo}
              triggerLabel="INFORMACIÓN DE ARRAIGO"
              variant="primary"
              lang={lang}
            />
            
            <ResourceLauncher 
              title="ASISTENCIA JURÍDICA"
              description="Portal de Migraciones. Para ayuda legal: 1. Localiza el apartado de 'Integración'. 2. Busca la sección de 'Asistencia Jurídica Gratuita' para conocer tus derechos y abogados de oficio."
              url={OFFICIAL_LINKS.extranjeria.asistenciaJuridica}
              triggerLabel="ASISTENCIA LEGAL"
              variant="primary"
              lang={lang}
            />

            <div className="grid grid-cols-2 gap-4">
              <ResourceLauncher 
                title="ASILO"
                description="Portal de Migraciones. Para Protección Internacional: 1. Entra en el menú de trámites. 2. Busca 'Protección Internacional y Asilo' para descargar la guía de solicitud."
                url={OFFICIAL_LINKS.extranjeria.proteccionInternacional}
                triggerLabel="ASILO"
                variant="primary"
                lang={lang}
              />
              <ResourceLauncher 
                title="RETORNO"
                description="Programas de Migración. Para volver a tu país: 1. Busca el apartado de 'Retorno Voluntario'. 2. Consulta los programas vigentes y ayudas económicas disponibles."
                url={OFFICIAL_LINKS.extranjeria.retornoVoluntario}
                triggerLabel="RETORNO"
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