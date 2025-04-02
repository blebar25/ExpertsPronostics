import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { type } = await request.json();

    if (!type || !['STANDARD', 'PREMIUM'].includes(type)) {
      return NextResponse.json(
        { error: 'Type d\'abonnement invalide' },
        { status: 400 }
      );
    }

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

    // Désactiver tous les abonnements existants
    await prisma.subscription.updateMany({
      where: { userId: user.id },
      data: { active: false }
    });

    // Créer un nouvel abonnement
    const newSubscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type,
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
      message: `Abonnement test mis à jour vers ${type}`,
      user: updatedUser,
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'abonnement test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'abonnement test' },
      { status: 500 }
    );
  }
}
