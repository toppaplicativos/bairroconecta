'use server';

import { answerNeighborhoodQuestion } from '@/ai/flows/answer-neighborhood-questions';

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
