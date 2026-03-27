"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  School, 
  Baby, 
  Wallet, 
  Play, 
  MapPin,
  Heart,
  Utensils,
  Home,
  UserCheck,
  Users
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";

export function FamilyHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-emerald-600 uppercase tracking-tighter">Familias y Colegios</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Exclusivo: Educación y Ayudas Sociales</p>
        </div>
        <SpeechButton text="Portal para familias. Recursos de educación y ayudas sociales de la Junta de Andalucía." language={lang} />
      </div>

      {/* VIVIENDA Y SUSTENTO */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Home className="h-3 w-3" /> Vivienda y Sustento
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Ayuda al Alquiler"
            description="Plan Vive Andalucía y Bono Alquiler Joven para facilitar el acceso a la vivienda en Jaén."
            url={OFFICIAL_LINKS.juntaAndalucia.ayudaAlquiler}
            lseInstructions="Requisitos de empadronamiento y contrato para pedir la ayuda de alquiler."
            triggerLabel="Solicitar Alquiler"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Renta Mínima"
              description="Renta Mínima de Inserción Social (RMISA) de la Junta de Andalucía."
              url={OFFICIAL_LINKS.juntaAndalucia.rmisa}
              triggerLabel="RMISA"
              variant="secondary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Bono Carestía"
              description="Pago único para familias con menores a cargo y bajos ingresos."
              url={OFFICIAL_LINKS.juntaAndalucia.bonoCarestia}
              triggerLabel="Bono Carestía"
              variant="secondary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* EDUCACIÓN INFANTIL */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <School className="h-3 w-3" /> Colegios y Guarderías
        </h4>
        <Card className="border-none bg-white/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-emerald-100">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <ResourceLauncher 
                title="Escolarización"
                description="Buscador de colegios y proceso de admisión para Primaria y Secundaria en Jaén capital."
                url={OFFICIAL_LINKS.juntaAndalucia.escolarizacion}
                lseInstructions="Cómo matricular a tu hijo en un colegio de Jaén paso a paso."
                triggerLabel="Buscar Colegio Jaén"
                lang={lang}
              />
              <ResourceLauncher 
                title="Guarderías (0-3 años)"
                description="Ayudas para el primer ciclo de educación infantil en centros de la provincia."
                url={OFFICIAL_LINKS.juntaAndalucia.guarderias}
                triggerLabel="Ayuda Guardería"
                variant="outline"
                lang={lang}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DEPENDENCIA Y TÍTULOS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <UserCheck className="h-3 w-3" /> Otros Títulos y Dependencia
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Ayuda a la Dependencia"
            description="Solicitud de teleasistencia y ayuda a domicilio en la ciudad de Jaén."
            url={OFFICIAL_LINKS.juntaAndalucia.dependencia}
            triggerLabel="Gestionar Dependencia"
            variant="outline"
            lang={lang}
          />
          <ResourceLauncher 
            title="Familia Numerosa"
            description="Obtención y renovación del título para acceder a bonificaciones en transporte y tasas."
            url={OFFICIAL_LINKS.juntaAndalucia.familiaNumerosa}
            triggerLabel="Título Familia Numerosa"
            variant="outline"
            lang={lang}
          />
        </div>
      </section>

      {/* CONCILIACIÓN */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Baby className="h-3 w-3" /> Conciliación Local
        </h4>
        <Card className="border-none bg-orange-50/50 rounded-3xl border border-orange-100">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-orange-500 p-3 rounded-2xl text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-black text-xs text-orange-900 uppercase">Ludotecas Municipales</h5>
                <p className="text-[10px] text-orange-800/60 font-bold uppercase">Ayuntamiento de Jaén</p>
              </div>
            </div>
            <ResourceLauncher 
              title="Ludotecas Jaén"
              description="Información sobre actividades de conciliación del Ayuntamiento."
              url={OFFICIAL_LINKS.ayuntamiento.ludotecas}
              triggerLabel="INFO"
              variant="outline"
              lang={lang}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
