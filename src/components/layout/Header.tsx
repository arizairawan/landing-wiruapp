
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card text-card-foreground shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <svg
            viewBox="0 0 42 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Wiru.app Logo Icon"
            className="h-8 w-auto text-primary transition-colors group-hover:text-primary/90"
          >
            <rect x="2" y="4" width="8" height="24" rx="4" />
            <rect x="11" y="9" width="8" height="19" rx="4" />
            <rect x="20" y="4" width="8" height="24" rx="4" />
            <rect x="30" y="9" width="8" height="19" rx="4" />
            <rect x="30" y="4" width="8" height="4" rx="2" />
          </svg>
          <span className="font-headline text-2xl font-bold text-primary transition-opacity group-hover:opacity-90">
            Wiru.App
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link 
            href="/templates" 
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-card-foreground/80 transition-all px-3 py-2 rounded-md" 
            prefetch={false}
          >
            Templates
          </Link>
          <Link 
            href="/#services" 
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-card-foreground/80 transition-all px-3 py-2 rounded-md" 
            prefetch={false}
          >
            Services
          </Link>
          <Link 
            href="/#about" 
            className="text-sm font-medium hover:text-primary hover:bg-primary/5 text-card-foreground/80 transition-all px-3 py-2 rounded-md" 
            prefetch={false}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="https://studio.wiru.app" target="_blank" rel="noopener noreferrer">
              Sign Up
            </a>
          </Button>
        </div>
        {/* Mobile Menu Trigger - Can be added later if needed */}
      </div>
    </header>
  );
};

export default Header;
