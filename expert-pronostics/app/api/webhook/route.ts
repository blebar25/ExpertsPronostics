import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { sendSubscriptionConfirmation } from '@/lib/emailjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Erreur de signature webhook:', err);
      return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      
      if (!userId) {
        console.error('Pas d\'ID utilisateur trouvé dans la session');
        return NextResponse.json({ error: 'ID utilisateur manquant' }, { status: 400 });
      }

      // Récupérer les détails de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        console.error('Utilisateur non trouvé:', userId);
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }

      // Déterminer le type d'abonnement
      const subscriptionType = session.metadata?.subscriptionType || 'STANDARD';

      // Mettre à jour ou créer l'abonnement
      const subscription = await prisma.subscription.upsert({
        where: {
          userId: userId
        },
        update: {
          type: subscriptionType,
          active: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
          lastPaymentDate: new Date(),
          stripeSubscriptionId: session.subscription as string
        },
        create: {
          userId: userId,
          type: subscriptionType,
          active: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          lastPaymentDate: new Date(),
          stripeSubscriptionId: session.subscription as string
        }
      });

      // Envoyer l'email de confirmation à l'utilisateur
      await sendSubscriptionConfirmation({
        to_email: user.email,
        to_name: user.name,
        subscription_type: subscriptionType
      });

      return NextResponse.json({ message: 'Webhook traité avec succès' });
    }

    return NextResponse.json({ message: 'Événement non géré' });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
}
