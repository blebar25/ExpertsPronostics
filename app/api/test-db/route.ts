import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Vérifier la connexion à la base de données
    await prisma.$connect();
    console.log('Connexion à la base de données établie');

    // Compter le nombre total d'utilisateurs
    const userCount = await prisma.user.count();
    console.log('Nombre total d\'utilisateurs:', userCount);

    // Récupérer tous les utilisateurs avec leurs abonnements
    const users = await prisma.user.findMany({
      include: {
        subscription: true
      }
    });
    console.log('Utilisateurs trouvés:', users);

    // Compter le nombre total d'abonnements
    const subscriptionCount = await prisma.subscription.count();
    console.log('Nombre total d\'abonnements:', subscriptionCount);

    // Récupérer tous les abonnements
    const subscriptions = await prisma.subscription.findMany();
    console.log('Abonnements trouvés:', subscriptions);

    return NextResponse.json({
      status: 'success',
      message: 'Base de données testée avec succès',
      data: {
        userCount,
        users,
        subscriptionCount,
        subscriptions
      }
    });
  } catch (error) {
    console.error('Erreur lors du test de la base de données:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Erreur lors du test de la base de données',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log('Déconnexion de la base de données');
  }
}
