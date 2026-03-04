
"use client"

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type QRCodeShareProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Language;
};

export function QRCodeShare({ open, onOpenChange, lang }: QRCodeShareProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Compartir Guía España</DialogTitle>
          <DialogDescription className="text-center">
            Escanea el código para llevar la guía en tu móvil o compártelo con otros.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="bg-white p-4 rounded-3xl shadow-lg border-4 border-primary/10">
            {url && (
              <QRCodeSVG 
                value={url} 
                size={200} 
                level="H"
                fgColor="#4B5320"
              />
            )}
          </div>
          
          <div className="flex w-full items-center space-x-2 bg-muted p-2 rounded-2xl">
            <input
              className="flex-1 bg-transparent border-none text-xs font-mono outline-none px-2 overflow-hidden text-ellipsis"
              value={url}
              readOnly
            />
            <Button size="sm" onClick={handleCopy} className="rounded-xl h-10 px-4">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
