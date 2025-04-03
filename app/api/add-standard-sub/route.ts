import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur test non trouvé' },
        { status: 404 }
      );
    }

    // 2. Vérifier si l'utilisateur a déjà un abonnement
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId: user.id }
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'L\'utilisateur a déjà un abonnement' },
        { status: 400 }
      );
    }

    // 3. Créer un nouvel abonnement standard
    const now = new Date();
    const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'MONTHLY_STANDARD',
        startDate: now,
        endDate: monthFromNow,
        active: true,
        lastPaymentDate: now
      }
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'abonnement standard:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de l\'abonnement' },
      { status: 500 }
    );
  }
}
