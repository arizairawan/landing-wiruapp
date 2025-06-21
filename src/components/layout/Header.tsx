
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Header = () => {
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
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/#templates"
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-foreground/80 transition-all px-3 py-2 rounded-md"
            prefetch={false}
          >
            Templates
          </Link>
          <Link
            href="/#services"
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-foreground/80 transition-all px-3 py-2 rounded-md"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="/#wiru-link"
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-foreground/80 transition-all px-3 py-2 rounded-md"
            prefetch={false}
          >
            Link
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-foreground/80 transition-all px-3 py-2 rounded-md"
            prefetch={false}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="mailto:aplikasiwiru@gmail.com">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
