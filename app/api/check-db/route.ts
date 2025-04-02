import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Vérification de la base de données...');

    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany();
    console.log('Utilisateurs trouvés:', users);

    // Récupérer tous les abonnements
    const subscriptions = await prisma.subscription.findMany();
    console.log('Abonnements trouvés:', subscriptions);

    return NextResponse.json({
      message: 'Base de données accessible',
      users: users.length,
      subscriptions: subscriptions.length
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de la base de données:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de la base de données' },
      { status: 500 }
    );
  }
}
