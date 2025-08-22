
'use server';

/**
 * @fileOverview Um agente de IA para analisar e triar manifestações da ouvidoria, individualmente ou em lote.
 *
 * - analyzeReport - Analisa uma nova manifestação para categorizar, definir urgência e encaminhar.
 * - analyzeAllReports - Analisa um conjunto de manifestações para gerar insights e resumos.
 * - AnalyzeReportInput - O tipo de entrada para a função analyzeReport.
 * - AnalyzeReportOutput - O tipo de retorno para a função analyzeReport.
 * - AllReportsAnalysisInput - O tipo de entrada para a função analyzeAllReports.
 * - AllReportsAnalysisOutput - O tipo de retorno para a função analyzeAllReports.
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


// Schema and flow for analyzing all reports
const AllReportsAnalysisInputSchema = z.object({
  reports: z.string().describe('Um array de objetos de manifestação em formato JSON string.'),
});
export type AllReportsAnalysisInput = z.infer<typeof AllReportsAnalysisInputSchema>;

const AllReportsAnalysisOutputSchema = z.object({
  overallSummary: z.string().describe('Um resumo executivo sobre o estado geral das manifestações.'),
  keyInsights: z.array(z.string()).describe('Uma lista de 3 a 5 insights chave ou tendências observadas.'),
  urgentActionItems: z.array(z.string()).describe('Uma lista de itens que requerem ação imediata.'),
});
export type AllReportsAnalysisOutput = z.infer<typeof AllReportsAnalysisOutputSchema>;

export async function analyzeAllReports(input: AllReportsAnalysisInput): Promise<AllReportsAnalysisOutput> {
    return allReportsAnalysisFlow(input);
}

const allReportsPrompt = ai.definePrompt({
    name: 'allReportsAnalysisPrompt',
    input: { schema: AllReportsAnalysisInputSchema },
    output: { schema: AllReportsAnalysisOutputSchema },
    prompt: `Você é um analista de dados sênior da prefeitura. Sua tarefa é analisar o conjunto completo de manifestações da ouvidoria e gerar um relatório estratégico para o prefeito.

Dados das manifestações:
{{{reports}}}

Com base nestes dados, gere o seguinte:
1.  **Resumo Executivo:** Um parágrafo conciso sobre a situação geral. Quais são as áreas mais problemáticas? Qual a percepção geral da população?
2.  **Insights Chave:** Uma lista de 3 a 5 pontos de destaque. Existem tendências emergentes? Alguma categoria de problema se destaca? Há alguma correlação entre bairros e tipos de problema?
3.  **Itens de Ação Urgente:** Uma lista de manifestações específicas (cite o ID e um resumo) que são críticas e precisam de atenção imediata.

Seja objetivo e foque em fornecer informações que ajudem na tomada de decisão estratégica.`
});

const allReportsAnalysisFlow = ai.defineFlow(
    {
        name: 'allReportsAnalysisFlow',
        inputSchema: AllReportsAnalysisInputSchema,
        outputSchema: AllReportsAnalysisOutputSchema,
    },
    async (input) => {
        // Placeholder implementation for demonstration
        if (!input.reports || JSON.parse(input.reports).length === 0) {
            return {
                overallSummary: "Nenhuma manifestação registrada para análise. O sistema está operacional, mas sem dados para processar.",
                keyInsights: ["Nenhum insight disponível devido à ausência de dados."],
                urgentActionItems: ["Nenhuma ação urgente necessária."],
            };
        }
        
        try {
            const { output } = await allReportsPrompt(input);
            return output!;
        } catch (error) {
            console.error("Error in allReportsAnalysisFlow:", error);
            // Return a structured error message in the expected format
            return {
                overallSummary: "Ocorreu um erro ao processar a análise das manifestações. A IA pode estar temporariamente indisponível.",
                keyInsights: ["Erro na geração de insights."],
                urgentActionItems: ["Verificar o log de erros para mais detalhes."],
            };
        }
    }
);
