import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  maxNetworkRetries: 3, // Ajout de tentatives de reconnexion
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature')!;

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
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error('Pas d\'ID utilisateur dans les métadonnées');
          return NextResponse.json(
            { error: 'ID utilisateur manquant' },
            { status: 400 }
          );
        }

        // Désactiver les abonnements existants
        await prisma.subscription.updateMany({
          where: { userId },
          data: { active: false }
        });

        // Créer le nouvel abonnement
        const subscription = await prisma.subscription.create({
          data: {
            userId,
            type: 'STANDARD', // ou déterminer le type en fonction du prix
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            active: true,
            lastPaymentDate: new Date()
          }
        });

        return NextResponse.json({
          message: 'Abonnement créé avec succès',
          subscription
        });
      }

      // Ajouter d'autres cas au besoin
      default:
        console.log(`Événement non géré: ${event.type}`);
        return NextResponse.json({
          message: `Événement non géré: ${event.type}`
        });
    }
  } catch (error) {
    console.error('Erreur lors du traitement du webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
}