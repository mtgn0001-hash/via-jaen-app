
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, ArrowRightLeft } from "lucide-react";

type CurrencyConverterProps = {
  lang: Language;
};

const rates: Record<string, number> = {
  "MAD": 10.85,
  "USD": 1.08,
  "XOF": 655.96,
  "RON": 4.97,
  "GBP": 0.84
};

export function CurrencyConverter({ lang }: CurrencyConverterProps) {
  const t = translations[lang].currency;
  const [amount, setAmount] = useState<string>("1");
  const [currency, setCurrency] = useState<string>("MAD");

  const convertedValue = (parseFloat(amount || "0") * (rates[currency] || 1)).toFixed(2);

  return (
    <Card className="border-none bg-slate-50 rounded-3xl overflow-hidden shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-slate-200 p-2 rounded-xl">
            <Coins className="h-5 w-5 text-slate-700" />
          </div>
          <h3 className="font-bold text-lg leading-none">{t.title}</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t.from} EUR</label>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-2xl border-none shadow-sm text-lg font-bold bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{t.to}</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-12 rounded-2xl border-none shadow-sm font-bold bg-white">
                  <SelectValue placeholder="Divisa" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {Object.keys(rates).map(r => (
                    <SelectItem key={r} value={r} className="font-bold">{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl flex items-center justify-between border-2 border-dashed border-slate-200">
            <span className="text-xs font-bold text-muted-foreground">{t.result}:</span>
            <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {convertedValue} <span className="text-sm opacity-50">{currency}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
