
"use client";

import { useState, useEffect } from 'react';
import type { Template, Technology } from '@/data/templates';
import { getTemplates } from '@/services/templateService';
import TemplateGrid from '@/components/templates/TemplateGrid';
import TemplateFilter from '@/components/templates/TemplateFilter';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllTemplatesPage() {
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{ searchTerm: string; technology: Technology }>({
    searchTerm: '',
    technology: 'All',
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      const templates = await getTemplates();
      setAllTemplates(templates);
      setFilteredTemplates(templates);
      setIsLoading(false);
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let tempTemplates = [...allTemplates];

      // Filter by search term
      if (filters.searchTerm) {
        const lowercasedFilter = filters.searchTerm.toLowerCase();
        tempTemplates = tempTemplates.filter(template =>
          template.name.toLowerCase().includes(lowercasedFilter) ||
          template.description.toLowerCase().includes(lowercasedFilter)
        );
      }

      // Filter by technology/tag
      if (filters.technology !== 'All') {
        tempTemplates = tempTemplates.filter(template =>
          template.tags.includes(filters.technology)
        );
      }
      
      setFilteredTemplates(tempTemplates);
    };
    
    if(!isLoading) {
      applyFilters();
    }
  }, [filters, allTemplates, isLoading]);


  const TemplateSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card text-card-foreground shadow-sm">
          <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Templates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-headline font-semibold text-center mb-4 text-primary">All Templates</h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Browse our full collection of high-quality, customizable templates. Find the perfect foundation for your next project.
        </p>

        <TemplateFilter onFilterChange={setFilters} />
        
        {isLoading ? <TemplateSkeleton /> : <TemplateGrid templates={filteredTemplates} />}
      </div>
    </section>
  );
}
