
"use client"

import { Language, translations } from "@/lib/translations";
import { useLocalStorage } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, CreditCard, FileText, Globe, GraduationCap } from "lucide-react";

type DocumentChecklistProps = {
  lang: Language;
};

export function DocumentChecklist({ lang }: DocumentChecklistProps) {
  const t = translations[lang];
  const { progress, toggleChecklist } = useLocalStorage();

  const documents = [
    { id: 'pass', label: 'Pasaporte', icon: Globe },
    { id: 'padron', label: 'Empadronamiento', icon: FileText },
    { id: 'work', label: 'Contrato Trabajo', icon: Briefcase },
    { id: 'studies', label: 'Títulos / Estudios', icon: GraduationCap },
    { id: 'tax', label: 'Tasa 790-012 Pagada', icon: CreditCard },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="space-y-1">
        <h3 className="font-bold text-xl text-primary">{t.backpack}</h3>
        <p className="text-xs text-muted-foreground font-medium">{t.backpackDesc}</p>
      </div>

      <div className="grid gap-3">
        {documents.map((doc) => {
          const Icon = doc.icon;
          const isChecked = progress.checklist[doc.id] || false;
          return (
            <Card 
              key={doc.id} 
              className={`border-none shadow-sm transition-all ${isChecked ? 'bg-primary/5 border-primary/20' : 'bg-white'}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`${isChecked ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} p-2 rounded-xl transition-colors`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <label 
                    htmlFor={doc.id} 
                    className={`text-sm font-bold cursor-pointer select-none transition-colors ${isChecked ? 'text-primary' : 'text-foreground'}`}
                  >
                    {doc.label}
                  </label>
                </div>
                <Checkbox 
                  id={doc.id} 
                  checked={isChecked} 
                  onCheckedChange={() => toggleChecklist(doc.id)}
                  className="h-6 w-6 rounded-lg border-2"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
