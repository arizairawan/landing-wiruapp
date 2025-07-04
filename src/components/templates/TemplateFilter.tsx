
"use client";

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleTechnologyChange = (value: string) => {
    setTechnology(value as Technology);
  };
  
  useEffect(() => {
    onFilterChange({ searchTerm, technology });
  }, [searchTerm, technology, onFilterChange]);


  return (
    <form onSubmit={(e) => e.preventDefault()} className="mb-8 p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Templates</label>
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
          <label htmlFor="technology" className="block text-sm font-medium text-foreground mb-1">Technology / Tag</label>
          <Select value={technology} onValueChange={handleTechnologyChange}>
            <SelectTrigger id="technology" className="text-base">
              <SelectValue placeholder="Select technology or tag" />
            </SelectTrigger>
            <SelectContent>
              {technologies.map(tech => (
                <SelectItem key={tech} value={tech} className="text-base">{tech}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default TemplateFilter;
