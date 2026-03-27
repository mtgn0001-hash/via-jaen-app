
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  MapPin, 
  Smartphone,
  HeartPulse,
  CreditCard,
  Navigation,
  Phone
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { Button } from "@/components/ui/button";

export function HealthHub({ lang }: { lang: string }) {
  const suapCenters = [
    { 
      name: "SUAP Bulevar (Urgencias)", 
      address: "C.S. Las Fuentezuelas, Jaén",
      phone: "953 31 15 30",
      map: "Urgencias Bulevar Jaén"
    },
    { 
      name: "SUAP Felipe Arche (Urgencias)", 
      address: "C.S. San Felipe, Jaén",
      phone: "953 31 15 00",
      map: "Centro de Salud San Felipe Jaén"
    }
  ];

  const handleCall = (number: string) => {
    if ('vibrate' in navigator) navigator.vibrate(100);
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  const handleNavigate = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Salud y Urgencias</h3>
          <p className="text-[10px] text-black font-black uppercase tracking-widest">Información Crítica 24H en Jaén</p>
        </div>
        <SpeechButton text="Portal de Salud. Emergencias, hospitales y centros de urgencia en Jaén." language={lang} />
      </div>

      {/* 1. BOTÓN DE PÁNICO 112 */}
      <Button 
        onClick={() => handleCall("112")}
        className="w-full h-24 rounded-[2rem] bg-destructive text-white border-4 border-white shadow-2xl flex flex-col items-center justify-center gap-1 animate-pulse active:scale-95 transition-all"
      >
        <ShieldAlert className="h-8 w-8 text-white" />
        <span className="text-2xl font-black uppercase tracking-tighter">LLAMAR AL 112</span>
        <span className="text-[10px] font-bold opacity-80">EMERGENCIAS ANDALUCÍA</span>
      </Button>

      {/* 2. HOSPITALES PRINCIPALES */}
      <section className="space-y-4">
        <h4 className="text-[11px] font-black uppercase text-black tracking-widest ml-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-600" /> Hospitales Universitarios
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Hospital General */}
          <Card className="border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden border-2 border-slate-100">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-black uppercase leading-tight">Hosp. Universitario (General)</h4>
                  <p className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Av. de Madrid, Jaén
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-700 font-black text-[9px]">URGENCIAS 24H</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleCall("953 00 80 00")}
                  className="bg-slate-100 text-black border-2 border-slate-200 hover:bg-slate-200 h-14 rounded-2xl font-black gap-2"
                >
                  <Phone className="h-5 w-5" /> LLAMAR
                </Button>
                <Button 
                  onClick={() => handleNavigate("Hospital Universitario de Jaén Av. de Madrid")}
                  className="bg-primary text-white h-14 rounded-2xl font-black gap-2 shadow-lg"
                >
                  <Navigation className="h-5 w-5" /> IR AHORA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hospital Neurotraumatológico */}
          <Card className="border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden border-2 border-slate-100">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-black uppercase leading-tight">Hosp. Neurotraumatológico</h4>
                  <p className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Carretera de Madrid, Jaén
                  </p>
                </div>
                <Badge variant="outline" className="text-slate-600 border-slate-300 font-black text-[9px]">TRAUMA / REHAB</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleCall("953 00 80 00")}
                  className="bg-slate-100 text-black border-2 border-slate-200 hover:bg-slate-200 h-14 rounded-2xl font-black gap-2"
                >
                  <Phone className="h-5 w-5" /> LLAMAR
                </Button>
                <Button 
                  onClick={() => handleNavigate("Hospital Neurotraumatológico Jaén Carretera de Madrid")}
                  className="bg-primary text-white h-14 rounded-2xl font-black gap-2 shadow-lg"
                >
                  <Navigation className="h-5 w-5" /> IR AHORA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. URGENCIAS ATENCIÓN PRIMARIA (SUAP) */}
      <section className="space-y-4">
        <h4 className="text-[11px] font-black uppercase text-black tracking-widest ml-4 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-red-600" /> Urgencias de Primaria (SUAP)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suapCenters.map(center => (
            <Card key={center.name} className="border-none bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h5 className="font-black text-sm text-black uppercase leading-tight">{center.name}</h5>
                <p className="text-[10px] font-bold text-slate-600 leading-tight uppercase">
                  {center.address}
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleCall(center.phone)}
                    className="flex-1 bg-white text-black border border-slate-300 rounded-xl font-black text-[10px]"
                  >
                    TEL: {center.phone}
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleNavigate(center.map)}
                    className="bg-white text-primary border-primary/20 rounded-xl font-black text-[10px]"
                  >
                    <Navigation className="h-3 w-3 mr-1" /> MAPA
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. GESTIÓN DE CITAS */}
      <section className="space-y-3">
        <h4 className="text-[11px] font-black uppercase text-black tracking-widest ml-4 flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-red-600" /> Citas y Prestaciones SAS
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Cita Médica - ClicSalud+"
            description="Solicita cita con tu médico de cabecera en Jaén a través del portal oficial del SAS."
            url={OFFICIAL_LINKS.salud.clicSalud}
            triggerLabel="Pedir Cita Online"
            variant="white"
            lang={lang}
          />
          <ResourceLauncher 
            title="Farmacias de Guardia"
            description="Consulta las farmacias abiertas ahora mismo en Jaén capital y provincia."
            url={OFFICIAL_LINKS.salud.farmaciasGuardia}
            triggerLabel="Farmacias en Jaén"
            variant="secondary"
            lang={lang}
          />
        </div>
      </section>

      {/* 5. AYUDAS MÉDICAS */}
      <section className="space-y-3">
        <h4 className="text-[11px] font-black uppercase text-black tracking-widest ml-4 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-red-600" /> Ayudas y Viajes
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <ResourceLauncher 
            title="Tarjeta Sanitaria Europea"
            description="Solicita cobertura médica para tus viajes por Europa."
            url={OFFICIAL_LINKS.salud.tse}
            triggerLabel="Solicitar TSE"
            variant="primary"
            lang={lang}
          />
          <div className="grid grid-cols-2 gap-2">
            <ResourceLauncher 
              title="Gastos Prótesis"
              description="Reintegro de gastos por gafas o audífonos."
              url={OFFICIAL_LINKS.salud.reintegroOrtoprotesico}
              triggerLabel="Reintegro"
              variant="primary"
              lang={lang}
            />
            <ResourceLauncher 
              title="Desplazamiento"
              description="Ayudas por traslados a otros hospitales."
              url={OFFICIAL_LINKS.salud.ayudaDesplazamiento}
              triggerLabel="Ayuda Viaje"
              variant="primary"
              lang={lang}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
