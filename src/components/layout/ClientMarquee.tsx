"use client";

import Image from 'next/image';
import { clients } from '@/data/clients';
import { Card, CardContent } from '@/components/ui/card';

const ClientMarquee = () => {
  const extendedClients = [...clients, ...clients]; // Duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {extendedClients.map((client, index) => (
          <Card key={index} className="mx-4 flex-shrink-0" style={{ width: '350px' }}>
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <div className="relative h-20 w-full mb-4">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center font-medium text-foreground text-sm">{client.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Fade effect on the sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent"></div>
    </div>
  );
};

export default ClientMarquee;
