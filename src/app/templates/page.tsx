
"use client";

import { useState, useEffect } from 'react';
import type { Template, Category } from '@/data/templates';
import { mockTemplates, categories } from '@/data/templates';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AllTemplatesPage() {
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTemplates(mockTemplates);
    } else {
      const tempTemplates = mockTemplates.filter(template => template.category === selectedCategory);
      setFilteredTemplates(tempTemplates);
    }
  }, [selectedCategory]);

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
        
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn(
                "rounded-full",
                selectedCategory !== category && "border-primary text-primary hover:bg-primary/10 hover:text-primary"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <TemplateGrid templates={filteredTemplates} />
      </div>
    </section>
  );
}
