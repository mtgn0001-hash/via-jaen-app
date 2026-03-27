
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  Play, 
  Info, 
  AlertTriangle,
  Download,
  Building2,
  ShieldCheck,
  Stethoscope,
  Copy,
  Check,
  AlertCircle
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/lib/store";
import { AppLogo } from "@/components/ui/AppLogo";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SpeechButton } from "@/components/ui/SpeechButton";

type ProcedureListProps = {
  lang: Language;
};

export function ProcedureList({ lang }: ProcedureListProps) {
  const t = translations[lang] || translations.es;
  const l = t.launcher;
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  const accMode = progress.accessibilityMode;

  const [selectedLauncher, setSelectedLauncher] = useState<any | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const procedures = [
    {
      id: 'nie_cita',
      title: 'Cita Previa NIE (Jaén)',
      desc: 'Acceso directo a la Sede Electrónica para huellas o certificados.',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html',
      type: 'Extranjería',
      org: 'Police',
      rules: [l.rule1, l.rule2, "Selecciona 'JAÉN' en el desplegable de provincias (23)."]
    },
    {
      id: 'nie_ex15',
      title: 'Modelo EX-15 (NIE)',
      desc: 'Formulario oficial de solicitud de Número de Identidad de Extranjero.',
      url: 'https://www.policia.es/documentacion/formularios/ex15.pdf',
      type: 'Formulario',
      org: 'Police',
      rules: [l.rule1, l.rule2, l.rule3]
    },
    {
      id: 'padron',
      title: 'Padrón Jaén (Impresos)',
      desc: 'Descarga directa del alta en el Padrón del Ayuntamiento de Jaén.',
      url: 'https://sede.aytojaen.es/portal/p_20_contenedor1.jsp?codres=1&codmenu=497',
      type: 'Ayuntamiento',
      org: 'City',
      rules: ["Contrato de alquiler original.", "Pasaporte en vigor.", "Original y copia de todos los documentos."]
    },
    {
      id: 'tasa',
      title: 'Tasa 790-012 (Pago)',
      desc: 'Genera el formulario de pago para trámites de TIE/Residencia.',
      url: 'https://sede.policia.gob.es/Tasa790_012/',
      type: 'Tasas',
      org: 'Gov',
      rules: ["Selecciona el trámite correcto.", "Imprime 3 copias.", "Paga en el banco antes de tu cita."]
    },
    {
      id: 'salud',
      title: 'Cita Médica (ClicSalud+)',
      desc: 'Gestiona tu cita en centros de Jaén (San Felipe, Belén, etc).',
      url: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/',
      type: 'Salud',
      org: 'SAS',
      rules: ["Necesitas número de tarjeta sanitaria.", "O certificado digital / Cl@ve.", "Válido para toda Andalucía."]
    },
    {
      id: 'uja_admision',
      title: 'Admisión Grados UJA',
      desc: 'Portal oficial de automatrícula Universidad de Jaén.',
      url: 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/',
      type: 'UJA',
      org: 'UJA',
      rules: ["Preinscripción en Junio/Julio.", "Consulta el calendario del DUA.", "Ten tu título homologado listo."]
    }
  ];

  const handleLaunch = (proc: any) => {
    setSelectedLauncher(proc);
  };

  const handleCopyLink = () => {
    if (!selectedLauncher) return;
    navigator.clipboard.writeText(selectedLauncher.url);
    setIsCopied(true);
    toast({ title: l.copied });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReportError = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    toast({
      title: l.reportSuccess,
      description: `Reportado: ${title}`,
    });
  };

  const getOrgLogo = (org: string) => {
    switch (org) {
      case 'UJA': return <div className="p-2 bg-primary/10 rounded-xl"><AppLogo size={24} variant="minimal" /></div>;
      case 'Police': return <div className="p-2 bg-blue-100 rounded-xl text-blue-700"><ShieldCheck className="h-6 w-6" /></div>;
      case 'City': return <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700"><Building2 className="h-6 w-6" /></div>;
      case 'SAS': return <div className="p-2 bg-red-50 rounded-xl text-red-600"><Stethoscope className="h-6 w-6" /></div>;
      default: return <div className="p-2 bg-slate-100 rounded-xl text-slate-700"><FileText className="h-6 w-6" /></div>;
    }
  };

  const getOrgLabel = (org: string) => {
    if (org === 'UJA') return l.ujaShield;
    if (org === 'City') return l.aytoShield;
    if (org === 'SAS') return l.sasShield;
    return l.officialShield;
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Lanzador de Trámites</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Sedes Electrónicas Oficiales - Provincia 23</p>
      </div>

      <div className="grid gap-4">
        {procedures.map((proc) => (
          <div key={proc.id} className="space-y-1">
            <Card 
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
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <button 
              onClick={(e) => handleReportError(e, proc.title)}
              className="text-[9px] font-black uppercase text-primary/40 hover:text-primary transition-colors ml-6 tracking-widest"
            >
              {l.linkError}
            </button>
          </div>
        ))}
      </div>

      {/* VENTANA PUENTE (BOTTOM SHEET / DIALOG) */}
      <Dialog open={!!selectedLauncher} onOpenChange={() => { setSelectedLauncher(null); setShowInstructions(false); }}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white/90 backdrop-blur-2xl border-none shadow-2xl overflow-hidden p-0 outline-none">
          <div className="bg-primary p-8 text-white text-center space-y-4">
            <div className="bg-white/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md shadow-inner">
              <Download className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-white text-2xl font-black uppercase tracking-tighter">
                {selectedLauncher?.title}
              </DialogTitle>
              <DialogDescription className="text-white/80 font-bold text-sm">
                {l.confirmDesc}
              </DialogDescription>
            </div>
            
            {/* Accesibilidad LSE Redirect */}
            {accMode === 'accessible' && (
              <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-3 text-left">
                <Play className="h-5 w-5 shrink-0" />
                <p className="text-[10px] font-black uppercase leading-tight">{l.lseRedirect}</p>
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            {!showInstructions ? (
              <div className="space-y-4">
                {(selectedLauncher?.id.includes('nie')) && (
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-800 font-bold leading-tight">
                      {l.reminderPlaza}
                    </p>
                  </div>
                )}

                <div className="bg-primary/5 p-4 rounded-2xl flex items-center justify-between border border-primary/10">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{l.domainLabel}</span>
                    <span className="text-xs font-bold text-primary truncate max-w-[180px]">{getDomain(selectedLauncher?.url || "")}</span>
                  </div>
                  <SpeechButton text={`${l.domainLabel} ${getDomain(selectedLauncher?.url || "")}`} size="sm" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    className="h-16 rounded-2xl font-black text-lg gap-3 shadow-xl active:scale-95" 
                    onClick={() => {
                      if ('vibrate' in navigator) navigator.vibrate(50);
                      window.open(selectedLauncher?.url, '_blank');
                    }}
                  >
                    <ExternalLink className="h-6 w-6" /> {l.continue}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-2xl font-black gap-2 border-2 border-primary/20 text-primary"
                      onClick={() => setShowInstructions(true)}
                    >
                      <Info className="h-4 w-4" /> {l.instructions}
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="h-12 rounded-2xl font-black gap-2 border-2 border-primary/5"
                      onClick={handleCopyLink}
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {l.copyLink}
                    </Button>
                  </div>
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

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2">
             <AlertCircle className="h-3 w-3 text-slate-400" />
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
               Vía Jaén: Conexión segura con sedes oficiales.
             </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
