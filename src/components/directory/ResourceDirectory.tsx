"use client"

import { useState, useMemo, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, ExternalLink, Heart, Home, Utensils, Stethoscope, Building, Navigation, Zap, GraduationCap, Gavel } from "lucide-react";
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
  const [announcement, setAnnouncement] = useState("");

  const isEasy = progress.easyReading;
  const types = ["Todos", "ONG", "Salud", "Albergue", "Comedor", "Administración"];

  const getIcon = (type: string, name?: string) => {
    if (name?.toLowerCase().includes('universidad') || name?.toLowerCase().includes('uja')) return <GraduationCap className="h-5 w-5" />;
    if (name?.toLowerCase().includes('comisaría') || name?.toLowerCase().includes('extranjería')) return <Gavel className="h-5 w-5" />;
    
    switch (type) {
      case 'ONG': return <Heart className="h-5 w-5" />;
      case 'Salud': return <Stethoscope className="h-5 w-5" />;
      case 'Albergue': return <Home className="h-5 w-5" />;
      case 'Comedor': return <Utensils className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  const filtered = useMemo(() => {
    return currentProvince.resources.filter(r => 
      (selectedType === "Todos" || r.type === selectedType) &&
      (r.name.toLowerCase().includes(filter.toLowerCase()) || r.type.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [currentProvince, selectedType, filter]);

  // Anuncio dinámico para lectores de pantalla sobre resultados de búsqueda
  useEffect(() => {
    if (filter || selectedType !== "Todos") {
      setAnnouncement(`Se han encontrado ${filtered.length} recursos de ${selectedType === "Todos" ? 'todas las categorías' : selectedType}`);
    }
  }, [filtered.length, filter, selectedType]);

  const openInMaps = (address: string) => {
    const query = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20" role="main">
      <div className="space-y-1">
        <h2 className={isEasy ? "text-4xl font-black uppercase tracking-tight text-primary" : "text-2xl font-black uppercase text-primary tracking-tight"}>Ayuda Local</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
          Recursos de apoyo en <span className="text-primary">{currentProvince.name}</span>
        </p>
      </div>

      <section className="bg-primary/5 p-5 rounded-[2.5rem] border-2 border-primary/10 flex gap-4 items-center" aria-label="Aviso de Ubicación">
         <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20 animate-pulse">
            <Navigation className="h-6 w-6 text-white" />
         </div>
         <p className="text-[10px] text-primary font-black uppercase leading-tight tracking-wider">
            Geolocalización Activa: Encuentra ayuda profesional cerca de ti.
         </p>
      </section>

      {!isEasy && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" aria-hidden="true" />
            <Input 
              placeholder="¿Qué necesitas buscar en Jaén?" 
              className="pl-12 h-16 rounded-[2rem] bg-white border-none shadow-xl font-bold text-lg text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Buscar recursos en Jaén"
            />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Categorías</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist">
              {types.map(type => (
                <Badge 
                  key={type}
                  variant={selectedType === type ? 'secondary' : 'outline'}
                  role="tab"
                  aria-selected={selectedType === type}
                  className={`cursor-pointer px-6 py-3 rounded-2xl whitespace-nowrap text-xs font-black transition-all flex items-center gap-2 border-2 shadow-sm ${selectedType === type ? 'bg-primary text-white border-primary' : 'bg-white border-primary/5 text-primary hover:border-primary/20'}`}
                  onClick={() => {
                    if ('vibrate' in navigator) navigator.vibrate(10);
                    setSelectedType(type);
                  }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Región ARIA para anunciar cambios en los resultados */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <div className="grid gap-6">
        {filtered.map((res, i) => (
          <Card key={i} className={`overflow-hidden border-none shadow-2xl bg-white transition-all active:scale-[0.98] ${isEasy ? 'rounded-none border-4 border-black' : 'rounded-[2.5rem] hover:border-primary/20 hover:-translate-y-1'}`}>
            <CardContent className={isEasy ? "p-10" : "p-8"}>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary/10 p-4 rounded-3xl text-primary shadow-inner">
                   {getIcon(res.type, res.name)}
                </div>
                {!isEasy && <Badge variant="outline" className="rounded-xl px-3 py-1 font-black text-[9px] uppercase tracking-widest bg-slate-50 border-primary/10">
                  {res.city}
                </Badge>}
              </div>
              
              <h4 className={`font-black mb-2 leading-tight text-slate-900 ${isEasy ? 'text-3xl uppercase tracking-tighter' : 'text-2xl tracking-tighter'}`}>{res.name}</h4>
              <p className="text-[10px] font-bold text-muted-foreground mb-8 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" /> {res.address}
              </p>
              
              <div className="flex gap-4">
                <Button asChild size="lg" className="flex-1 rounded-[1.5rem] h-16 gap-3 font-black text-lg shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all" aria-label={`Llamar a ${res.name} al número ${res.phone}`}>
                  <a href={`tel:${res.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-6 w-6" /> {res.phone}
                  </a>
                </Button>
                <Button 
                  onClick={() => openInMaps(`${res.name}, ${res.address}, ${res.city}`)}
                  size="icon" 
                  variant="outline"
                  className="w-16 h-16 rounded-[1.5rem] border-2 border-slate-200 active:scale-95 transition-all hover:border-primary hover:text-primary group"
                  aria-label={`Abrir ubicación de ${res.name} en Google Maps`}
                >
                  <Navigation className="h-6 w-6 text-primary group-hover:animate-bounce" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}