
"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Template } from '@/data/templates';
import { getTemplates } from '@/services/templateService';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { Button } from '@/components/ui/button';
import { Rocket, Wrench, CheckCircle, ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import ClientMarquee from '@/components/layout/ClientMarquee';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [homePageTemplates, setHomePageTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

  useEffect(() => {
    const fetchHomePageTemplates = async () => {
      setIsLoadingTemplates(true);
      const allTemplates = await getTemplates();
      const templatesForHome = allTemplates.slice(0, 4).map(template => ({
        ...template,
        gridSpanDesktop: 1, 
        gridSpanMobile: 1,
      }));
      setHomePageTemplates(templatesForHome);
      setIsLoadingTemplates(false);
    };
    fetchHomePageTemplates();
  }, []);

  const TemplateSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card text-card-foreground shadow-sm">
          <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="py-16 md:py-24 lg:py-32 bg-background text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground mb-6">
            Your Marketplace for{' '}
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Web & App
            </span>
            {' '}Solutions
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-3xl mx-auto">
            Discover high-quality website and application templates, or let our experts build your vision from scratch.
            Wiru.app provides source code and full development services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" asChild>
              <Link href="/templates">Explore Templates <Rocket className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent text-accent hover:text-accent-foreground hover:bg-accent"
              asChild
            >
               <a href="#services">Request Service <Wrench className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section id="templates" className="py-12 md:py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center text-primary">Explore Our Templates</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Find the perfect starting point for your next project. High-quality, customizable templates ready for you.
          </p>
          {isLoadingTemplates ? <TemplateSkeleton /> : <TemplateGrid templates={homePageTemplates} />}
          {!isLoadingTemplates && homePageTemplates.length > 0 && (
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
      
      <section id="services" className="py-12 md:py-16 lg:py-20 bg-background">
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
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                      <a href="mailto:aplikasiwiru@gmail.com">
                        Let's Build Your Idea <Wrench className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                     <Image src="/custom-development-services.png" alt="Custom Development Services Illustration" fill className="object-contain"/>
                </div>
            </div>
        </div>
      </section>

      <section id="clients" className="py-12 md:py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center text-primary mb-4">
            Trusted by Leading Companies & Startups
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We are proud to have collaborated with a diverse range of clients to bring their digital visions to life.
          </p>
          <ClientMarquee />
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="text-primary hover:bg-primary/10 hover:text-primary border-primary">
              <Link href="/clients">
                See All Clients <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="wiru-link" className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden order-last md:order-first">
                     <Image 
                        src="/wiru-link-showcase.png" 
                        alt="Wiru Link product showcase on a smartphone" 
                        fill 
                        className="object-contain"
                        data-ai-hint="mobile mockup"
                     />
                </div>
                <div>
                    <h2 className="text-3xl font-headline font-semibold text-primary mb-6">
                      Introducing Wiru Link: Your All-in-One Link Page
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      Create a beautiful and personalized page to showcase everything you are and everything you do.
                      Share your bio, social media profiles, online store, latest projects, and more – all with a single link.
                    </p>
                    <ul className="space-y-3 text-muted-foreground mb-8">
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Easy to customize and manage.</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Share all your important links in one place.</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Perfect for creators, entrepreneurs, and businesses.</li>
                        <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" /> Drive traffic to your most important content.</li>
                    </ul>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <a href="https://studio.wiru.app" target="_blank" rel="noopener noreferrer">
                        Explore Wiru Link <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      <section id="about" className="py-12 md:py-16 lg:py-20 bg-secondary text-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-4">About Wiru.app</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Wiru.app is dedicated to empowering developers and entrepreneurs by providing high-quality digital assets and development services. 
            Our mission is to accelerate your journey from idea to launch with reliable, beautiful, and functional solutions. We believe in quality code and exceptional service.
          </p>
          <div className="mt-8 flex justify-center items-center gap-6">
            <a href="https://www.instagram.com/wiru.app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-7 w-7" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/wiruapp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-7 w-7" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:aplikasiwiru@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-7 w-7" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
