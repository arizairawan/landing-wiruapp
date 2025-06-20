
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Template, Category, Technology } from '@/data/templates';
import { mockTemplates } from '@/data/templates';
import TemplateGrid from '@/components/templates/TemplateGrid';
import TemplateFilter from '@/components/templates/TemplateFilter';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function AllTemplatesPage() {
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);

  const handleFilterChange = useCallback((filters: { searchTerm: string; category: Category; technology: Technology }) => {
    let tempTemplates = mockTemplates;

    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      tempTemplates = tempTemplates.filter(template =>
        template.name.toLowerCase().includes(searchTermLower) ||
        template.description.toLowerCase().includes(searchTermLower) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
      );
    }

    if (filters.category !== 'All') {
      tempTemplates = tempTemplates.filter(template => template.category === filters.category);
    }

    if (filters.technology !== 'All') {
      tempTemplates = tempTemplates.filter(template => template.tags.includes(filters.technology) || template.tags.includes(filters.technology.replace(/\s/g, '')));
    }

    setFilteredTemplates(tempTemplates);
  }, []);

  useEffect(() => {
    handleFilterChange({ searchTerm: '', category: 'All', technology: 'All' });
  }, [handleFilterChange]);

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
        <TemplateFilter onFilterChange={handleFilterChange} />
        <TemplateGrid templates={filteredTemplates} />
      </div>
    </section>
  );
}
