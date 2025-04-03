import { Providers } from '@/components/providers';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://expert-pronostics.com'),
  title: 'Expert Pronostics',
  description: 'Plateforme de pronostics sportifs par des experts',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'Expert Pronostics',
    description: 'Plateforme de pronostics sportifs par des experts',
    siteName: 'Expert Pronostics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Pronostics',
    description: 'Plateforme de pronostics sportifs par des experts',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
            <CookieBanner />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
