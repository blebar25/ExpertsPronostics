import { Providers } from '@/components/providers';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { AuthProvider } from '@/components/AuthProvider'

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
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Expert Pronostics" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <Providers>{children}</Providers>
          <Footer />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
