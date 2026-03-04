
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
  Check,
  Home,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";
import { provincesData } from "@/lib/provinces";

type EmploymentPortalProps = {
  lang: Language;
};

export function EmploymentPortal({ lang }: EmploymentPortalProps) {
  const t = translations[lang];
  const e = t.employment;
  const { progress } = useLocalStorage();
  const currentProvince = provincesData[progress.province] || provincesData.jaen;
  const workData = currentProvince.work;

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

      <section className="bg-accent/20 p-4 rounded-2xl border border-primary/10 flex gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
        <p className="text-xs font-bold text-foreground">
          {e.legalWarning}
        </p>
      </section>

      <Tabs defaultValue="olive" className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-12 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="olive" className="rounded-xl"><Briefcase className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="search" className="rounded-xl"><MapPin className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="cv" className="rounded-xl"><FileText className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="rights" className="rounded-xl"><ShieldCheck className="h-4 w-4" /></TabsTrigger>
          <TabsTrigger value="startup" className="rounded-xl"><Rocket className="h-4 w-4" /></TabsTrigger>
        </TabsList>

        <TabsContent value="olive" className="space-y-4 pt-4">
          <Card className="border-none bg-primary/5 rounded-3xl overflow-hidden shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {workData.campaign}
                </CardTitle>
                <SpeechButton text={`${workData.campaign}. ${workData.desc}`} language={lang} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground font-medium">{workData.desc}</p>
              
              <div className="bg-card p-5 rounded-3xl border shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-primary flex items-center gap-2 uppercase">
                    <Scale className="h-4 w-4" /> {t.work.rights}
                  </h4>
                  <SpeechButton text={t.work.rightsText} language={lang} />
                </div>
                <p className="text-xs text-muted-foreground leading-normal font-medium">
                  {t.work.rightsText}
                </p>
              </div>

              {workData.shelters.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="font-black text-sm flex items-center gap-2 uppercase text-foreground">
                    <Home className="h-4 w-4 text-primary" /> {t.work.shelterTitle}
                  </h3>
                  <div className="grid gap-2">
                    {workData.shelters.map((s) => (
                      <Card key={s.city} className="border-none shadow-none bg-card overflow-hidden rounded-2xl border border-primary/10">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <div className="bg-primary/10 p-2 rounded-xl">
                              <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-black text-xs text-foreground">{s.city}</h4>
                              <p className="text-[9px] text-muted-foreground uppercase font-black">{s.open}</p>
                            </div>
                          </div>
                          <a 
                            href={`tel:${s.phone.replace(/\s/g, '')}`}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[11px] font-black flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
                          >
                            <Phone className="h-3 w-3" /> {s.phone}
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-card overflow-hidden rounded-3xl border border-primary/5">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
                <Building2 className="h-5 w-5 text-primary" /> {e.activeSearch}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
                <h4 className="font-black text-sm">SAE (Servicio Andaluz de Empleo)</h4>
                <p className="text-xs text-muted-foreground font-medium">{e.saeDesc}</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl gap-2 h-10 border-2 font-bold" asChild>
                  <a href="https://www.juntadeandalucia.es/organismos/empleoformacionytrabajoautonomo/sae.html" target="_blank">
                    Web SAE <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
                <h4 className="font-black text-sm">Jaén Emplea</h4>
                <p className="text-xs text-muted-foreground font-medium">Portal de empleo municipal del Ayuntamiento de Jaén.</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl gap-2 h-10 border-2 font-bold" asChild>
                  <a href="https://empleo.aytojaen.es/" target="_blank">
                    Web Jaén Emplea <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-[10px] uppercase text-muted-foreground ml-1 tracking-widest">{e.ettTitle}</h4>
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
          <Card className="border-none shadow-sm bg-card rounded-3xl border border-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
                <FileText className="h-5 w-5 text-primary" /> {e.cvTools}
              </CardTitle>
              <CardDescription className="font-medium">{e.cvAdvice}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input 
                  placeholder="Nombre completo" 
                  value={cvData.name}
                  onChange={e => setCvData({...cvData, name: e.target.value})}
                  className="rounded-2xl h-12 font-bold bg-muted/30 border-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Email" 
                    value={cvData.email}
                    onChange={e => setCvData({...cvData, email: e.target.value})}
                    className="rounded-2xl h-12 font-bold bg-muted/30 border-none"
                  />
                  <Input 
                    placeholder="Teléfono" 
                    value={cvData.phone}
                    onChange={e => setCvData({...cvData, phone: e.target.value})}
                    className="rounded-2xl h-12 font-bold bg-muted/30 border-none"
                  />
                </div>
                <Textarea 
                  placeholder="Experiencia (Qué has hecho antes)" 
                  value={cvData.experience}
                  onChange={e => setCvData({...cvData, experience: e.target.value})}
                  className="rounded-2xl min-h-[100px] font-medium bg-muted/30 border-none"
                />
                <Textarea 
                  placeholder="Habilidades (Idiomas, carnet, etc.)" 
                  value={cvData.skills}
                  onChange={e => setCvData({...cvData, skills: e.target.value})}
                  className="rounded-2xl min-h-[80px] font-medium bg-muted/30 border-none"
                />
              </div>

              <Button 
                onClick={handleCopyCV} 
                className="w-full rounded-2xl h-14 gap-2 font-black text-lg shadow-lg active:scale-95 transition-transform"
                variant={copied ? "secondary" : "default"}
              >
                {copied ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {copied ? "Copiado" : "Copiar Texto del CV"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rights" className="space-y-4 pt-4">
          <Card className="border-none shadow-sm bg-card rounded-3xl border border-primary/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-sm flex items-center gap-2 uppercase text-foreground">
                  <Scale className="h-5 w-5 text-primary" /> {e.rights}
                </h4>
                <SpeechButton text={`${e.rights}. ${e.smiInfo}`} language={lang} />
              </div>
              
              <div className="bg-muted/50 p-6 rounded-3xl border-2 border-dashed border-primary/20">
                <h5 className="font-black text-xs mb-2 uppercase text-muted-foreground">{e.smiInfo}</h5>
                <p className="text-3xl font-black text-primary">1.134€ <span className="text-sm text-muted-foreground font-bold">/ mes (aprox)</span></p>
                <p className="text-[10px] text-muted-foreground mt-2 italic font-medium">
                  * Basado en jornada completa de 40h semanales.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-destructive/5 rounded-2xl border border-destructive/20">
                  <h5 className="font-black text-xs text-destructive mb-1 uppercase tracking-wider">{e.inspection}</h5>
                  <p className="text-xs text-destructive leading-relaxed font-medium">
                    Si sufres abusos o trabajas sin contrato, puedes denunciar de forma anónima.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-destructive font-black mt-2 uppercase text-[10px]" asChild>
                    <a href="http://www.mites.gob.es/itss/web/atencion_al_ciudadano/comunicacion_irregularidades/index.html" target="_blank">
                      Ir a Inspección de Trabajo <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="p-5 bg-primary/5 rounded-3xl space-y-3 border border-primary/10">
                  <h5 className="font-black text-sm text-primary uppercase">{e.faqLawyer}</h5>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-foreground">¿Qué pasa si tengo un accidente y no tengo papeles?</p>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
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
            <Card className="border-none shadow-sm bg-card rounded-3xl overflow-hidden border border-primary/5">
              <CardContent className="p-5 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-sm uppercase text-foreground">{e.startup}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{e.cadeInfo}</p>
                  </div>
                </div>
                <Button className="w-full rounded-xl h-12 gap-2 border-2 font-bold" variant="outline" asChild>
                  <a href="https://www.andaluciaemprende.es/" target="_blank">
                    Buscar Centro CADE <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card rounded-2xl border border-primary/5">
              <CardContent className="p-4 flex gap-4 items-center">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-xs uppercase text-foreground">{e.autonomous}</h4>
                  <p className="text-[10px] text-muted-foreground font-medium">Ayudas de la Junta de Andalucía para nuevos autónomos.</p>
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
    <div className="p-3 px-4 rounded-xl border bg-card text-[10px] font-black text-foreground flex items-center justify-between group hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95">
      {name}
      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
