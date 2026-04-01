'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * GlobalLinkHandler - Un "policía" de navegación que intercepta todos los clics 
 * en la aplicación para asegurar que los enlaces externos funcionen correctamente.
 */
export function GlobalLinkHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // 1. Buscamos si el clic fue en un enlace o dentro de uno
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href) {
        // Ignoramos enlaces internos (anclas # o rutas locales)
        const isExternal = 
          link.hostname !== window.location.hostname && 
          link.href.startsWith('http');

        if (isExternal) {
          e.preventDefault(); // Detenemos el comportamiento por defecto

          try {
            // 2. Normalización de URL: Aseguramos HTTPS
            let cleanUrl = link.href.replace(/^http:\/\//i, 'https://');
            
            // 3. Apertura segura en ventana externa
            const newWindow = window.open(cleanUrl, '_blank', 'noopener,noreferrer');

            // 4. Manejo de bloqueos del navegador
            if (!newWindow) {
              toast({
                variant: "destructive",
                title: "Enlace Bloqueado",
                description: "Por favor, permite las ventanas emergentes para acceder al sitio oficial.",
              });
            }
          } catch (error) {
            console.error("Link Navigation Error:", error);
            toast({
              variant: "destructive",
              title: "Error de Enlace",
              description: "El formato del enlace no es válido o el sitio no está disponible.",
            });
          }
        }
      }
    };

    // Añadimos el listener en la fase de captura para máxima prioridad
    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [toast]);

  return null; // Componente invisible
}
