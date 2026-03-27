
"use client"

import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, ExternalLink, FileText, AlertCircle, Zap } from "lucide-react";

type FormDownloaderProps = {
  lang: Language;
};

export function FormDownloader({ lang }: FormDownloaderProps) {
  const t = translations[lang];

  const forms = [
    {
      title: 'Modelo EX-15',
      desc: 'Solicitud de NIE y Certificados (Imprescindible para Jaén)',
      url: 'https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html',
      backupUrl: 'https://www.inclusion.gob.es/web/migraciones/modelos-de-solicitud',
      type: 'Sede'
    },
    {
      title: 'Modelo 790-012',
      desc: 'Tasa para trámites de TIE/Residencia',
      url: 'https://sede.policia.gob.es/Tasa790_012/',
      type: 'Online'
    },
    {
      title: 'Modelo EX-10',
      desc: 'Solicitud de Arraigo (Circunstancias Excepcionales)',
      url: 'https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html',
      type: 'Sede'
    }
  ];

  const externalLinks = [
    { name: 'Cita Previa Extranjería', url: 'https://icp.administracionelectronica.gob.es/icpco/index.html' },
    { name: 'Ayuntamiento de Jaén (Padrón)', url: 'https://sede.aytojaen.es/' },
    { name: 'ClicSalud+ (Tarjeta Sanitaria SAS)', url: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/' },
    { name: 'Import@ss (Vida Laboral)', url: 'https://portal.seg-social.gob.es/wps/portal/importass/importass' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold">{t.forms}</h2>

      <section className="bg-accent/10 p-4 rounded-2xl border border-accent/20 flex gap-3">
        <AlertCircle className="h-5 w-5 text-accent shrink-0" />
        <p className="text-xs font-medium text-accent-foreground">
          {t.pdfNote}
        </p>
      </section>

      <div className="grid gap-4">
        {forms.map((form) => (
          <Card key={form.title} className="overflow-hidden border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{form.title}</CardTitle>
                <div className="bg-muted px-2 py-0.5 rounded text-[10px] font-bold uppercase">{form.type}</div>
              </div>
              <CardDescription>{form.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button 
                asChild 
                className="w-full gap-2 rounded-xl"
                variant={form.type === 'Sede' ? 'default' : 'secondary'}
              >
                <a href={form.url} target="_blank" rel="noopener noreferrer">
                  {form.type === 'Sede' ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                  {form.type === 'Sede' ? 'Ir a la Sede' : t.downloadForm}
                </a>
              </Button>
              {form.backupUrl && (
                <Button 
                  asChild 
                  variant="ghost" 
                  className="w-full text-[10px] font-black uppercase text-muted-foreground hover:text-primary h-8"
                >
                  <a href={form.backupUrl} target="_blank" rel="noopener noreferrer">
                    <Zap className="h-3 w-3 mr-1" /> Backup Link
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-primary" /> {t.officialSources}
        </h3>
        <div className="grid gap-2">
          {externalLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-2xl border hover:border-primary transition-all group"
            >
              <span className="text-sm font-bold text-foreground/80 group-hover:text-primary">{link.name}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
