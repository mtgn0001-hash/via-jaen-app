
"use client"

import { Language, translations } from "@/lib/translations";
import { useLocalStorage } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ArrowRight } from "lucide-react";

type FirstStepsProgressProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function FirstStepsProgress({ lang, setActiveTab }: FirstStepsProgressProps) {
  const t = translations[lang].firstSteps;
  const { progress, toggleFirstStep } = useLocalStorage();

  const steps = [
    { id: 'empadronamiento', label: t.empadronamiento, tab: 'procedures' },
    { id: 'health', label: t.health, tab: 'family' },
    { id: 'transport', label: t.transport, tab: 'directory' },
  ];

  const completedCount = Object.values(progress.firstSteps).filter(Boolean).length;
  const percentage = (completedCount / steps.length) * 100;

  return (
    <Card className="border-none bg-card shadow-sm mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.title}</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t.subtitle}</p>
          </div>
          
          {/* Circular Progress Bar */}
          <div className="relative h-16 w-16 flex items-center justify-center">
            <svg className="h-full w-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-primary/10"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={175.9}
                strokeDashoffset={175.9 - (175.9 * percentage) / 100}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xs font-black text-primary">{Math.round(percentage)}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${progress.firstSteps[step.id] ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-transparent'}`}
            >
              <div className="flex items-center gap-3">
                <Checkbox 
                  id={`step-${step.id}`}
                  checked={progress.firstSteps[step.id]}
                  onCheckedChange={() => toggleFirstStep(step.id)}
                  className="h-5 w-5 rounded-lg"
                />
                <label 
                  htmlFor={`step-${step.id}`}
                  className={`text-sm font-bold ${progress.firstSteps[step.id] ? 'text-primary' : 'text-slate-700'}`}
                >
                  {step.label}
                </label>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-[10px] font-black uppercase tracking-widest gap-1 hover:bg-primary/10 hover:text-primary"
                onClick={() => setActiveTab(step.tab)}
              >
                {t.howTo} <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
