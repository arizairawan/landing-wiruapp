import type { Template } from '@/data/templates';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
  if (!templates || templates.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No templates match your criteria. Try adjusting your filters!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`
            ${template.gridSpanDesktop === 2 ? 'lg:col-span-2 sm:col-span-full' : 'lg:col-span-1 sm:col-span-1'} 
            ${template.gridSpanMobile === 2 ? 'col-span-full' : 'col-span-1'}
          `}
        >
          <TemplateCard template={template} />
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
