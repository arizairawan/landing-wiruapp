
"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Template } from '@/data/templates';
import { mockTemplates } from '@/data/templates';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { Button } from '@/components/ui/button';
import { Rocket, Wrench, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  // Display the first 4 templates on the homepage
  const homePageTemplates = mockTemplates.slice(0, 4);

  return (
    <>
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6">
            Your Marketplace for Web & App Solutions
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Discover high-quality website and application templates, or let our experts build your vision from scratch.
            Wiru.app provides source code and full development services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-background/20 hover:bg-background/30 text-primary-foreground" asChild>
              <Link href="/templates">Explore Templates <Rocket className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-accent hover:bg-primary-foreground/10 hover:text-white border-primary-foreground/50" asChild>
               <a href="#services">Request Service <Wrench className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section id="templates" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-4 text-primary">Explore Our Templates</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Find the perfect starting point for your next project. High-quality, customizable templates ready for you.
          </p>
          <TemplateGrid templates={homePageTemplates} />
          {mockTemplates.length > 4 && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild className="text-primary hover:bg-primary/10 hover:text-primary border-primary">
                <Link href="/templates">
                  See More Templates <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <section id="services" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-headline font-semibold text-primary mb-6">Need a Custom Solution?</h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                        Beyond templates, our expert team can build your website or application tailored to your unique requirements.
                        From minor customizations to full-scale development, we're here to help you succeed.
                    </p>
                    <ul className="space-y-3 text-muted-foreground mb-8">
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Custom Feature Development</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Full Website/App Creation from Scratch</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Template Customization & Integration</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Ongoing Support & Maintenance</li>
                    </ul>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Get a Free Quote <Wrench className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl order-first md:order-last">
                     <Image src="https://placehold.co/600x450.png" alt="Custom Development Services" layout="fill" objectFit="cover" data-ai-hint="team meeting"/>
                </div>
            </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-16 lg:py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-4">About Wiru.app</h2>
          <p className="max-w-3xl mx-auto text-lg">
            Wiru.app is dedicated to empowering developers and entrepreneurs by providing high-quality digital assets and development services. 
            Our mission is to accelerate your journey from idea to launch with reliable, beautiful, and functional solutions. We believe in quality code and exceptional service.
          </p>
        </div>
      </section>
    </>
  );
}
