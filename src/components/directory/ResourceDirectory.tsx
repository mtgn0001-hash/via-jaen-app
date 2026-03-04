"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ResourceDirectoryProps = {
  lang: Language;
};

export function ResourceDirectory({ lang }: ResourceDirectoryProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState("Todas");

  const resources = [
    { name: 'Cruz Roja Española', city: 'Jaén', type: 'Ayuda Humanitaria', phone: '953 251 540', url: 'https://www.cruzroja.es' },
    { name: 'CEAR (Comisión Española Ayuda Refugiado)', city: 'Madrid', type: 'Asilo/Refugio', phone: '915 550 698', url: 'https://www.cear.es' },
    { name: 'Cáritas Diócesana', city: 'Barcelona', type: 'Asistencia Social', phone: '934 810 000', url: 'https://www.caritas.barcelona' },
    { name: 'ACCEM', city: 'Valencia', type: 'Integración', phone: '963 154 340', url: 'https://www.accem.es' },
    { name: 'Oficina Extranjería Jaén', city: 'Jaén', type: 'Administración', phone: '953 999 000', url: '#' },
    { name: 'Albergue Municipal Jaén', city: 'Jaén', type: 'Alojamiento', phone: '953 219 100', url: '#' },
  ];

  const cities = ["Todas", t.cities.jaen, t.cities.madrid, t.cities.barcelona, t.cities.valencia];

  const filtered = resources.filter(r => 
    (selectedCity === "Todas" || r.city === selectedCity) &&
    (r.name.toLowerCase().includes(filter.toLowerCase()) || r.type.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold">{t.directory}</h2>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar organización o tipo de ayuda..." 
            className="pl-10 h-12 rounded-2xl bg-white border-none shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {cities.map(city => (
            <Badge 
              key={city}
              variant={selectedCity === city ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all"
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((res, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-secondary/20 text-secondary border-none hover:bg-secondary/30">
                  {res.type}
                </Badge>
                <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground uppercase">
                  <MapPin className="h-3 w-3" /> {res.city}
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-3">{res.name}</h4>
              
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1 rounded-xl h-10 gap-2 border-2">
                  <a href={`tel:${res.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-4 w-4" /> Llamar
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost" className="rounded-xl h-10 border-2">
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}