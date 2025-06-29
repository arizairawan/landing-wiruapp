
'use client'; // Required for Sheet component and hooks

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, Rocket, Wrench, Newspaper, Users, Link2, Info } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/#templates", label: "Templates", icon: Rocket, prefetch: false },
    { href: "/#services", label: "Services", icon: Wrench, prefetch: false },
    { href: "/blog", label: "Blog", icon: Newspaper, prefetch: true },
    { href: "/#clients", label: "Clients", icon: Users, prefetch: false },
    { href: "/#wiru-link", label: "Link", icon: Link2, prefetch: false },
    { href: "/#about", label: "About", icon: Info, prefetch: false },
  ];

  return (
    <header className="bg-background/90 text-foreground sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <Image
            src="/wiru-app-logo.png"
            alt="Wiru.app Logo"
            width={32}
            height={32}
            className="transition-opacity group-hover:opacity-90"
          />
          <span className="font-headline text-2xl font-bold text-foreground transition-opacity group-hover:opacity-90">
            Wiru.App
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-foreground/80 transition-all px-3 py-2 rounded-md"
              prefetch={link.prefetch}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop Contact Button */}
          <Button size="sm" className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="mailto:aplikasiwiru@gmail.com">
              Contact Us
            </a>
          </Button>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Main navigation links for the Wiru.app website.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-6 h-full">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image
                        src="/wiru-app-logo.png"
                        alt="Wiru.app Logo"
                        width={32}
                        height={32}
                      />
                      <span className="font-headline text-2xl font-bold">
                        Wiru.App
                      </span>
                  </Link>
                  <nav className="flex flex-col gap-2 flex-grow">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          // For external links or different pages, close the menu.
                          // For hash links on the same page, keep it open.
                          if (!link.href.startsWith('/#') || pathname !== '/') {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
                        prefetch={link.prefetch}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto">
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                        <a href="mailto:aplikasiwiru@gmail.com">
                          Contact Us
                        </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
