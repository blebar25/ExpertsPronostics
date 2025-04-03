import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  maxNetworkRetries: 3,
});

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not set in environment variables');
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No stripe-signature header found' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Erreur de signature du webhook:', err);
      return NextResponse.json(
        { error: 'Signature du webhook invalide' },
        { status: 400 }
      );
    }

    // Gérer les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        
        if (!userId) {
          throw new Error('No client_reference_id found in session');
        }

        // Mettre à jour l'abonnement de l'utilisateur
        const subscriptionData = {
          type: session.metadata?.subscriptionType || 'STANDARD',
          startDate: new Date(),
          endDate: new Date(Date.now() + (session.metadata?.duration === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
          active: true,
          lastPaymentDate: new Date(),
          stripeSubscriptionId: session.subscription as string
        };

        await prisma.subscription.create({
          data: {
            ...subscriptionData,
            userId
          }
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Désactiver l'abonnement dans notre base de données
        await prisma.subscription.updateMany({
          where: {
            stripeSubscriptionId: subscription.id,
            active: true
          },
          data: {
            active: false
          }
        });

        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
        return NextResponse.json({
          message: `Événement non géré: ${event.type}`
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur dans le webhook:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}