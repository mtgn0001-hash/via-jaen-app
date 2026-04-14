'use server';
/**
 * @fileOverview Flujo de IA para analizar documentos de extranjería y notificaciones.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeDocInputSchema = z.object({
  photoDataUri: z.string().describe("Imagen del documento en formato Data URI base64."),
  language: z.string().default('es'),
});

const AnalyzeDocOutputSchema = z.object({
  docType: z.string().describe("Tipo de documento identificado (ej: NIE, Padron, Cita Médica)."),
  summary: z.string().describe("Resumen muy breve y sencillo de lo que dice el papel."),
  explanation: z.string().describe("Explicación de los conceptos difíciles o legales del documento."),
  steps: z.array(z.object({
    title: z.string(),
    instruction: z.string()
  })).describe("Pasos numerados que el usuario debe seguir ahora."),
  actionLabel: z.string().describe("Texto para un botón de acción (ej: 'Pedir Cita')."),
  actionUrl: z.string().describe("URL oficial para realizar el trámite detectado."),
});

export async function analyzeDocument(input: z.infer<typeof AnalyzeDocInputSchema>) {
  return analyzeDocumentFlow(input);
}

const analyzeDocumentPrompt = ai.definePrompt({
  name: 'analyzeDocumentPrompt',
  input: { schema: AnalyzeDocInputSchema },
  output: { schema: AnalyzeDocOutputSchema },
  prompt: `Eres el asistente experto Jaén-Bot. Tu misión es leer el siguiente documento y explicarlo de forma extremadamente sencilla para una persona inmigrante en Jaén.

DOCUMENTO: {{media url=photoDataUri}}
IDIOMA DE RESPUESTA: {{language}}

INSTRUCCIONES:
1. Identifica qué es (una multa, una resolución de NIE, una cita médica, un volante de empadronamiento, etc.).
2. Explica qué significa de forma humana, sin jerga legal pesada.
3. Da una lista de pasos claros sobre qué tiene que hacer el usuario ahora.
4. Proporciona una URL oficial de Jaén o España relevante para el trámite.`,
});

const analyzeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentFlow',
    inputSchema: AnalyzeDocInputSchema,
    outputSchema: AnalyzeDocOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeDocumentPrompt(input);
    if (!output) throw new Error("No se pudo analizar el documento.");
    return output;
  }
);
