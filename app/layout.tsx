import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { getMetadata } from '@/lib/metadata';
import './globals.css';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { AuthProvider } from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  ...getMetadata()
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
          {children}
          <Footer />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
