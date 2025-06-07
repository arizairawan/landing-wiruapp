import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card text-card-foreground shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <svg
            className="h-8 w-auto text-primary"
            viewBox="0 0 105 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Wiru.app Logo"
          >
            <text x="0" y="30" className="font-headline" fontSize="30" fontWeight="bold" fill="currentColor">
              wiru
            </text>
            <circle cx="90" cy="20" r="7" fill="hsl(var(--accent))" />
            <text x="80" y="25" className="font-headline" fontSize="12" fontWeight="bold" fill="hsl(var(--accent-foreground))">
              .app
            </text>
          </svg>
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="#templates" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Templates
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Services
          </Link>
          <Link href="#recommendations" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            For You
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign Up</Button>
        </div>
        {/* Mobile Menu Trigger - Can be added later if needed */}
      </div>
    </header>
  );
};

export default Header;
