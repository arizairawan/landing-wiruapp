
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { Technology } from '@/data/templates';
import { technologies } from '@/data/templates';

interface TemplateFilterProps {
  onFilterChange: (filters: { searchTerm: string; technology: Technology }) => void;
}

const TemplateFilter: React.FC<TemplateFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [technology, setTechnology] = useState<Technology>('All');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTechnologyChange = (tech: Technology) => {
    setTechnology(tech);
  };
  
  useEffect(() => {
    onFilterChange({ searchTerm, technology });
  }, [searchTerm, technology, onFilterChange]);


  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md space-y-6">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
          Search Templates
        </label>
        <div className="relative">
          <Input
            type="text"
            id="search"
            placeholder="Keywords (e.g., E-commerce, SaaS)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pr-10 text-base"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Technology / Tag
        </label>
        <div className="flex flex-wrap gap-2">
          {technologies.map(tech => (
            <Button
              key={tech}
              variant={technology === tech ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTechnologyChange(tech)}
              className="transition-all"
            >
              {tech}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFilter;
