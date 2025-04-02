import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Récupérer tous les utilisateurs avec leurs abonnements
    const users = await prisma.user.findMany({
      include: {
        subscriptions: true
      }
    });

    // Récupérer tous les abonnements
    const subscriptions = await prisma.subscription.findMany();

    return NextResponse.json({
      users,
      subscriptions,
      message: 'État de la base de données'
    });
  } catch (error) {
    console.error('Erreur lors du debug de la base de données:', error);
    return NextResponse.json(
      { error: 'Erreur lors du debug de la base de données' },
      { status: 500 }
    );
  }
}
