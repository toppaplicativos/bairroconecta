
'use server';

/**
 * @fileOverview Um agente de IA para analisar e triar manifestações da ouvidoria.
 *
 * - analyzeReport - Analisa uma nova manifestação para categorizar, definir urgência e encaminhar.
 * - AnalyzeReportInput - O tipo de entrada para a função analyzeReport.
 * - AnalyzeReportOutput - O tipo de retorno para a função analyzeReport.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReportInputSchema = z.object({
  category: z.string().describe('A categoria inicial selecionada pelo usuário.'),
  description: z.string().describe('A descrição detalhada do problema fornecida pelo usuário.'),
  address: z.string().describe('O endereço da ocorrência.'),
});
export type AnalyzeReportInput = z.infer<typeof AnalyzeReportInputSchema>;

const AnalyzeReportOutputSchema = z.object({
  suggestedCategory: z.enum(["Buraco na rua", "Iluminação pública", "Lixo acumulado", "Sinalização de trânsito", "Segurança", "Outros"])
    .describe('A categoria mais apropriada para a manifestação, com base na análise da descrição.'),
  urgency: z.enum(["Baixa", "Média", "Alta", "Crítica"])
    .describe('O nível de urgência da manifestação, com base na análise do texto. Considere o potencial de risco a pessoas ou ao patrimônio.'),
  responsibleDept: z.string().describe('O nome da secretaria municipal ou departamento que deve ser acionado para resolver esta demanda.'),
  summary: z.string().describe('Um resumo de uma linha da manifestação para ser usado em notificações e listas.'),
});
export type AnalyzeReportOutput = z.infer<typeof AnalyzeReportOutputSchema>;


export async function analyzeReport(input: AnalyzeReportInput): Promise<AnalyzeReportOutput> {
  return reportAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportAnalysisPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  prompt: `Você é um especialista em gestão pública e trabalha na ouvidoria de uma cidade. Sua função é analisar as manifestações dos cidadãos e fazer a triagem inicial de forma inteligente.

Analise a manifestação a seguir:

- Categoria informada pelo cidadão: {{{category}}}
- Endereço da ocorrência: {{{address}}}
- Descrição do problema: {{{description}}}

Com base na descrição, sua tarefa é:
1. Confirmar ou corrigir a categoria da manifestação. O valor deve ser um dos seguintes: "Buraco na rua", "Iluminação pública", "Lixo acumulado", "Sinalização de trânsito", "Segurança", "Outros".
2. Avaliar o nível de urgência em "Baixa", "Média", "Alta" ou "Crítica". Leve em conta riscos à segurança, saúde pública e impacto na comunidade. Por exemplo, um fio elétrico solto é mais urgente que um banco de praça quebrado. Um buraco em uma avenida movimentada é mais urgente que um em uma rua sem saída.
3. Identificar qual departamento ou secretaria da prefeitura é o principal responsável por resolver o problema (ex: "Secretaria de Obras", "Secretaria de Segurança Pública", "Companhia de Engenharia de Tráfego", "Subprefeitura Local", "Ilume").
4. Criar um resumo curto e objetivo (máximo de 10 palavras) da solicitação.

Retorne sua análise no formato JSON especificado.
`,
});

const reportAnalysisFlow = ai.defineFlow(
  {
    name: 'reportAnalysisFlow',
    inputSchema: AnalyzeReportInputSchema,
    outputSchema: AnalyzeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
