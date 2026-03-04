
"use client"

import { useState, useMemo } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, ExternalLink, Heart, Home, Utensils, Stethoscope, Building, Navigation } from "lucide-react";
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

  const openInMaps = (name: string, city: string) => {
    const query = encodeURIComponent(`${name} ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-1">
        <h2 className={isEasy ? "text-4xl font-black uppercase tracking-tight" : "text-2xl font-bold"}>{t.directory}</h2>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          Recursos en <span className="text-primary font-black">{currentProvince.name}</span>
        </p>
      </div>

      {!isEasy && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar organización o ayuda..." 
              className="pl-10 h-12 rounded-2xl bg-white border-none shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Tipo de Recurso</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {types.map(type => (
                <Badge 
                  key={type}
                  variant={selectedType === type ? 'secondary' : 'outline'}
                  className={`cursor-pointer px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all flex items-center gap-2 border-none shadow-sm ${selectedType === type ? 'bg-secondary/20 text-secondary-foreground' : 'bg-white'}`}
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

      <div className="grid gap-3">
        {filtered.map((res, i) => (
          <Card key={i} className={`overflow-hidden border-none shadow-sm bg-white ${isEasy ? 'rounded-[30px] border-4 border-primary/5' : ''}`}>
            <CardContent className={isEasy ? "p-6" : "p-4"}>
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-secondary/10 text-secondary border-none font-bold">
                  {getIcon(res.type)}
                  {res.type}
                </Badge>
                {!isEasy && <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <MapPin className="h-3 w-3" /> {res.city}
                </div>}
              </div>
              
              <h4 className={`font-black mb-4 leading-tight ${isEasy ? 'text-2xl uppercase tracking-tight' : 'text-lg'}`}>{res.name}</h4>
              
              <div className="flex gap-3">
                <Button asChild size={isEasy ? "lg" : "sm"} variant="outline" className={`flex-1 rounded-xl h-14 gap-2 border-2 active:bg-muted font-bold ${isEasy ? 'text-lg' : ''}`}>
                  <a href={`tel:${res.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-5 w-5" /> Llamar
                  </a>
                </Button>
                <Button 
                  onClick={() => openInMaps(res.name, res.city)}
                  size={isEasy ? "lg" : "sm"} 
                  variant="secondary" 
                  className={`flex-1 rounded-xl h-14 gap-2 border shadow-sm font-bold ${isEasy ? 'text-lg' : ''}`}
                >
                  <Navigation className="h-5 w-5" /> Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
