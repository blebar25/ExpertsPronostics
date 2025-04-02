import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: {
        email: 'test@test.com'
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur test non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier l'abonnement
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        active: true,
        endDate: {
          gt: new Date()
        }
      }
    });

    return NextResponse.json({
      hasActiveSubscription: !!subscription,
      subscription
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'abonnement test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de l\'abonnement test' },
      { status: 500 }
    );
  }
}
