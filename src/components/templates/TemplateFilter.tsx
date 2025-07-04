
"use client";

import { Button } from '@/components/ui/button';
import type { Technology } from '@/data/templates';
import { technologies } from '@/data/templates';

interface TemplateFilterProps {
  selectedTechnology: Technology;
  onTechnologyChange: (tech: Technology) => void;
}

const TemplateFilter: React.FC<TemplateFilterProps> = ({ selectedTechnology, onTechnologyChange }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-2">
        {technologies.map(tech => (
          <Button
            key={tech}
            variant={selectedTechnology === tech ? 'default' : 'outline'}
            onClick={() => onTechnologyChange(tech)}
            className="transition-all"
          >
            {tech}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplateFilter;
