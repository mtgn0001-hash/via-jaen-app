
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Download,
  Building2,
  ShieldCheck,
  CreditCard,
  UserCheck
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/lib/store";
import { AppLogo } from "@/components/ui/AppLogo";
import { Badge } from "@/components/ui/badge";

type ProcedureListProps = {
  lang: Language;
};

export function ProcedureList({ lang }: ProcedureListProps) {
  const t = translations[lang] || translations.es;
  const l = t.launcher;
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  const [selectedLauncher, setSelectedLauncher] = useState<any | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const procedures = [
    {
      id: 'nie',
      title: 'NIE / Certificados (EX-15)',
      desc: 'Para trámites iniciales y certificados de no residente.',
      url: 'https://www.policia.es/documentacion/formularios/ex15.pdf',
      type: 'Extranjería',
      org: 'Police',
      rules: [l.rule1, l.rule2, l.rule3]
    },
    {
      id: 'tie',
      title: 'TIE / Residencia (EX-17)',
      desc: 'Solicitud de tarjeta tras obtener la autorización.',
      url: 'https://www.policia.es/documentacion/formularios/ex17.pdf',
      type: 'Extranjería',
      org: 'Police',
      rules: [l.rule1, l.rule2, "Llevar 3 fotos carné fondo blanco."]
    },
    {
      id: 'padron',
      title: 'Empadronamiento Municipal',
      desc: 'Alta en el censo del Ayuntamiento de Jaén.',
      url: 'https://sede.aytojaen.es/portal/p_20_contenedor1.jsp?codres=1&codmenu=497',
      type: 'Ayuntamiento',
      org: 'City',
      rules: ["Contrato de alquiler original.", "DNI/Pasaporte en vigor.", "Autorización de convivientes si procede."]
    },
    {
      id: 'tasa',
      title: 'Tasa 790-012 (Pago)',
      desc: 'Generador de pago para trámites de policía.',
      url: 'https://sede.policia.gob.es/Tasa790_012/',
      type: 'Tasas',
      org: 'Gov',
      rules: ["Marcar el trámite correcto.", "Imprimir 3 copias.", "Pagar en cajero o ventanilla."]
    },
    {
      id: 'ss',
      title: 'Seguridad Social (Cita)',
      desc: 'Número de afiliación y trámites en Jaén.',
      url: 'https://public.seg-social.es/en/web/guest/cita-previa',
      type: 'Seguridad Social',
      org: 'Gov',
      rules: ["Se solicita con Pasaporte o NIE.", "Necesitas el Padrón previo.", "Ubicación: C/ Adarves Bajos."]
    },
    {
      id: 'uja',
      title: 'Admisión Grados UJA',
      desc: 'Preinscripción oficial Universidad de Jaén.',
      url: 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/',
      type: 'UJA',
      org: 'UJA',
      rules: ["Plazos: Junio y Julio.", "Tener título homologado.", "Certificado de notas."]
    }
  ];

  const handleLaunch = (proc: any) => {
    setSelectedLauncher(proc);
  };

  const getOrgLogo = (org: string) => {
    switch (org) {
      case 'UJA': return <div className="p-2 bg-primary/10 rounded-xl"><AppLogo size={24} variant="minimal" /></div>;
      case 'Police': return <div className="p-2 bg-blue-100 rounded-xl text-blue-700"><ShieldCheck className="h-6 w-6" /></div>;
      case 'City': return <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700"><Building2 className="h-6 w-6" /></div>;
      default: return <div className="p-2 bg-slate-100 rounded-xl text-slate-700"><FileText className="h-6 w-6" /></div>;
    }
  };

  const getOrgLabel = (org: string) => {
    if (org === 'UJA') return l.ujaShield;
    if (org === 'City') return l.aytoShield;
    return l.officialShield;
  };

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Lanzador de Trámites</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Documentación oficial para la Provincia 23 (Jaén)</p>
      </div>

      <div className="grid gap-4">
        {procedures.map((proc) => (
          <Card 
            key={proc.id} 
            className="border-none bg-white/40 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/20"
            onClick={() => handleLaunch(proc)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                {getOrgLogo(proc.org)}
                <div>
                  <h3 className="font-black text-lg text-slate-900 tracking-tight leading-none mb-1">{proc.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[8px] uppercase font-black px-2 py-0.5 border-primary/20 bg-primary/5 text-primary">
                      {proc.type}
                    </Badge>
                    <p className="text-[9px] text-muted-foreground font-bold">{getOrgLabel(proc.org)}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {accMode === 'accessible' && (
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-primary/5 text-primary">
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <ExternalLink className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODAL DE LANZAMIENTO (CONFIRMACIÓN) */}
      <Dialog open={!!selectedLauncher} onOpenChange={() => { setSelectedLauncher(null); setShowInstructions(false); }}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white/90 backdrop-blur-2xl border-none shadow-2xl overflow-hidden p-0">
          <div className="bg-primary p-8 text-white text-center space-y-4">
            <div className="bg-white/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md shadow-inner">
              <Download className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-white text-2xl font-black uppercase tracking-tighter">
                {l.confirmTitle}
              </DialogTitle>
              <DialogDescription className="text-white/80 font-bold text-sm">
                {l.confirmDesc}
              </DialogDescription>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {!showInstructions ? (
              <div className="space-y-4">
                {(selectedLauncher?.id === 'nie' || selectedLauncher?.id === 'tie') && (
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-800 font-bold leading-tight">
                      {l.reminderPlaza}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    className="h-16 rounded-2xl font-black text-lg gap-3 shadow-xl" 
                    onClick={() => window.open(selectedLauncher?.url, '_blank')}
                  >
                    <ExternalLink className="h-6 w-6" /> {l.continue}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 rounded-2xl font-black gap-3 border-2 border-primary/20 text-primary"
                    onClick={() => setShowInstructions(true)}
                  >
                    <Info className="h-5 w-5" /> {l.instructions}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-3">
                  {selectedLauncher?.rules.map((rule: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="bg-primary h-6 w-6 rounded-lg flex items-center justify-center text-white font-black text-xs shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-xs font-bold text-slate-700 leading-tight">{rule}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full font-black text-[10px] uppercase tracking-widest text-primary"
                  onClick={() => setShowInstructions(false)}
                >
                  Volver a la descarga
                </Button>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
               Vía Jaén no almacena tus datos de formularios oficiales.
             </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
