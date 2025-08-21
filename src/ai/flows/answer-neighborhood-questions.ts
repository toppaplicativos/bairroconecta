'use server';

/**
 * @fileOverview AI assistant to answer user questions about the neighborhood; uses a tool that decides whether and how to incorporate structured information.
 *
 * - answerNeighborhoodQuestion - A function that handles answering questions about the neighborhood.
 * - AnswerNeighborhoodQuestionInput - The input type for the answerNeighborhoodQuestion function.
 * - AnswerNeighborhoodQuestionOutput - The return type for the answerNeighborhoodQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerNeighborhoodQuestionInputSchema = z.object({
  question: z.string().describe('The question about the neighborhood.'),
});
export type AnswerNeighborhoodQuestionInput = z.infer<typeof AnswerNeighborhoodQuestionInputSchema>;

const AnswerNeighborhoodQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerNeighborhoodQuestionOutput = z.infer<typeof AnswerNeighborhoodQuestionOutputSchema>;

async function answerNeighborhoodQuestion(input: AnswerNeighborhoodQuestionInput): Promise<AnswerNeighborhoodQuestionOutput> {
  return answerNeighborhoodQuestionFlow(input);
}

const getLocalBusinessInfo = ai.defineTool({
  name: 'getLocalBusinessInfo',
  description: 'Returns information about local businesses in the neighborhood.',
  inputSchema: z.object({
    businessName: z.string().describe('The name of the business.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // Placeholder implementation for getting local business info.
  // In a real application, this would call an external API or database.
  return `Information about ${input.businessName} is not available at this time.`;
});

const getLocalEventInfo = ai.defineTool({
  name: 'getLocalEventInfo',
  description: 'Returns information about local events in the neighborhood.',
  inputSchema: z.object({
    eventName: z.string().describe('The name of the event.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // Placeholder implementation for getting local event info.
  // In a real application, this would call an external API or database.
  return `Information about ${input.eventName} is not available at this time.`;
});

const answerNeighborhoodQuestionPrompt = ai.definePrompt({
  name: 'answerNeighborhoodQuestionPrompt',
  tools: [getLocalBusinessInfo, getLocalEventInfo],
  input: {schema: AnswerNeighborhoodQuestionInputSchema},
  output: {schema: AnswerNeighborhoodQuestionOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about the neighborhood.

  {{{question}}}
  `,
});

const answerNeighborhoodQuestionFlow = ai.defineFlow({
  name: 'answerNeighborhoodQuestionFlow',
  inputSchema: AnswerNeighborhoodQuestionInputSchema,
  outputSchema: AnswerNeighborhoodQuestionOutputSchema,
}, async (input) => {
  const {output} = await answerNeighborhoodQuestionPrompt(input);
  return output!;
});

export {
  answerNeighborhoodQuestion as answerNeighborhoodQuestion,
  AnswerNeighborhoodQuestionInput as AnswerNeighborhoodQuestionInput,
  AnswerNeighborhoodQuestionOutput as AnswerNeighborhoodQuestionOutput,
};
