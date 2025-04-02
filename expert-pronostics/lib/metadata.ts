import { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: 'Expert Pronostics',
  description: 'Expert en pronostics sportifs avec plus de 92% de réussite sur plus de 50K pronostics. Analyses détaillées et conseils professionnels.',
  keywords: 'pronostics sportifs, paris sportifs, expert pronostics, pronostics football, analyse sportive',
  authors: [{ name: 'Expert Pronostics' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://expertspronostics.fr',
    siteName: 'Expert Pronostics',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Expert Pronostics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Pronostics',
    description: 'Expert en pronostics sportifs avec plus de 92% de réussite',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'votre-code-verification-google',
  },
};

export const getMetadata = (overrides?: Partial<Metadata>): Metadata => {
  if (!overrides) return defaultMetadata;
  return {
    ...defaultMetadata,
    ...overrides,
  };
};

// Métadonnées spécifiques pour chaque page
export const pageMetadata = {
  home: getMetadata({
    title: 'Expert Pronostics - Votre Expert en Paris Sportifs',
  }),
  pronostics: getMetadata({
    title: 'Pronostics Sportifs | Expert Pronostics',
    description: 'Découvrez nos pronostics sportifs quotidiens avec une précision de 92%. Analyses détaillées et conseils d\'experts.',
  }),
  resultats: getMetadata({
    title: 'Résultats et Historique | Expert Pronostics',
    description: 'Consultez nos résultats et notre historique de pronostics. Plus de 50K pronostics réussis.',
  }),
  pricing: getMetadata({
    title: 'Offres et Abonnements | Expert Pronostics',
    description: 'Choisissez l\'offre qui vous convient. Abonnements Standard et Premium disponibles.',
  }),
  contact: getMetadata({
    title: 'Contact | Expert Pronostics',
    description: 'Contactez notre équipe d\'experts. Support client disponible 7j/7.',
  }),
};
