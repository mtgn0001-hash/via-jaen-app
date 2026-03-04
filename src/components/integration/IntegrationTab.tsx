"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, MessageCircle, Heart, Star, Soup, Languages, Mic2 } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";

type IntegrationTabProps = {
  lang: Language;
};

export function IntegrationTab({ lang }: IntegrationTabProps) {
  const t = translations[lang];
  const i = t.integration;

  const glossary = [
    { word: "Ea", meaning: "Expresión multiusos. Puede ser 'sí', 'ya está' o una forma de terminar una conversación." },
    { word: "Bonico/a", meaning: "Algo o alguien que es lindo, amable o está bien hecho." },
    { word: "Miarma", meaning: "Viene de 'mi alma'. Muy común en Sevilla pero entendida en toda Andalucía." },
    { word: "Ochío", meaning: "Pan típico de Jaén con pimentón y sal. ¡Tienes que probarlo!" },
  ];

  const dialect = [
    { phrase: "Estar baldado", meaning: "Estar muy cansado o dolorido físicamente." },
    { phrase: "Ni pollas", meaning: "Expresión de énfasis negativa o para cerrar un tema (¡Cuidado, es informal!)." },
    { phrase: "Irse de tascas", meaning: "Ir de bares a tomar algo y socializar." },
    { phrase: "Bonico del tó", meaning: "Algo extremadamente agradable o bonito." },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{i.title}</h2>
          <p className="text-sm text-muted-foreground">{i.subtitle}</p>
        </div>
        <SpeechButton text={`${i.title}. ${i.subtitle}`} language={lang} />
      </div>

      <Tabs defaultValue="gastronomy" className="w-full">
        <TabsList className="grid grid-cols-3 w-full h-12 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="gastronomy" className="rounded-xl flex gap-1 text-[10px] sm:text-xs">
            <Soup className="h-4 w-4" /> Comida
          </TabsTrigger>
          <TabsTrigger value="glossary" className="rounded-xl flex gap-1 text-[10px] sm:text-xs">
            <MessageCircle className="h-4 w-4" /> Glosario
          </TabsTrigger>
          <TabsTrigger value="accent" className="rounded-xl flex gap-1 text-[10px] sm:text-xs">
            <Mic2 className="h-4 w-4" /> Acento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gastronomy" className="space-y-4 pt-4">
          <Card className="border-none bg-orange-50 border-orange-100">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="bg-orange-500 p-3 rounded-2xl shadow-lg">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <SpeechButton text={i.tapasDesc} language={lang} />
              </div>
              <h3 className="text-xl font-bold text-orange-900">{i.tapasSubtitle}</h3>
              <p className="text-sm text-orange-800/80 leading-relaxed">
                {i.tapasDesc}
              </p>
              <div className="bg-white/50 p-3 rounded-xl border border-orange-200 flex gap-3 items-center">
                <Star className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-xs font-bold text-orange-900">
                  {i.tapasTip}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glossary" className="space-y-4 pt-4">
          <div className="grid gap-3">
            {glossary.map((item) => (
              <Card key={item.word} className="border-none shadow-sm bg-white">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-primary">"{item.word}"</span>
                    <span className="flex items-center gap-2">
                       <SpeechButton text={`${item.word}. ${item.meaning}`} language={lang} />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    {item.meaning}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accent" className="space-y-4 pt-4">
          <div className="space-y-1 mb-4">
             <h3 className="font-bold text-lg">{i.glossaryTitle}</h3>
             <p className="text-xs text-muted-foreground">{i.accentDesc}</p>
          </div>
          <div className="grid gap-3">
            {dialect.map((item) => (
              <Card key={item.phrase} className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-4 flex gap-4">
                   <div className="bg-primary/5 p-3 rounded-xl h-fit">
                      <Languages className="h-5 w-5 text-primary" />
                   </div>
                   <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-md font-black text-slate-800">{item.phrase}</span>
                        <SpeechButton text={`${item.phrase}. ${item.meaning}`} language={lang} />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.meaning}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="bg-primary/5 p-6 rounded-3xl border border-primary/20 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-primary">
          <Heart className="h-5 w-5" /> {i.integrationTitle}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed italic">
          "Jaén es una tierra acogedora. No tengas miedo de hablar con la gente, preguntar por una dirección o compartir un café. Aquí, nadie es extraño por mucho tiempo."
        </p>
      </section>
    </div>
  );
}
