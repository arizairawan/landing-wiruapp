import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">© {new Date().getFullYear()} Wiru.app. All rights reserved.</p>
        <nav className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-sm hover:text-primary transition-colors" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:text-primary transition-colors" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
