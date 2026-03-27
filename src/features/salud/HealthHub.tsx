"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
  Smartphone,
  HeartPulse,
  CreditCard
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function HealthHub({ lang }: { lang: string }) {
  const centers = [
    { name: "C.S. Las Fuentezuelas", phone: "953 31 15 30" },
    { name: "C.S. San Felipe", phone: "953 31 15 00" },
    { name: "C.S. El Valle", phone: "953 31 15 15" },
    { name: "C.S. Belén", phone: "953 31 15 45" }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-red-700 uppercase tracking-tighter">Salud</h3>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Exclusivo: Citas, Urgencias y Prestaciones</p>
        </div>
        <SpeechButton text="Portal de Salud. Gestión de citas, urgencias y ayudas médicas en Jaén." language={lang} />
      </div>

      {/* BLOQUE URGENCIAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-none bg-destructive text-white rounded-3xl shadow-xl overflow-hidden relative group">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-white/30 text-white border-none text-[8px] font-black uppercase">24H</Badge>
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight">112 Urgencias</h4>
            <button 
              onClick={() => handleCall("112")}
              className="w-full h-10 rounded-xl bg-white text-destructive hover:bg-white/95 font-black text-xs shadow-md"
            >
              LLAMAR AHORA
            </button>
          </CardContent>
        </Card>

        <Card className="border-none bg-slate-950 text-white rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="bg-white/10 p-2 rounded-xl">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
              <Badge className="bg-red-600/30 text-red-400 border-none text-[8px] font-black uppercase">CAPITAL</Badge>
            </div>
            <h4 className="text-xs font-black uppercase tracking-tight leading-tight">Hosp. Médico-Quirúrgico</h4>
            <button 
              onClick={() => handleCall("953 00 80 00")}
              className="w-full h-10 rounded-xl bg-red-700 text-white font-black text-[10px] hover:bg-red-800 shadow-md"
            >
              953 00 80 00
            </button>
          </CardContent>
        </Card>
      </section>

      {/* GESTIÓN DE CITAS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 flex items-center gap-2">
          <HeartPulse className="h-3 w-3" /> Citas y Prestaciones SAS
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Cita Médica - ClicSalud+"
            description="Portal oficial del Servicio Andaluz de Salud para pedir cita previa con tu médico de cabecera en Jaén."
            url={OFFICIAL_LINKS.salud.clicSalud}
            lseInstructions="Cómo solicitar cita médica y pedir el servicio de intérprete de signos."
            triggerLabel="Pedir Cita Online"
            lang={lang}
          />
          <ResourceLauncher 
            title="Farmacias de Guardia"
            description="Consulta las farmacias abiertas hoy en Jaén capital y provincia."
            url={OFFICIAL_LINKS.salud.farmaciasGuardia}
            triggerLabel="Farmacias hoy en Jaén"
            variant="secondary"
            lang={lang}
          />
        </div>
      </section>

      {/* AYUDAS MÉDICAS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 flex items-center gap-2">
          <CreditCard className="h-3 w-3" /> Ayudas y Viajes
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Tarjeta Sanitaria Europea"
            description="Solicita la TSE para tener cobertura médica en tus viajes por Europa."
            url={OFFICIAL_LINKS.salud.tse}
            triggerLabel="Solicitar TSE"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Gastos Prótesis"
              description="Solicitud de reintegro de gastos ortoprotésicos (gafas, audífonos) ante el SAS en Jaén."
              url={OFFICIAL_LINKS.salud.reintegroOrtoprotesico}
              triggerLabel="Reintegro"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Desplazamiento"
              description="Ayudas por traslados a hospitales de referencia fuera de la provincia de Jaén."
              url={OFFICIAL_LINKS.salud.ayudaDesplazamiento}
              triggerLabel="Ayuda Viaje"
              variant="primary"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* CENTROS LOCALES */}
      <section className="space-y-3 pt-2">
        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 flex items-center gap-2">
          <Smartphone className="h-3 w-3" /> Teléfonos Directos Jaén
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {centers.map(center => (
            <button 
              key={center.name}
              onClick={() => handleCall(center.phone)}
              className="p-4 rounded-2xl bg-white border border-red-100 hover:bg-red-50 transition-all flex flex-col items-start gap-1 active:scale-95 text-left shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-900 uppercase leading-none">{center.name}</p>
              <p className="text-[10px] font-bold text-red-700">{center.phone}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
