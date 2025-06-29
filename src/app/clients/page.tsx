
import Link from 'next/link';
import { clients } from '@/data/clients';
import ClientGrid from '@/components/clients/ClientGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function AllClientsPage() {
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
              <BreadcrumbPage>Our Clients</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4">Our Valued Clients</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are proud to have collaborated with a diverse range of companies and startups to bring their digital visions to life.
            </p>
        </div>
        
        <ClientGrid clients={clients} />
      </div>
    </section>
  );
}
