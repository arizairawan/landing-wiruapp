
"use client";

import { useEffect, useState } from 'react';
import { type TemplateRecommendationInput, type TemplateRecommendationOutput } from '@/ai/flows/template-recommendation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Template } from '@/data/templates';
import { getTemplates } from '@/services/templateService';
import TemplateCard from '@/components/templates/TemplateCard';

const AiRecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate user history - this would be dynamic in a real app
  const userHistory: TemplateRecommendationInput = {
    searchHistory: "e-commerce, modern design, portfolio, NextJS",
    viewedTemplates: "Modern E-commerce Platform, Creative Portfolio Website",
  };

  useEffect(() => {
    const fetchAndRecommend = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Fetch all templates first
        const templates = await getTemplates();

        // 2. Fetch AI recommendations
        const response = await fetch('/api/run/templateRecommendationFlow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userHistory),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }
        
        const result: TemplateRecommendationOutput = await response.json();

        // 3. Filter the fetched templates based on recommendations
        if (result && result.templateRecommendations) {
          const recommendedTemplates = result.templateRecommendations
            .map(name => templates.find(t => t.name.toLowerCase() === name.toLowerCase() || t.tags.map(tag => tag.toLowerCase()).includes(name.toLowerCase()) ))
            .filter((t): t is Template => Boolean(t)) 
            .reduce((unique, item) => unique.find(t => t.id === item.id) ? unique : [...unique, item], [] as Template[]) // Deduplicate
            .slice(0, 3); 
          setRecommendations(recommendedTemplates);
        } else {
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching recommendations.");
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndRecommend();
  }, []); // Empty dependency array: fetch only once on mount with static userHistory

  return (
    <section id="recommendations" className="py-12 md:py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-8">
          <Lightbulb className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-3xl font-headline font-semibold text-primary">Recommended For You</h2>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center border-t">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <Card className="bg-destructive/10 border-destructive text-destructive-foreground p-6">
            <CardHeader>
              <CardTitle>Oops! Something went wrong.</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We couldn't fetch recommendations for you at this moment.</p>
              <p className="text-sm mt-2">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {recommendations.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
        
        {!isLoading && !error && recommendations.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No specific recommendations for you at this time. Explore all templates below!</p>
        )}
      </div>
    </section>
  );
};

export default AiRecommendationSection;
