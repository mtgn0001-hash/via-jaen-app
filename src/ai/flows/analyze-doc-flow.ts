'use server';
/**
 * @fileOverview Flow de IA para el análisis de documentos de extranjería y salud.
 * Extrae texto mediante OCR y genera un resumen de lectura fácil.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeDocInputSchema = z.object({
  photoDataUri: z.string().describe("Imagen del documento en base64"),
  language: z.string().optional().default('es'),
});

const AnalyzeDocOutputSchema = z.object({
  docType: z.enum(['NIE', 'CITA_MEDICA', 'TASA', 'PADRON', 'AYUDA_SOCIAL', 'OTRO']),
  summary: z.string().describe("Resumen en lenguaje sencillo y directo"),
  actionLabel: z.string().describe("Texto para el botón de acción principal"),
  actionUrl: z.string().describe("Enlace oficial relacionado con el documento"),
});

export async function analyzeDocument(input: z.infer<typeof AnalyzeDocInputSchema>) {
  return analyzeDocFlow(input);
}

const analyzeDocFlow = ai.defineFlow(
  {
    name: 'analyzeDocFlow',
    inputSchema: AnalyzeDocInputSchema,
    outputSchema: AnalyzeDocOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `Actúa como un asistente experto en trámites para inmigrantes en Jaén, España.
      Analiza esta imagen de un documento oficial.
      
      1. Identifica qué es (NIE, Cita Médica SAS, Tasa 790, Padrón, etc).
      2. Genera un "Resumen de Lectura Fácil" en el idioma: ${input.language}.
      3. El resumen debe ser muy corto y decir exactamente qué tiene que hacer el usuario. 
         - Ejemplo: "Esta es tu cita para el médico. Tienes que ir al Hospital General el lunes a las 9."
         - Ejemplo: "Es una tasa de extranjería. Tienes que ir al banco a pagar 12 euros."
      
      Imagen: {{media url=photoDataUri}}`,
      input: { photoDataUri: input.photoDataUri },
      output: { schema: AnalyzeDocOutputSchema }
    });

    return output!;
  }
);
