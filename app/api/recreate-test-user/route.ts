import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Vérifier si l'utilisateur test existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    // Si l'utilisateur existe, supprimer ses abonnements et l'utilisateur
    if (existingUser) {
      // Supprimer d'abord tous les abonnements
      await prisma.subscription.deleteMany({
        where: { userId: existingUser.id }
      });

      // Puis supprimer l'utilisateur
      await prisma.user.delete({
        where: { id: existingUser.id }
      });
    }

    // Créer un nouveau mot de passe hashé
    const hashedPassword = await hash('password123', 10);

    // Créer le nouvel utilisateur avec un abonnement standard
    const user = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User',
        subscriptions: {
          create: {
            type: 'STANDARD',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            active: true,
            lastPaymentDate: new Date()
          }
        }
      },
      include: {
        subscriptions: true
      }
    });

    return NextResponse.json({
      message: 'Utilisateur test recréé avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur lors de la recréation de l\'utilisateur test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recréation de l\'utilisateur test' },
      { status: 500 }
    );
  }
}
