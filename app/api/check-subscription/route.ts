import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Vérifier l'abonnement de l'utilisateur
    const subscription = await prisma.subscription.findFirst({
      where: { 
        userId: session.user.id,
        active: true,
        endDate: {
          gt: new Date()
        }
      }
    });

    if (!subscription) {
      return NextResponse.json({
        hasActiveSubscription: false,
        message: 'Aucun abonnement actif trouvé'
      });
    }

    return NextResponse.json({
      hasActiveSubscription: true,
      subscription
    });

  } catch (error) {
    console.error('Erreur lors de la vérification de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de l\'abonnement' },
      { status: 500 }
    );
  }
}
