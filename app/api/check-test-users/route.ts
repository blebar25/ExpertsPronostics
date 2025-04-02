import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Trouver tous les utilisateurs test
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: 'test'
        }
      }
    });

    // Récupérer les abonnements pour ces utilisateurs
    const userIds = users.map(user => user.id);
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: {
          in: userIds
        }
      }
    });

    // Associer les abonnements aux utilisateurs
    const usersWithSubscriptions = users.map(user => ({
      ...user,
      subscription: subscriptions.find(sub => sub.userId === user.id)
    }));

    return NextResponse.json({
      users: usersWithSubscriptions,
      count: users.length,
      message: 'Liste des utilisateurs test'
    });
  } catch (error) {
    console.error('Erreur lors de la vérification des utilisateurs test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification des utilisateurs test' },
      { status: 500 }
    );
  }
}
