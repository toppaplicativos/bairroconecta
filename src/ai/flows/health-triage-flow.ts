'use server';

/**
 * @fileOverview Um agente de IA para fazer uma triagem inicial de saúde e direcionar o paciente.
 *
 * - triageHealthIssue - Analisa os sintomas do usuário para sugerir uma especialidade médica.
 * - HealthTriageInput - O tipo de entrada para a função triageHealthIssue.
 * - HealthTriageOutput - O tipo de retorno para a função triageHealthIssue.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthTriageInputSchema = z.object({
  symptoms: z.string().describe('A descrição dos sintomas informada pelo usuário.'),
});
export type HealthTriageInput = z.infer<typeof HealthTriageInputSchema>;

const HealthTriageOutputSchema = z.object({
  analysis: z.string().describe('Uma breve análise não-diagnóstica dos sintomas para guiar o usuário.'),
  suggestedSpecialty: z.enum(["Clínica Geral", "Odontologia", "Pediatria", "Psicologia", "Ortopedia", "Outro"])
    .describe('A especialidade médica mais indicada para os sintomas descritos.'),
});
export type HealthTriageOutput = z.infer<typeof HealthTriageOutputSchema>;


export async function triageHealthIssue(input: HealthTriageInput): Promise<HealthTriageOutput> {
  return healthTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthTriagePrompt',
  input: {schema: HealthTriageInputSchema},
  output: {schema: HealthTriageOutputSchema},
  prompt: `Você é um assistente de triagem de saúde virtual. Sua função é analisar os sintomas descritos por um usuário e sugerir a especialidade médica mais apropriada para uma consulta.

**IMPORTANTÍSSIMO: Você NUNCA deve fornecer um diagnóstico.** Sua resposta deve ser sempre uma recomendação de qual especialista procurar. Deixe claro que sua análise é uma sugestão e não substitui uma consulta médica.

Analise os sintomas a seguir:
"{{{symptoms}}}"

Com base nos sintomas, sua tarefa é:
1.  Gerar uma breve análise que demonstre que você entendeu o problema, mas sem fazer um diagnóstico. Por exemplo: "Entendi, você está com dor de cabeça e febre...".
2.  Sugerir a especialidade mais adequada entre as seguintes opções: "Clínica Geral", "Odontologia", "Pediatria", "Psicologia", "Ortopedia", "Outro".

Exemplo de resposta para "Estou com dor de dente forte":
{
  "analysis": "Compreendi, uma dor de dente forte pode ser bastante incômoda e precisa de atenção.",
  "suggestedSpecialty": "Odontologia"
}

Exemplo de resposta para "Meu filho pequeno está com tosse e febre":
{
    "analysis": "Entendido. Tosse e febre em crianças são sintomas comuns que devem ser avaliados por um profissional.",
    "suggestedSpecialty": "Pediatria"
}

Retorne sua análise no formato JSON especificado.
`,
});

const healthTriageFlow = ai.defineFlow(
  {
    name: 'healthTriageFlow',
    inputSchema: HealthTriageInputSchema,
    outputSchema: HealthTriageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
