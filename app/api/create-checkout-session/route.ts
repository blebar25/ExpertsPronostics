import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

interface PriceIds {
  [key: string]: string;
}

const PRICE_IDS: PriceIds = {
  MONTHLY_STANDARD: process.env.STRIPE_MONTHLY_STANDARD_PRICE_ID!,
  YEARLY_STANDARD: process.env.STRIPE_YEARLY_STANDARD_PRICE_ID!,
  MONTHLY_PREMIUM: process.env.STRIPE_MONTHLY_PREMIUM_PRICE_ID!,
  YEARLY_PREMIUM: process.env.STRIPE_YEARLY_PREMIUM_PRICE_ID!,
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { priceId } = body;

    if (!priceId || !PRICE_IDS[priceId]) {
      return NextResponse.json(
        { error: 'ID de prix invalide' },
        { status: 400 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_IDS[priceId],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offres`,
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
