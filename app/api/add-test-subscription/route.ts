import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur test non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà un abonnement
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId: user.id }
    });

    if (existingSubscription) {
      await prisma.subscription.delete({
        where: { id: existingSubscription.id }
      });
    }

    // Créer le nouvel abonnement
    const now = new Date();
    const yearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'YEARLY_STANDARD',
        startDate: now,
        endDate: yearFromNow,
        active: true,
        lastPaymentDate: now
      }
    });

    return NextResponse.json({
      message: 'Abonnement test créé avec succès',
      subscription
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'abonnement test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'abonnement test' },
      { status: 500 }
    );
  }
}
