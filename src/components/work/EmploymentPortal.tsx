
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Rocket, 
  ExternalLink, 
  Info,
  MapPin,
  Building2,
  Scale,
  Plus,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SpeechButton } from "@/components/ui/SpeechButton";

type EmploymentPortalProps = {
  lang: Language;
};

export function EmploymentPortal({ lang }: EmploymentPortalProps) {
  const t = translations[lang];
  const e = t.employment;

  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: ""
  });
  const [copied, setCopied] = useState(false);

  const handleCopyCV = () => {
    const text = `
Nombre: ${cvData.name}
Email: ${cvData.email}
Teléfono: ${cvData.phone}

Experiencia:
${cvData.experience}

Habilidades:
${cvData.skills}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{e.title}</h2>
            <p className="text-muted-foreground text-sm">{e.subtitle}</p>
          </div>
          <SpeechButton text={`${e.title}. ${e.subtitle}`} language={lang} />
        </div>
      </div>

      <section className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3">
        <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
        <p className="text-xs font-bold text-amber-800">
          {e.legalWarning}
        </p>
      </section>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid grid-cols-4 w-full h-12 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="search" className="rounded-xl"><MapPin className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="cv" className="rounded-xl"><FileText className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="rights" className="rounded-xl"><ShieldCheck className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="startup" className="rounded-xl"><Rocket className="h-4 w-4" /></TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" /> {e.activeSearch}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border space-y-2">
                <h4 className="font-bold text-sm">SAE (Servicio Andaluz de Empleo)</h4>
                <p className="text-xs text-muted-foreground">{e.saeDesc}</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl gap-2" asChild>
                  <a href="https://www.juntadeandalucia.es/organismos/empleoformacionytrabajoautonomo/sae.html" target="_blank">
                    Web SAE <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border space-y-2">
                <h4 className="font-bold text-sm">Jaén Emplea</h4>
                <p className="text-xs text-muted-foreground">Portal de empleo municipal del Ayuntamiento de Jaén.</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl gap-2" asChild>
                  <a href="https://empleo.aytojaen.es/" target="_blank">
                    Web Jaén Emplea <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-muted-foreground ml-1">{e.ettTitle}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <ETTCard name="Adecco Jaén" />
                  <ETTCard name="Randstad Martos" />
                  <ETTCard name="Manpower" />
                  <ETTCard name="Synergie" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cv" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> {e.cvTools}
              </CardTitle>
              <CardDescription>{e.cvAdvice}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input 
                  placeholder="Nombre completo" 
                  value={cvData.name}
                  onChange={e => setCvData({...cvData, name: e.target.value})}
                  className="rounded-xl"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Email" 
                    value={cvData.email}
                    onChange={e => setCvData({...cvData, email: e.target.value})}
                    className="rounded-xl"
                  />
                  <Input 
                    placeholder="Teléfono" 
                    value={cvData.phone}
                    onChange={e => setCvData({...cvData, phone: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                <Textarea 
                  placeholder="Experiencia (Deseas poner lo que has hecho antes)" 
                  value={cvData.experience}
                  onChange={e => setCvData({...cvData, experience: e.target.value})}
                  className="rounded-xl min-h-[100px]"
                />
                <Textarea 
                  placeholder="Habilidades (Idiomas, carnet de conducir, etc.)" 
                  value={cvData.skills}
                  onChange={e => setCvData({...cvData, skills: e.target.value})}
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              <Button 
                onClick={handleCopyCV} 
                className="w-full rounded-xl h-12 gap-2"
                variant={copied ? "secondary" : "default"}
              >
                {copied ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar Texto del CV"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rights" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" /> {e.rights}
                </h4>
                <SpeechButton text={`${e.rights}. ${e.smiInfo}`} language={lang} />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200">
                <h5 className="font-bold text-sm mb-2">{e.smiInfo}</h5>
                <p className="text-2xl font-black text-primary">1.134€ <span className="text-xs text-muted-foreground font-normal">/ mes (aprox)</span></p>
                <p className="text-[10px] text-muted-foreground mt-2 italic">
                  * Basado en jornada completa de 40h semanales.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <h5 className="font-bold text-xs text-red-900 mb-1">{e.inspection}</h5>
                  <p className="text-[10px] text-red-800 leading-relaxed">
                    Si sufres abusos o trabajas sin contrato, puedes denunciar de forma anónima.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-red-700 font-bold mt-2" asChild>
                    <a href="http://www.mites.gob.es/itss/web/atencion_al_ciudadano/comunicacion_irregularidades/index.html" target="_blank">
                      Ir a Inspección de Trabajo <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl space-y-2">
                  <h5 className="font-bold text-sm text-primary">{e.faqLawyer}</h5>
                  <div className="space-y-2">
                    <p className="text-xs font-bold">¿Qué pasa si tengo un accidente y no tengo papeles?</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Tienes derecho a asistencia médica y protección legal inmediata. El estatus migratorio no anula tus derechos humanos básicos en el trabajo.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="startup" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-50 p-3 rounded-2xl">
                    <Rocket className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{e.startup}</h4>
                    <p className="text-xs text-muted-foreground">{e.cadeInfo}</p>
                  </div>
                </div>
                <Button className="w-full rounded-xl h-11" variant="outline" asChild>
                  <a href="https://www.andaluciaemprende.es/" target="_blank">
                    Buscar Centro CADE <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex gap-4 items-center">
                <div className="bg-green-50 p-2 rounded-xl">
                  <Plus className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xs">{e.autonomous}</h4>
                  <p className="text-[10px] text-muted-foreground">Ayudas de la Junta de Andalucía para nuevos autónomos.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ETTCard({ name }: { name: string }) {
  return (
    <div className="p-2 px-3 rounded-lg border bg-white text-[10px] font-bold text-slate-700 flex items-center justify-between group hover:border-primary transition-colors">
      {name}
      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
