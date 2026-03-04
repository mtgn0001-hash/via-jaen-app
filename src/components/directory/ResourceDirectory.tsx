
"use client"

import { useState, useMemo } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, ExternalLink, Heart, Home, Utensils, Stethoscope, Building, Navigation, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";

type ResourceDirectoryProps = {
  lang: Language;
};

export function ResourceDirectory({ lang }: ResourceDirectoryProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();
  const currentProvince = provincesData[progress.province] || provincesData.jaen;
  
  const [filter, setFilter] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Todos");

  const isEasy = progress.easyReading;
  const types = ["Todos", "ONG", "Salud", "Albergue", "Comedor", "Administración"];

  const getIcon = (type: string) => {
    switch (type) {
      case 'ONG': return <Heart className="h-4 w-4" />;
      case 'Salud': return <Stethoscope className="h-4 w-4" />;
      case 'Albergue': return <Home className="h-4 w-4" />;
      case 'Comedor': return <Utensils className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const filtered = useMemo(() => {
    return currentProvince.resources.filter(r => 
      (selectedType === "Todos" || r.type === selectedType) &&
      (r.name.toLowerCase().includes(filter.toLowerCase()) || r.type.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [currentProvince, selectedType, filter]);

  const openInMaps = (address: string) => {
    const query = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-1">
        <h2 className={isEasy ? "text-4xl font-black uppercase tracking-tight text-primary" : "text-2xl font-black uppercase text-primary tracking-tight"}>{t.directory}</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
          Ayuda real en <span className="text-primary">{currentProvince.name}</span>
        </p>
      </div>

      {/* Help Heatmap Info */}
      <section className="bg-primary/5 p-4 rounded-3xl border border-primary/10 flex gap-4 items-center">
         <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20 animate-pulse">
            <Zap className="h-6 w-6 text-white" />
         </div>
         <p className="text-[10px] text-foreground font-bold uppercase leading-tight">
            Mapa de ayuda actualizado: Los iconos morados brillantes indican puntos críticos de asistencia.
         </p>
      </section>

      {!isEasy && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
            <Input 
              placeholder="Ej: Cruz Roja, Salud, NIE..." 
              className="pl-12 h-14 rounded-2xl bg-white border-none shadow-sm font-bold text-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Filtrar por tipo</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {types.map(type => (
                <Badge 
                  key={type}
                  variant={selectedType === type ? 'secondary' : 'outline'}
                  className={`cursor-pointer px-5 py-2.5 rounded-xl whitespace-nowrap text-xs font-black transition-all flex items-center gap-2 border-2 shadow-sm ${selectedType === type ? 'bg-primary text-white border-primary' : 'bg-white border-primary/5 text-primary hover:border-primary/20'}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type === "Todos" ? "Todos" : getIcon(type)}
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filtered.map((res, i) => (
          <Card key={i} className={`overflow-hidden border-none shadow-lg bg-white transition-all active:scale-[0.98] ${isEasy ? 'rounded-[2.5rem] border-[6px] border-primary/5' : 'rounded-3xl hover:border-primary/20'}`}>
            <CardContent className={isEasy ? "p-8" : "p-6"}>
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-primary text-white border-none font-black text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider shadow-md shadow-primary/20">
                  {getIcon(res.type)}
                  <span className="ml-2">{res.type}</span>
                </Badge>
                {!isEasy && <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-primary/5">
                  <MapPin className="h-3 w-3 text-primary" /> {res.city}
                </div>}
              </div>
              
              <h4 className={`font-black mb-1 leading-tight text-slate-900 ${isEasy ? 'text-3xl uppercase tracking-tighter' : 'text-xl'}`}>{res.name}</h4>
              <p className="text-[10px] font-bold text-muted-foreground mb-6 uppercase tracking-tight">{res.address}</p>
              
              <div className="flex gap-4">
                <Button asChild size={isEasy ? "lg" : "default"} className={`flex-1 rounded-2xl h-16 gap-3 font-black text-lg shadow-md bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-transform`}>
                  <a href={`tel:${res.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-6 w-6" /> {res.phone}
                  </a>
                </Button>
                <Button 
                  onClick={() => openInMaps(`${res.name}, ${res.address}, ${res.city}`)}
                  size={isEasy ? "lg" : "default"} 
                  variant="outline"
                  className={`flex-1 rounded-2xl h-16 gap-3 border-2 border-slate-200 font-black text-lg active:scale-95 transition-transform hover:border-primary hover:text-primary group`}
                >
                  <Navigation className="h-6 w-6 text-primary group-hover:animate-bounce" /> Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
