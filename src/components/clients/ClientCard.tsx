
import Image from 'next/image';
import type { Client } from '@/data/clients';
import { Card, CardContent } from '@/components/ui/card';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group">
        <CardContent className="p-0 flex flex-col h-full">
            <div className="relative w-full aspect-video flex-grow">
              <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="w-full p-4 border-t shrink-0 bg-muted/50">
              <p className="text-center font-medium text-foreground text-sm">{client.name}</p>
            </div>
        </CardContent>
    </Card>
  );
};

export default ClientCard;
