'use server';

import { answerNeighborhoodQuestion } from '@/ai/flows/answer-neighborhood-questions';
import { analyzeReport, AnalyzeReportOutput } from '@/ai/flows/report-analysis-flow';

export async function askQuestion(question: string) {
  if (!question) {
    return { answer: 'Por favor, faça uma pergunta.' };
  }
  try {
    const result = await answerNeighborhoodQuestion({ question });
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { answer: 'Desculpe, não consegui encontrar uma resposta. Tente novamente mais tarde.' };
  }
}

export async function submitReport(data: { category: string; description: string; address: string; }): Promise<AnalyzeReportOutput> {
    try {
        const analysis = await analyzeReport(data);
        // Em um app real, você salvaria os dados e a análise no banco de dados.
        // Por enquanto, vamos retornar a análise para o client-side (ou apenas logar no servidor)
        console.log('Análise da Manifestação:', analysis);
        return analysis;
    } catch (error) {
        console.error('Erro ao analisar a manifestação:', error);
        throw new Error('Falha ao analisar a manifestação.');
    }
}
