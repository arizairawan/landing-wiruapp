
import Image from 'next/image';
import type { Client } from '@/data/clients';
import { Card, CardContent } from '@/components/ui/card';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0 flex flex-col h-full">
            {/* Image container takes up remaining space and centers content */}
            <div className="relative w-full aspect-video flex-grow p-6 flex items-center justify-center bg-secondary/30">
              <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* Name section at the bottom */}
            <div className="w-full p-4 border-t bg-card">
              <p className="text-center font-semibold text-foreground truncate">{client.name}</p>
            </div>
        </CardContent>
    </Card>
  );
};

export default ClientCard;
