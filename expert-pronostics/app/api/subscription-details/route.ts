import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur avec ses abonnements
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        subscription: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Trouver l'abonnement actif
    const activeSubscription = user.subscription && 
    user.subscription.active && 
    user.subscription.endDate > new Date() 
      ? user.subscription 
      : null;

      return NextResponse.json({
        hasActiveSubscription: !!activeSubscription,
        subscription: user.subscription,
        allSubscriptions: [user.subscription].filter(Boolean) // On filtre les valeurs null
      });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails d\'abonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des détails d\'abonnement' },
      { status: 500 }
    );
  }
}
