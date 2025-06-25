
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app'; // Fallback, ideally set in .env

export const metadata: Metadata = {
  title: 'Wiru.app: Your Marketplace for Web & App Solutions',
  description: 'Purchase website/application source code or request development services. Discover high-quality templates or get custom solutions.',
  keywords: ['web templates', 'app source code', 'development services', 'NextJS templates', 'React templates', 'Wiru.app', 'Marketplace', 'Web Solutions', 'App Solutions', 'flutter', 'angular', 'bootstrap', 'tailwind'],
  authors: [{ name: 'Wiru.app Team', url: siteUrl }],
  creator: 'Wiru.app Team',
  publisher: 'Wiru.app',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Wiru.app: Your Marketplace for Web & App Solutions',
    description: 'Purchase website/application source code or request development services. Discover high-quality templates or get custom solutions.',
    siteName: 'Wiru.app',
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Placeholder, ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: 'Wiru.app Marketplace Hero Image',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wiruapp', // Replace with your actual Twitter handle
    creator: '@wiruapp_team', // Replace with your team's or creator's Twitter handle
    title: 'Wiru.app: Your Marketplace for Web & App Solutions',
    description: 'Purchase website/application source code or request development services. Discover high-quality templates or get custom solutions.',
    images: [`${siteUrl}/twitter-image.png`], // Placeholder, ensure this image exists
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/wiru-app-logo.png', 
    shortcut: '/wiru-app-logo.png', 
    apple: '/wiru-app-logo.png',  
  },
  manifest: '/site.webmanifest', // Changed to relative path
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground">
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
