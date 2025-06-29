
import type { Client } from '@/data/clients';
import ClientCard from './ClientCard';

interface ClientGridProps {
  clients: Client[];
}

const ClientGrid: React.FC<ClientGridProps> = ({ clients }) => {
  if (!clients || clients.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No clients to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
      {clients.map((client, index) => (
        <ClientCard key={index} client={client} />
      ))}
    </div>
  );
};

export default ClientGrid;
