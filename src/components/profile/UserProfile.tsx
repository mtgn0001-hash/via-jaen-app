"use client"

import { useState, useRef } from "react";
import { Language, translations } from "@/lib/translations";
import { useLocalStorage } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, CreditCard, Phone, Save, ShieldCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserProfileProps = {
  lang: Language;
};

export function UserProfile({ lang }: UserProfileProps) {
  const t = translations[lang];
  const { progress, updateProfile } = useLocalStorage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState(progress.profile);
  const isEasy = progress.easyReading;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for localStorage
        toast({
          variant: "destructive",
          title: "Imagen demasiado grande",
          description: "Por favor, elige una foto de menos de 1MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfile({ photo: base64String });
        toast({
          title: "Foto actualizada",
          description: "Tu foto se ha guardado localmente.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    toast({
      title: "Perfil guardado",
      description: "Tus datos están seguros en tu móvil.",
    });
  };

  const clearPhoto = () => {
    updateProfile({ photo: undefined });
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-1">
        <h2 className={isEasy ? "text-4xl font-black uppercase tracking-tight text-primary" : "text-2xl font-black uppercase text-primary tracking-tight"}>
          Mis Datos
        </h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
          Información privada guardada en <span className="text-primary">Tu Dispositivo</span>
        </p>
      </div>

      <Card className="border-none shadow-lg bg-white rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-xl">
              <AvatarImage src={progress.profile.photo} className="object-cover" />
              <AvatarFallback className="bg-primary/5 text-primary text-4xl font-black">
                {progress.profile.name?.charAt(0) || <User className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg border-2 border-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-5 w-5" />
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          {progress.profile.photo && (
            <Button variant="ghost" size="sm" onClick={clearPhoto} className="text-destructive font-bold text-[10px] mb-4 uppercase tracking-widest gap-2">
              <Trash2 className="h-3 w-3" /> Eliminar Foto
            </Button>
          )}

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Juan Pérez"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">NIE / Pasaporte</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <Input 
                  value={formData.nie}
                  onChange={(e) => setFormData({...formData, nie: e.target.value})}
                  placeholder="Ej: Y1234567X"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold text-lg uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Ej: 600 000 000"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold text-lg"
                />
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full h-16 rounded-2xl font-black text-xl gap-3 shadow-xl shadow-primary/20 active:scale-95 transition-transform mt-4"
            >
              <Save className="h-6 w-6" /> Guardar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem] flex gap-4 items-center">
        <ShieldCheck className="h-10 w-10 text-emerald-600 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-black text-sm text-emerald-900 uppercase">Privacidad Total</h4>
          <p className="text-xs text-emerald-800 leading-relaxed font-medium">
            Tus datos y foto se almacenan solo en este teléfono. Esta información no se envía a ningún servidor y se usa solo para que tengas tus datos a mano.
          </p>
        </div>
      </div>
    </div>
  );
}
