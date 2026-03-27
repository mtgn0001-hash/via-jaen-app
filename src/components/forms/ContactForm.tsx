
"use client"

import { useState } from "react";
import { useAuth, useFirestore, useUser, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ContactFormProps = {
  onSuccessRedirect?: string;
};

export function ContactForm({ onSuccessRedirect = "/procedures" }: ContactFormProps) {
  const { auth, firestore } = { auth: useAuth(), firestore: useFirestore() };
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    requestType: "NIE"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);

    try {
      // 1. Asegurar autenticación (Anónima por defecto para fluidez)
      let currentUserId = user?.uid;
      if (!currentUserId) {
        // En un entorno real, initiateAnonymousSignIn es no-bloqueante, 
        // pero aquí usamos la promesa directa para el flujo de redirección
        const { signInAnonymously } = await import("firebase/auth");
        const userCredential = await signInAnonymously(auth);
        currentUserId = userCredential.user.uid;
      }

      // 2. Guardar en Firestore
      const docRef = await addDoc(collection(firestore, "formSubmissions"), {
        userId: currentUserId,
        name: formData.name,
        requestType: formData.requestType,
        createdAt: serverTimestamp(),
      });

      if (docRef.id) {
        toast({
          title: "Solicitud enviada",
          description: "Redirigiendo al documento oficial...",
        });

        // 3. Redirección Absoluta tras éxito
        // Usamos una pequeña demora para que el usuario vea el feedback
        setTimeout(() => {
          window.location.href = onSuccessRedirect;
        }, 1000);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "Asegúrate de tener conexión a internet e inténtalo de nuevo.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none bg-white/40 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/20">
      <CardHeader className="bg-primary/5 p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-3 rounded-2xl">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-primary tracking-tighter uppercase">Solicitar Trámite</CardTitle>
        </div>
        <CardDescription className="text-sm font-medium">
          Completa tus datos para acceder a la descarga oficial y registrar tu solicitud.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-black uppercase text-muted-foreground ml-1">Nombre Completo</Label>
            <Input 
              id="name"
              placeholder="Ej: Juan García"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="h-14 rounded-2xl bg-white/50 border-none shadow-inner font-bold text-lg focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Tipo de Documento</Label>
            <Select 
              value={formData.requestType} 
              onValueChange={(val) => setFormData({...formData, requestType: val})}
            >
              <SelectTrigger className="h-14 rounded-2xl bg-white/50 border-none shadow-inner font-bold">
                <SelectValue placeholder="Selecciona el trámite" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl bg-white/90 backdrop-blur-xl border-none shadow-2xl">
                <SelectItem value="NIE" className="font-bold">Modelo EX-15 (NIE)</SelectItem>
                <SelectItem value="Padron" className="font-bold">Alta en el Padrón</SelectItem>
                <SelectItem value="Salud" className="font-bold">Tarjeta Sanitaria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl flex gap-3 border border-amber-100">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-[10px] text-amber-800 font-bold leading-tight">
              Al hacer clic, tus datos se guardarán de forma segura en la nube para procesar la descarga.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || isUserLoading}
            className="w-full h-16 rounded-2xl font-black text-xl gap-3 shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" /> Procesando...
              </>
            ) : (
              <>
                <Send className="h-6 w-6" /> Enviar y Descargar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
