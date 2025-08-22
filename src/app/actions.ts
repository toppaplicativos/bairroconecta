
'use server';

import { answerNeighborhoodQuestion } from '@/ai/flows/answer-neighborhood-questions';
import { analyzeReport, AnalyzeReportOutput } from '@/ai/flows/report-analysis-flow';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

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

export async function submitReport(
    data: { category: string; description: string; address: string; },
    userId: string
): Promise<AnalyzeReportOutput & { id: string }> {
    try {
        const analysis = await analyzeReport(data);
        
        const reportData = {
            ...data,
            analysis,
            userId,
            status: "Aberta",
            createdAt: serverTimestamp(),
            updates: [
                { status: "Aberta", date: new Date().toISOString(), comment: "Manifestação recebida e aguardando triagem para encaminhamento." }
            ]
        };
        
        const docRef = await addDoc(collection(db, "reports"), reportData);

        console.log('Manifestação registrada com o ID:', docRef.id);
        return { ...analysis, id: docRef.id };
    } catch (error) {
        console.error('Erro ao analisar e salvar a manifestação:', error);
        throw new Error('Falha ao processar a manifestação.');
    }
}
