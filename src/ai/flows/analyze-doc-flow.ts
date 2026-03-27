'use server';
/**
 * @fileOverview Flow de IA para el análisis detallado de documentos.
 * No solo identifica el documento, sino que proporciona una guía paso a paso.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeDocInputSchema = z.object({
  photoDataUri: z.string().describe("Imagen del documento en base64"),
  language: z.string().optional().default('es'),
});

const AnalyzeDocOutputSchema = z.object({
  docType: z.string().describe("Nombre común del documento (ej: NIE, Tasa 790)"),
  summary: z.string().describe("Resumen general de qué es el documento"),
  explanation: z.string().describe("Explicación de conceptos difíciles (ej: qué es un cánon)"),
  steps: z.array(z.object({
    title: z.string().describe("Título del paso"),
    instruction: z.string().describe("Qué debe hacer el usuario exactamente en esta parte del papel")
  })).describe("Pasos guiados para rellenar o entender el documento"),
  actionLabel: z.string().describe("Texto para el botón de acción principal"),
  actionUrl: z.string().describe("Enlace oficial relacionado"),
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
      Analiza esta imagen de un documento oficial y explica al usuario qué tiene delante de forma muy sencilla.
      
      1. Identifica el tipo de documento.
      2. Si hay palabras difíciles (Cánon, Devengo, Exención, etc), explícalas de forma que un niño las entienda.
      3. Divide la explicación en 3 o 4 pasos claros siguiendo el orden visual del papel (de arriba a abajo).
      
      Importante: El idioma de respuesta debe ser: ${input.language}.
      
      Imagen: {{media url=photoDataUri}}`,
      input: { photoDataUri: input.photoDataUri },
      output: { schema: AnalyzeDocOutputSchema }
    });

    return output!;
  }
);
