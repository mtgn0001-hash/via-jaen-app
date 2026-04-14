import "./globals.css";
import { FirebaseClientProvider } from "@/firebase";
import { Toaster } from "@/components/ui/toaster";
import { GlobalLinkHandler } from "@/components/layout/GlobalLinkHandler";

export const metadata = {
  title: "Vía Jaén - Guía Comunitaria",
  description: "Ayuda para trámites de extranjería, salud y estudios en Jaén.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-body selection:bg-primary selection:text-white">
        <FirebaseClientProvider>
          <GlobalLinkHandler />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
