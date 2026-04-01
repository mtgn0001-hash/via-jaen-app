
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
  Phone,
  ShieldAlert
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
  const langPack = translations[lang] || translations.es;
  const e = langPack.employment || translations.es.employment;
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

  const triggerClass = "rounded-xl transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg";

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-primary uppercase">{e.title}</h2>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{e.subtitle}</p>
          </div>
          <SpeechButton text={`${e.title}. ${e.subtitle}`} language={lang} />
        </div>
      </div>

      <section className="bg-primary/5 p-5 rounded-[2rem] border-2 border-primary/10 flex gap-4 items-center">
        <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
        <p className="text-xs font-bold text-slate-800 leading-tight uppercase">
          {e.legalWarning}
        </p>
      </section>

      <Tabs defaultValue="olive" className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-14 bg-white/50 backdrop-blur-md p-1.5 rounded-[20px] border border-primary/10 shadow-sm">
          <TabsTrigger value="olive" className={triggerClass}><Briefcase className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="search" className={triggerClass}><MapPin className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="cv" className={triggerClass}><FileText className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="rights" className={triggerClass}><Scale className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="startup" className={triggerClass}><Rocket className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="olive" className="space-y-4 pt-4">
          <Card className="border-none bg-primary/5 rounded-[2.5rem] overflow-hidden shadow-sm border-2 border-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {workData.campaign}
                </CardTitle>
                <SpeechButton text={`${workData.campaign}. ${workData.desc}`} language={lang} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed text-slate-700 font-bold">{workData.desc}</p>
              
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-primary flex items-center gap-2 uppercase">
                    <Scale className="h-4 w-4" /> {e.rights}
                  </h4>
                  <SpeechButton text={e.rightsText} language={lang} />
                </div>
                <p className="text-xs text-slate-600 leading-normal font-bold">
                  {e.rightsText}
                </p>
              </div>

              {workData.shelters && workData.shelters.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h3 className="font-black text-[10px] flex items-center gap-2 uppercase text-muted-foreground tracking-widest ml-2">
                    <Home className="h-4 w-4 text-primary" /> {e.shelterTitle}
                  </h3>
                  <div className="grid gap-3">
                    {workData.shelters.map((s) => (
                      <Card key={s.city} className="border-none shadow-none bg-white overflow-hidden rounded-3xl border-2 border-slate-100">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <div className="bg-primary/10 p-2.5 rounded-xl">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-black text-sm text-slate-900">{s.city}</h4>
                              <p className="text-[9px] text-muted-foreground uppercase font-black">{s.open}</p>
                            </div>
                          </div>
                          <a 
                            href={`tel:${s.phone.replace(/\s/g, '')}`}
                            className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
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
          <Card className="border-none shadow-xl bg-card overflow-hidden rounded-[2.5rem] border-2 border-primary/5">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2 font-black uppercase">
                <Building2 className="h-5 w-5 text-primary" /> {e.activeSearch}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-5 rounded-3xl bg-slate-50 border-2 space-y-3">
                <h4 className="font-black text-sm text-slate-900 uppercase">SAE (Servicio Andaluz de Empleo)</h4>
                <p className="text-xs text-muted-foreground font-bold">{e.saeDesc}</p>
                <Button variant="outline" size="sm" className="w-full rounded-2xl gap-2 h-12 border-2 font-black text-xs uppercase" asChild>
                  <a href="https://www.juntadeandalucia.es/organismos/empleoformacionytrabajoautonomo/sae.html" target="_blank" rel="noopener noreferrer">
                    Web Oficial SAE <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border-2 space-y-3">
                <h4 className="font-black text-sm text-slate-900 uppercase">Jaén Emplea</h4>
                <p className="text-xs text-muted-foreground font-bold">Portal de empleo municipal del Ayuntamiento de Jaén.</p>
                <Button variant="outline" size="sm" className="w-full rounded-2xl gap-2 h-12 border-2 font-black text-xs uppercase" asChild>
                  <a href="https://empleo.aytojaen.es/" target="_blank" rel="noopener noreferrer">
                    Web Jaén Emplea <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-black text-[10px] uppercase text-muted-foreground ml-3 tracking-widest">{e.ettTitle}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <ETTCard name="Adecco Jaén" url="https://www.adecco.es/oficina/adecco-jaen" />
                  <ETTCard name="Randstad Jaén" url="https://www.randstad.es/oficinas/jaen-457/" />
                  <ETTCard name="Manpower" url="https://www.manpower.es/" />
                  <ETTCard name="Synergie" url="https://www.synergie-ett.com/oficinas-ett-jaen/" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cv" className="space-y-4 pt-4">
          <Card className="border-none shadow-xl bg-card rounded-[2.5rem] border-2 border-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 font-black uppercase text-primary">
                <FileText className="h-5 w-5" /> {e.cvTools}
              </CardTitle>
              <CardDescription className="font-bold text-xs uppercase tracking-tight">{e.cvAdvice}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input 
                  placeholder="Tu Nombre Completo" 
                  value={cvData.name}
                  onChange={e => setCvData({...cvData, name: e.target.value})}
                  className="rounded-2xl h-14 font-black text-md bg-slate-50 border-none shadow-inner"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    placeholder="Email" 
                    value={cvData.email}
                    onChange={e => setCvData({...cvData, email: e.target.value})}
                    className="rounded-2xl h-14 font-bold bg-slate-50 border-none shadow-inner"
                  />
                  <Input 
                    placeholder="Teléfono" 
                    value={cvData.phone}
                    onChange={e => setCvData({...cvData, phone: e.target.value})}
                    className="rounded-2xl h-14 font-bold bg-slate-50 border-none shadow-inner"
                  />
                </div>
                <Textarea 
                  placeholder="Tu Experiencia (¿Qué trabajos has hecho?)" 
                  value={cvData.experience}
                  onChange={e => setCvData({...cvData, experience: e.target.value})}
                  className="rounded-3xl min-h-[120px] font-bold bg-slate-50 border-none shadow-inner"
                />
                <Textarea 
                  placeholder="Tus Habilidades (Idiomas, carnet conducir, etc.)" 
                  value={cvData.skills}
                  onChange={e => setCvData({...cvData, skills: e.target.value})}
                  className="rounded-3xl min-h-[100px] font-bold bg-slate-50 border-none shadow-inner"
                />
              </div>

              <Button 
                onClick={handleCopyCV} 
                className="w-full h-18 rounded-[1.5rem] h-16 gap-3 font-black text-xl shadow-xl active:scale-95 transition-all mt-4"
                variant={copied ? "secondary" : "default"}
              >
                {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                {copied ? "¡TEXTO COPIADO!" : "COPIAR TEXTO CV"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rights" className="space-y-4 pt-4">
          <Card className="border-none shadow-xl bg-card rounded-[2.5rem] border-2 border-primary/5">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-xl flex items-center gap-2 uppercase text-slate-900">
                  <Scale className="h-6 w-6 text-primary" /> {e.rights}
                </h4>
                <SpeechButton text={`${e.rights}. ${e.smiInfo}. ${e.rightsText}`} language={lang} />
              </div>
              
              <div className="bg-primary/5 p-8 rounded-[2rem] border-4 border-dashed border-primary/20 text-center">
                <h5 className="font-black text-xs mb-2 uppercase text-muted-foreground tracking-widest">{e.smiInfo}</h5>
                <p className="text-5xl font-black text-primary tracking-tighter">1.134€ <span className="text-sm text-slate-400 font-bold">/ mes</span></p>
                <p className="text-[10px] text-slate-400 mt-4 italic font-black uppercase tracking-widest">
                  * Basado en jornada completa de 40h semanales.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-destructive/5 rounded-3xl border-2 border-destructive/20 space-y-3">
                  <h5 className="font-black text-sm text-destructive uppercase flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" /> {e.inspection}
                  </h5>
                  <p className="text-xs text-destructive font-bold leading-relaxed">
                    Si sufres abusos o trabajas sin contrato en Jaén, puedes denunciar de forma anónima. Tu estatus migratorio no impide denunciar abusos.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-destructive font-black mt-2 uppercase text-[10px] tracking-widest" asChild>
                    <a href="http://www.mites.gob.es/itss/web/atencion_al_ciudadano/comunicacion_irregularidades/index.html" target="_blank" rel="noopener noreferrer">
                      Ir a Inspección de Trabajo <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl space-y-3 border-2 border-slate-100">
                  <h5 className="font-black text-sm text-slate-900 uppercase">Consultas Frecuentes</h5>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[13px] font-black text-slate-900">¿Qué pasa si tengo un accidente y no tengo contrato?</p>
                      <p className="text-xs text-muted-foreground font-bold leading-relaxed">
                        Tienes derecho a asistencia médica urgente y protección legal. El estatus migratorio no anula tus derechos fundamentales en el lugar de trabajo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="startup" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <Card className="border-none shadow-xl bg-card rounded-[2.5rem] overflow-hidden border-2 border-primary/5">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="bg-primary/10 p-4 rounded-3xl shadow-inner">
                    <Rocket className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-xl uppercase text-slate-900 tracking-tight">{e.startup}</h4>
                    <p className="text-sm text-muted-foreground font-bold leading-snug">{e.cadeInfo}</p>
                  </div>
                </div>
                <Button className="w-full h-16 rounded-2xl gap-3 border-2 font-black text-sm uppercase shadow-lg" variant="outline" asChild>
                  <a href="https://www.andaluciaemprende.es/" target="_blank" rel="noopener noreferrer">
                    BUSCAR CENTRO CADE JAÉN <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50 rounded-[2rem] border-2 border-slate-100">
              <CardContent className="p-6 flex gap-5 items-center">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-sm uppercase text-slate-900">{e.autonomous}</h4>
                  <p className="text-[11px] text-muted-foreground font-bold">Ayudas Cuota Cero para nuevos autónomos de la Junta.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ETTCard({ name, url }: { name: string; url: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="p-4 rounded-2xl border-2 bg-white text-[11px] font-black text-slate-800 flex items-center justify-between group hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
    >
      {name}
      <ExternalLink className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
