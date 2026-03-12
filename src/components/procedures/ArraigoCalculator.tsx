
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Gavel, CheckCircle2, RotateCcw } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";

type ArraigoCalculatorProps = {
  lang: Language;
};

export function ArraigoCalculator({ lang }: ArraigoCalculatorProps) {
  const langPack = translations[lang] || translations.es;
  const t = (langPack as any).arraigo || (translations.es as any).arraigo;
  
  const [time, setTime] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  if (!t) return null;

  const calculate = () => {
    if (family === "yes") {
      setResult(t.familiar);
    } else if (time === "moreThree" && work === "yes") {
      setResult(t.social);
    } else if (time === "twoToThree" && work === "yes") {
      setResult(t.laboral);
    } else if (time === "less2") {
      setResult(t.waiting);
    } else {
      setResult(t.waiting);
    }
  };

  const reset = () => {
    setTime("");
    setWork("");
    setFamily("");
    setResult(null);
  };

  return (
    <Card className="border-none bg-primary/5 rounded-3xl overflow-hidden shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <Gavel className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none">{t.title}</h3>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">{t.subtitle}</p>
            </div>
          </div>
          <SpeechButton text={`${t.title}. ${t.subtitle}`} language={lang} />
        </div>

        {!result ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-bold text-primary">{t.q1}</Label>
              <RadioGroup value={time} onValueChange={setTime} className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border">
                  <RadioGroupItem value="less2" id="t1" />
                  <Label htmlFor="t1" className="flex-1 cursor-pointer">{t.less2}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border">
                  <RadioGroupItem value="twoToThree" id="t2" />
                  <Label htmlFor="t2" className="flex-1 cursor-pointer">{t.twoToThree}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border">
                  <RadioGroupItem value="moreThree" id="t3" />
                  <Label htmlFor="t3" className="flex-1 cursor-pointer">{t.moreThree}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-primary">{t.q2}</Label>
              <RadioGroup value={work} onValueChange={setWork} className="flex gap-4">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border flex-1">
                  <RadioGroupItem value="yes" id="w1" />
                  <Label htmlFor="w1" className="cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border flex-1">
                  <RadioGroupItem value="no" id="w2" />
                  <Label htmlFor="w2" className="cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-primary">{t.q3}</Label>
              <RadioGroup value={family} onValueChange={setFamily} className="flex gap-4">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border flex-1">
                  <RadioGroupItem value="yes" id="f1" />
                  <Label htmlFor="f1" className="cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border flex-1">
                  <RadioGroupItem value="no" id="f2" />
                  <Label htmlFor="f2" className="cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={calculate} 
              disabled={!time || !work || !family}
              className="w-full h-12 rounded-xl text-md font-bold"
            >
              Calcular
            </Button>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/20 space-y-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs uppercase font-black text-muted-foreground tracking-widest">{t.result}</p>
                <h4 className="text-xl font-black text-primary leading-tight">{result}</h4>
              </div>
              <Button variant="outline" onClick={reset} className="mt-4 gap-2 rounded-xl">
                <RotateCcw className="h-4 w-4" /> {t.reset}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
