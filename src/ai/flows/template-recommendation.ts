// use server'

/**
 * @fileOverview Template recommendation AI agent.
 *
 * - templateRecommendation - A function that handles the template recommendation process.
 * - TemplateRecommendationInput - The input type for the templateRecommendation function.
 * - TemplateRecommendationOutput - The return type for the templateRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TemplateRecommendationInputSchema = z.object({
  searchHistory: z.string().describe('The user search history.'),
  viewedTemplates: z.string().describe('The templates previously viewed by the user.'),
});
export type TemplateRecommendationInput = z.infer<typeof TemplateRecommendationInputSchema>;

const TemplateRecommendationOutputSchema = z.object({
  templateRecommendations: z.array(z.string()).describe('The list of recommended templates based on user history.'),
});
export type TemplateRecommendationOutput = z.infer<typeof TemplateRecommendationOutputSchema>;

export async function templateRecommendation(input: TemplateRecommendationInput): Promise<TemplateRecommendationOutput> {
  return templateRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'templateRecommendationPrompt',
  input: {schema: TemplateRecommendationInputSchema},
  output: {schema: TemplateRecommendationOutputSchema},
  prompt: `You are an expert in recommending website templates to users.

  Based on the user's search history and previously viewed templates, recommend the most relevant templates for their needs.

  Search History: {{{searchHistory}}}
  Viewed Templates: {{{viewedTemplates}}}

  Template Recommendations:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const templateRecommendationFlow = ai.defineFlow(
  {
    name: 'templateRecommendationFlow',
    inputSchema: TemplateRecommendationInputSchema,
    outputSchema: TemplateRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
