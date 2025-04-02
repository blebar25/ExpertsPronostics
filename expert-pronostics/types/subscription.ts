export const SubscriptionTypes = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM'
} as const;

export type SubscriptionType = typeof SubscriptionTypes[keyof typeof SubscriptionTypes];
export type SubscriptionDuration = 'monthly' | 'yearly';

export interface SubscriptionPlan {
  type: SubscriptionType;
  name: string;
  description: string;
  price: number;
  duration: SubscriptionDuration;
  features: string[];
  isPremium: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    type: SubscriptionTypes.STANDARD,
    name: 'Standard Mensuel',
    description: 'Accès aux pronostics standards',
    price: 14.90,
    duration: 'monthly',
    features: [
      'Accès aux pronostics standards',
      'Mises à jour quotidiennes',
      'Support par email'
    ],
    isPremium: false
  },
  {
    type: SubscriptionTypes.STANDARD,
    name: 'Standard Annuel',
    description: 'Accès aux pronostics standards avec réduction annuelle',
    price: 14.90 * 12 * 0.9,
    duration: 'yearly',
    features: [
      'Accès aux pronostics standards',
      'Mises à jour quotidiennes',
      'Support par email',
      'Économisez 10% par rapport au plan mensuel'
    ],
    isPremium: false
  },
  {
    type: SubscriptionTypes.PREMIUM,
    name: 'Premium Mensuel',
    description: 'Accès à tous les pronostics premium',
    price: 24.90,
    duration: 'monthly',
    features: [
      'Accès à TOUS les pronostics',
      'Pronostics premium exclusifs',
      'Analyses détaillées',
      'Support prioritaire',
      'Statistiques avancées'
    ],
    isPremium: true
  },
  {
    type: SubscriptionTypes.PREMIUM,
    name: 'Premium Annuel',
    description: 'Accès à tous les pronostics premium avec réduction annuelle',
    price: 24.90 * 12 * 0.9,
    duration: 'yearly',
    features: [
      'Accès à TOUS les pronostics',
      'Pronostics premium exclusifs',
      'Analyses détaillées',
      'Support prioritaire',
      'Statistiques avancées',
      'Économisez 10% par rapport au plan mensuel'
    ],
    isPremium: true
  }
];
