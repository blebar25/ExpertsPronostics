import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' }
    });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    // Récupérer l'abonnement de l'utilisateur
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id }
    });

    return NextResponse.json({
      exists: true,
      user: {
        ...user,
        subscription
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de l\'utilisateur' },
      { status: 500 }
    );
  }
}
