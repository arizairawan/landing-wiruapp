
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from '@/data/templates';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <Image
            src={template.imageUrl}
            alt={template.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={template.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-headline mb-2 line-clamp-2">{template.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-grow">{template.description}</p>
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
          {template.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2 border-t">
        <p className="text-xl font-semibold text-primary">${template.priceSourceCode}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={template.previewUrl || `#preview/${template.id}`}>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <ShoppingCart className="mr-2 h-4 w-4" /> Buy
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
