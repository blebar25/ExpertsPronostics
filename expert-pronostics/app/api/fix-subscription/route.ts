import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    console.log('Utilisateur trouvé:', user);

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur test non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà un abonnement actif
    const hasActiveSubscription = user.subscriptions.some(
      sub => sub.active && sub.endDate > new Date()
    );

    if (hasActiveSubscription) {
      return NextResponse.json({
        message: 'L\'utilisateur a déjà un abonnement actif',
        user
      });
    }

    // Créer un nouvel abonnement standard
    const newSubscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'STANDARD',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        active: true,
        lastPaymentDate: new Date()
      }
    });

    // Récupérer l'utilisateur mis à jour
    const updatedUser = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    return NextResponse.json({
      message: 'Abonnement standard créé avec succès',
      user: updatedUser,
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Erreur lors de la correction de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la correction de l\'abonnement' },
      { status: 500 }
    );
  }
}
