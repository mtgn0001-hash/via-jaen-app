
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, ExternalLink, Heart, Home, Utensils, Stethoscope, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ResourceDirectoryProps = {
  lang: Language;
};

type ResourceType = 'ONG' | 'Salud' | 'Albergue' | 'Comedor' | 'Administración';

export function ResourceDirectory({ lang }: ResourceDirectoryProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState("Todas");
  const [selectedType, setSelectedType] = useState<string>("Todos");

  const resources = [
    // JAEN
    { name: 'Cruz Roja Española Jaén', city: 'Jaén', type: 'ONG', phone: '953 251 540', url: 'https://www.cruzroja.es' },
    { name: 'Cáritas Interparroquial', city: 'Jaén', type: 'ONG', phone: '953 234 445', url: 'https://www.caritas.es/jaen/' },
    { name: 'Albergue Municipal (Transeúntes)', city: 'Jaén', type: 'Albergue', phone: '953 219 100', url: '#' },
    { name: 'Comedor Social San Roque', city: 'Jaén', type: 'Comedor', phone: '953 241 122', url: '#' },
    { name: 'Centro de Salud Bulevar', city: 'Jaén', type: 'Salud', phone: '953 013 100', url: 'https://www.sspa.juntadeandalucia.es' },
    
    // MADRID
    { name: 'CEAR Madrid', city: 'Madrid', type: 'ONG', phone: '915 550 698', url: 'https://www.cear.es' },
    { name: 'Centro de Acogida San Isidro', city: 'Madrid', type: 'Albergue', phone: '913 656 461', url: '#' },
    { name: 'Comedor Social María Inmaculada', city: 'Madrid', type: 'Comedor', phone: '915 413 543', url: '#' },
    { name: 'Centro de Salud Segovia', city: 'Madrid', type: 'Salud', phone: '914 367 700', url: '#' },
    { name: 'ACCEM Madrid', city: 'Madrid', type: 'ONG', phone: '915 327 478', url: 'https://www.accem.es' },

    // BARCELONA
    { name: 'Cruz Roja Barcelona', city: 'Barcelona', type: 'ONG', phone: '933 002 020', url: '#' },
    { name: 'CAP Drassanes (Salud)', city: 'Barcelona', type: 'Salud', phone: '933 294 495', url: '#' },
    { name: 'Centro de Acogida Convive', city: 'Barcelona', type: 'Albergue', phone: '934 121 212', url: '#' },
    { name: 'Menjador Social Canpedró', city: 'Barcelona', type: 'Comedor', phone: '934 265 110', url: '#' },
    { name: 'Arrels Fundació', city: 'Barcelona', type: 'ONG', phone: '934 412 990', url: 'https://www.arrelsfundacio.org' },

    // VALENCIA
    { name: 'Centro de Salud Guillem de Castro', city: 'Valencia', type: 'Salud', phone: '963 862 000', url: '#' },
    { name: 'Albergue Municipal San Juan de Dios', city: 'Valencia', type: 'Albergue', phone: '963 655 425', url: '#' },
    { name: 'Comedor Social San José', city: 'Valencia', type: 'Comedor', phone: '963 916 430', url: '#' },
    { name: 'ACCEM Valencia', city: 'Valencia', type: 'ONG', phone: '963 154 340', url: '#' },

    // SEVILLA
    { name: 'Comedor Social San Juan de Dios', city: 'Sevilla', type: 'Comedor', phone: '954 221 212', url: '#' },
    { name: 'Centro de Salud Alameda', city: 'Sevilla', type: 'Salud', phone: '954 919 191', url: '#' },
    { name: 'Ateneo de Sevilla (Ayuda)', city: 'Sevilla', type: 'ONG', phone: '954 214 561', url: '#' },
    { name: 'Albergue Municipal Sevilla', city: 'Sevilla', type: 'Albergue', phone: '955 470 200', url: '#' },
  ];

  const cities = ["Todas", t.cities.jaen, t.cities.madrid, t.cities.barcelona, t.cities.valencia, t.cities.sevilla];
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

  const filtered = resources.filter(r => 
    (selectedCity === "Todas" || r.city === selectedCity) &&
    (selectedType === "Todos" || r.type === selectedType) &&
    (r.name.toLowerCase().includes(filter.toLowerCase()) || r.type.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold">{t.directory}</h2>

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
          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Provincia / Ciudad</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {cities.map(city => (
              <Badge 
                key={city}
                variant={selectedCity === city ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all border-none shadow-sm"
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Badge>
            ))}
          </div>
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

      <div className="grid gap-3">
        {filtered.length > 0 ? (
          filtered.map((res, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20 flex items-center gap-1 font-bold">
                    {getIcon(res.type)}
                    {res.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <MapPin className="h-3 w-3" /> {res.city}
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-4 leading-tight">{res.name}</h4>
                
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1 rounded-xl h-11 gap-2 border-2 active:bg-muted">
                    <a href={`tel:${res.phone.replace(/\s/g, '')}`}>
                      <Phone className="h-4 w-4" /> Llamar
                    </a>
                  </Button>
                  {res.url !== '#' && (
                    <Button asChild size="sm" variant="ghost" className="rounded-xl h-11 border-2 w-14 active:bg-muted">
                      <a href={res.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-muted/30 rounded-3xl">
            <p className="text-muted-foreground text-sm font-bold">No se encontraron recursos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
