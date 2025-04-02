import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Supprimer tous les utilisateurs de test et leurs abonnements
    await prisma.subscription.deleteMany({
      where: {
        user: {
          email: {
            in: ['test@test.com', 'no-sub@test.com', 'premium@test.com', 'standard@test.com']
          }
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['test@test.com', 'no-sub@test.com', 'premium@test.com', 'standard@test.com']
        }
      }
    });

    // Créer les mots de passe hashés
    const standardPassword = await hash('password123', 10);
    const premiumPassword = await hash('password123', 10);

    // Créer le compte premium
    const premiumUser = await prisma.user.create({
      data: {
        email: 'premium@test.com',
        password: premiumPassword,
        name: 'User Premium',
        subscription: {
          create: {
            type: 'PREMIUM',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            active: true,
            lastPaymentDate: new Date()
          }
        }
      },
      include: {
        subscription: true
      }
    });

    // Créer le compte standard
    const standardUser = await prisma.user.create({
      data: {
        email: 'standard@test.com',
        password: standardPassword,
        name: 'User Standard',
        subscription: {
          create: {
            type: 'STANDARD',
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            active: true,
            lastPaymentDate: new Date()
          }
        }
      },
      include: {
        subscription: true
      }
    });

    // Créer l'utilisateur sans abonnement
    const noSubUser = await prisma.user.create({
      data: {
        email: 'no-sub@test.com',
        password: standardPassword,
        name: 'User Sans Abonnement'
      }
    });

    return NextResponse.json({
      message: 'Comptes de test réinitialisés avec succès',
      users: {
        standard: standardUser,
        premium: premiumUser,
        noSub: noSubUser
      }
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation des comptes de test:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réinitialisation des comptes de test' },
      { status: 500 }
    );
  }
}
