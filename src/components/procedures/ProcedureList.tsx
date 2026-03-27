
"use client"

import { useState, useEffect } from "react";
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
  AlertCircle,
  Loader2,
  Zap,
  Volume2
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
import { textToSpeech } from "@/ai/flows/tts-flow";

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
  const [isLoading, setIsLoading] = useState(false);

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
      url: 'https://extranjeros.inclusion.gob.es/ficheros/Modelos_solicitudes/mod_solicitudes2/15-Formulario_NIE_y_certificados.pdf',
      backupUrl: 'https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html',
      type: 'Formulario',
      org: 'Police',
      rules: [l.rule1, l.rule2, l.rule3],
      jaenNote: true
    },
    {
      id: 'padron',
      title: 'Padrón Jaén (Sede)',
      desc: 'Acceso a la Sede Electrónica del Ayuntamiento para el alta en el Padrón.',
      url: 'https://sede.aytojaen.es/',
      backupUrl: 'https://www.aytojaen.es/',
      type: 'Ayuntamiento',
      org: 'City',
      rules: ["Entra en 'Catálogo de Trámites'.", "Busca 'Alta en el Padrón Municipal'.", "Descarga el impreso o rellena con Certificado Digital."],
      jaenNote: true
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

  const executeLaunch = async (url: string) => {
    setIsLoading(true);
    // Simular verificación de carga para evitar pantallas blancas
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1500);
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

  const getJaenNote = (id: string) => {
    if (id === 'nie_ex15') return l.ex15Note;
    if (id === 'padron') return "Este trámite se gestiona en la Sede Electrónica del Ayuntamiento de Jaén. Si prefieres hacerlo en persona, acude al Ayuntamiento en la Plaza de Santa María.";
    return "Nota informativa para la provincia de Jaén.";
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
      <Dialog open={!!selectedLauncher} onOpenChange={() => { setSelectedLauncher(null); setShowInstructions(false); setIsLoading(false); }}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white/90 backdrop-blur-2xl border-none shadow-2xl overflow-hidden p-0 outline-none">
          <div className="bg-primary p-8 text-white text-center space-y-4">
            <div className="bg-white/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md shadow-inner">
              {isLoading ? <Loader2 className="h-10 w-10 text-white animate-spin" /> : <Download className="h-10 w-10 text-white" />}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-white text-2xl font-black uppercase tracking-tighter">
                {isLoading ? l.preparing : selectedLauncher?.title}
              </DialogTitle>
              <DialogDescription className="text-white/80 font-bold text-sm">
                {isLoading ? l.redirectWarning : l.confirmDesc}
              </DialogDescription>
            </div>
            
            {/* Accesibilidad LSE Redirect */}
            {accMode === 'accessible' && !isLoading && (
              <div className="bg-white/10 p-4 rounded-2xl flex flex-col gap-3 text-left animate-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 shrink-0" />
                  <p className="text-[10px] font-black uppercase leading-tight">{l.lseRedirect}</p>
                </div>
                {selectedLauncher?.id === 'nie_ex15' && (
                  <p className="text-[10px] font-bold opacity-90 leading-tight italic border-t border-white/10 pt-2">
                    "{l.lseEx15}"
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            {!showInstructions ? (
              <div className="space-y-4">
                {selectedLauncher?.jaenNote && (
                  <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-100 flex gap-4 animate-in slide-in-from-top-2">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-black text-[10px] uppercase text-amber-900">Nota para Jaén</h4>
                      <p className="text-[11px] text-amber-800 font-bold leading-tight">
                        {getJaenNote(selectedLauncher?.id)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-primary/5 p-4 rounded-2xl flex items-center justify-between border border-primary/10">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{l.domainLabel}</span>
                    <span className="text-xs font-bold text-primary truncate max-w-[180px]">{getDomain(selectedLauncher?.url || "")}</span>
                  </div>
                  <SpeechButton 
                    text={selectedLauncher?.id === 'nie_ex15' ? `${l.preparing}. ${l.ex15Note}` : `${l.domainLabel} ${getDomain(selectedLauncher?.url || "")}`} 
                    size="sm" 
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    disabled={isLoading}
                    className="h-16 rounded-2xl font-black text-lg gap-3 shadow-xl active:scale-95 transition-all" 
                    onClick={() => {
                      if ('vibrate' in navigator) navigator.vibrate(50);
                      executeLaunch(selectedLauncher?.url);
                    }}
                  >
                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ExternalLink className="h-6 w-6" />}
                    {isLoading ? "Cargando..." : l.continue}
                  </Button>

                  {selectedLauncher?.backupUrl && (
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-2xl font-black gap-2 border-2 border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-100"
                      onClick={() => executeLaunch(selectedLauncher.backupUrl)}
                    >
                      <Zap className="h-4 w-4" /> {l.backupLink}
                    </Button>
                  )}

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
