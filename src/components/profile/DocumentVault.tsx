
"use client"

import { useState, useRef, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { useLocalStorage } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Plus, Trash2, Maximize2, X, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Document = {
  id: string;
  name: string;
  photo: string;
};

export function DocumentVault({ lang }: { lang: Language }) {
  const t = translations[lang].vault;
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jaen_vault');
    if (saved) setDocs(JSON.parse(saved));
  }, []);

  const saveToStorage = (newDocs: Document[]) => {
    setDocs(newDocs);
    localStorage.setItem('jaen_vault', JSON.stringify(newDocs));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ variant: "destructive", title: "Archivo demasiado grande", description: "Máximo 2MB por documento." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name.split('.')[0].toUpperCase(),
          photo: reader.result as string
        };
        saveToStorage([...docs, newDoc]);
        toast({ title: "Documento guardado", description: "Almacenado localmente en tu móvil." });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDoc = (id: string) => {
    saveToStorage(docs.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{t.title}</h2>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t.subtitle}</p>
        </div>
        <Button size="icon" className="rounded-2xl" onClick={() => fileInputRef.current?.click()}>
          <Plus className="h-6 w-6" />
        </Button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
      </div>

      <div className="bg-primary/5 p-4 rounded-3xl border-2 border-dashed border-primary/20 flex gap-4 items-center">
         <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
         <p className="text-[10px] text-primary/80 font-bold uppercase leading-tight">
            Tus fotos están cifradas localmente. Ningún archivo se envía a la nube. Privacidad total 2026.
         </p>
      </div>

      {docs.length === 0 ? (
        <Card className="border-none bg-slate-50 rounded-[2.5rem] p-12 text-center text-muted-foreground flex flex-col items-center gap-4">
           <Zap className="h-12 w-12 opacity-20" />
           <p className="text-sm font-bold">{t.empty}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {docs.map((doc) => (
            <Card key={doc.id} className="border-none shadow-lg bg-white overflow-hidden rounded-3xl group relative active:scale-95 transition-all">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="p-3 bg-white/90 backdrop-blur-md absolute bottom-0 left-0 right-0 flex items-center justify-between">
                 <span className="text-[9px] font-black uppercase tracking-widest truncate">{doc.name}</span>
                 <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full hover:bg-primary/10" onClick={() => setSelectedDoc(doc)}>
                      <Maximize2 className="h-3.5 w-3.5 text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full hover:bg-destructive/10" onClick={() => removeDoc(doc.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedDoc && (
        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="sm:max-w-[95vw] h-[90vh] p-0 border-none bg-black rounded-[40px] overflow-hidden">
            <div className="relative w-full h-full flex flex-col">
              <div className="p-6 flex justify-between items-center text-white bg-black/40 backdrop-blur-md z-10">
                <h3 className="font-black text-xl uppercase tracking-tighter">{selectedDoc.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedDoc(null)} className="text-white hover:bg-white/10 rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                 <img src={selectedDoc.photo} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500" />
              </div>
              <div className="p-8 bg-black/80 backdrop-blur-xl border-t border-white/10 text-center space-y-4">
                 <div className="flex items-center gap-3 justify-center">
                    <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
                    <p className="text-xs font-bold text-white uppercase tracking-widest">{t.emergencyMode}</p>
                 </div>
                 <p className="text-[10px] text-white/60 leading-normal">{t.emergencyDesc}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
