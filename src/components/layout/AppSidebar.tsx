
"use client"

import * as React from "react"
import { 
  Home, 
  Gavel, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  ShieldAlert,
  Globe,
  User,
  UserCircle,
  Scan,
  Lock,
  Bot,
  Zap,
  Accessibility,
  Library,
  Share2
} from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { ThemeType, UserProgress } from "@/lib/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { QRCodeShare } from "@/components/ui/QRCodeShare"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppLogo } from "@/components/ui/AppLogo"

type AppSidebarProps = {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
};

export function AppSidebar({ 
  lang, 
  setLang, 
  activeTab, 
  setActiveTab, 
  progress,
  updateProgress,
  setTheme
}: AppSidebarProps) {
  const t = translations[lang] || translations.es;
  const { setOpenMobile } = useSidebar();
  const [showQR, setShowQR] = React.useState(false);

  const handleNav = (tab: string) => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setActiveTab(tab);
    setOpenMobile(false);
  };

  const isAccessible = progress.accessibilityMode === 'accessible';

  const categories = [
    { id: 'general', label: 'Principal', items: [
      { id: 'dashboard', icon: Home, label: t.dashboard || 'Inicio' },
      { id: 'profile', icon: UserCircle, label: 'Mis Datos' },
    ]},
    { id: 'tools', label: 'Inteligencia Proactiva', items: [
      { id: 'bot', icon: Bot, label: t.bot?.title || 'Jaén-Bot' },
      { id: 'scanner', icon: Scan, label: t.scanner?.title || 'Escáner' },
      { id: 'vault', icon: Lock, label: t.vault?.title || 'Bóveda' },
    ]},
    { id: 'guides', label: 'Guías y Servicios', items: [
      { id: 'procedures', icon: Gavel, label: t.procedures || 'Trámites' },
      { id: 'employment_portal', icon: Briefcase, label: t.employment?.title || 'Portal Empleo' },
      { id: 'study', icon: GraduationCap, label: t.studyUJA?.title || 'Estudiar UJA' },
      { id: 'directory', icon: MapPin, label: t.directory || 'Ayuda Local' },
    ]},
    { id: 'social', label: 'Vida y Salud', items: [
      { id: 'family', icon: HeartPulse, label: t.familyResources?.title || 'Para Familias' },
      { id: 'andalucia_common', icon: Library, label: 'Ayudas Junta' },
    ]},
    { id: 'emergency', label: 'Atención Inmediata', items: [
      { id: 'emergency', icon: ShieldAlert, label: t.emergency || 'S.O.S', className: 'text-destructive bg-destructive/20 hover:bg-destructive/30 border-destructive/30 shadow-destructive/20' },
    ]},
  ];

  const toggleAccessibility = () => {
    const nextMode = isAccessible ? 'standard' : 'accessible';
    if ('vibrate' in navigator) navigator.vibrate(nextMode === 'accessible' ? 100 : 10);
    updateProgress({ accessibilityMode: nextMode });
  };

  const themes: { id: ThemeType; color: string; label: string }[] = [
    { id: 'purple', color: '#7C3AED', label: t.themes?.purple || 'Morado' },
    { id: 'olive', color: '#3D5229', label: t.themes?.olive || 'Oliva' },
    { id: 'ocean', color: '#3B82F6', label: 'Azul Eléctrico' }, 
    { id: 'red', color: '#EF4444', label: t.themes?.red || 'Rojo' },
    { id: 'night', color: '#1E1B4B', label: t.themes?.night || 'Noche' },
    { id: 'contrast', color: '#000000', label: t.themes?.contrast || 'Contraste' },
  ];

  return (
    <>
      <Sidebar variant="floating" className="border-none shadow-none bg-transparent">
        <SidebarHeader className="p-6 pb-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-2">
              <AppLogo size={48} className="shadow-2xl ring-4 ring-white/10" />
              <div className="flex flex-col">
                <span className="font-headline font-black text-xl tracking-tight text-white uppercase leading-none">
                  Vía Jaén
                </span>
                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] mt-1">
                  Glass Edition 2026
                </span>
              </div>
            </div>

            <div 
              className="group flex items-center gap-4 cursor-pointer bg-white/10 hover:bg-white/20 p-4 rounded-[2rem] transition-all duration-500 border border-white/10 shadow-xl backdrop-blur-3xl"
              onClick={() => handleNav('profile')}
              aria-label="Ir a mi perfil"
            >
              <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
                <AvatarImage src={progress.profile.photo} />
                <AvatarFallback className="bg-primary text-white font-black">
                  {progress.profile.name?.charAt(0) || <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-left">
                <h2 className="font-headline font-black text-sm tracking-tight text-white uppercase truncate">
                  {progress.profile.name || "Invitado"}
                </h2>
                <span className="text-[9px] uppercase font-black text-white/40">Mi Espacio</span>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 scrollbar-hide">
          <div className="px-2 mb-4 space-y-3">
             <Label className="text-[10px] font-black uppercase text-white/40 px-3 tracking-widest">{t.accessibility?.title || 'Accesibilidad'}</Label>
             <Button
                variant={isAccessible ? 'default' : 'outline'}
                onClick={toggleAccessibility}
                className={cn(
                  "w-full h-14 rounded-[1.8rem] gap-3 px-5 transition-all duration-500 border-2",
                  isAccessible 
                    ? "bg-primary text-white shadow-2xl shadow-primary/40 border-primary scale-[1.02]" 
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-md"
                )}
                aria-label={isAccessible ? "Desactivar accesibilidad" : "Activar accesibilidad universal"}
              >
                {isAccessible ? <Zap className="h-5 w-5 fill-current" /> : <Accessibility className="h-5 w-5" />}
                <span className="text-sm font-black tracking-tight uppercase">
                  {isAccessible ? t.accessibility?.standard : t.accessibility?.makeAccessible}
                </span>
              </Button>
          </div>

          <div className="px-2 mb-6 space-y-3">
             <Label className="text-[10px] font-black uppercase text-white/40 px-3 tracking-widest">{t.themes?.title || 'Personalizar'}</Label>
             <div className="flex justify-between px-3 py-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={cn(
                      "w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-125 hover:rotate-12",
                      progress.theme === theme.id ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 border-white scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: theme.color }}
                    title={theme.label}
                  />
                ))}
             </div>
          </div>

          <SidebarSeparator className="mx-2 w-auto bg-white/10 mb-4" />

          {categories.map((cat) => (
            <SidebarGroup key={cat.id} className="py-2">
              <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 px-5 mb-2 h-auto">
                {cat.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {cat.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleNav(item.id)}
                        isActive={activeTab === item.id}
                        className={cn(
                          "h-13 px-5 rounded-[1.5rem] transition-all duration-300 border border-transparent",
                          activeTab === item.id 
                            ? "bg-primary text-white font-black shadow-xl shadow-primary/30 border-white/10 scale-[1.02]" 
                            : "text-white/80 hover:bg-white/10 hover:border-white/10 hover:translate-x-1 hover:text-white",
                          item.className
                        )}
                      >
                        <item.icon className={cn("h-5 w-5 mr-3 transition-transform", activeTab === item.id && "scale-110")} />
                        <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-3xl gap-3">
          <div className="grid grid-cols-2 gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
                  <Globe className="h-4 w-4 text-white" />
                  <span className="text-[10px] font-black uppercase text-white">ES</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="rounded-[2rem] w-56 border-white/10 bg-slate-900/90 backdrop-blur-2xl">
                <DropdownMenuItem onClick={() => setLang('es')} className="text-white">Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="text-white">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('fr')} className="text-white">Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ar')} className="text-white">العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ro')} className="text-white">Română</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowQR(true)} variant="ghost" className="h-12 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
              <Share2 className="h-4 w-4 text-white" />
              <span className="text-[10px] font-black uppercase text-white">App</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </>
  )
}
