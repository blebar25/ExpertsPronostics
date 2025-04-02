import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur test non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer tous les abonnements existants
    await prisma.subscription.deleteMany({
      where: { userId: user.id }
    });

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
      message: 'Abonnement test réinitialisé avec succès',
      user: updatedUser,
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation de l\'abonnement test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réinitialisation de l\'abonnement test' },
      { status: 500 }
    );
  }
}
