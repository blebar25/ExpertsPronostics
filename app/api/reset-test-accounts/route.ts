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
            in: ['test@test.com', 'no-sub@test.com', 'premium@test.com']
          }
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['test@test.com', 'no-sub@test.com', 'premium@test.com']
        }
      }
    });

    // Créer les mots de passe hashés
    const hashedPassword = await hash('password123', 10);

    // Créer l'utilisateur standard avec abonnement standard
    const standardUser = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: hashedPassword,
        name: 'User Standard',
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

    // Créer l'utilisateur premium avec abonnement premium
    const premiumUser = await prisma.user.create({
      data: {
        email: 'premium@test.com',
        password: hashedPassword,
        name: 'User Premium',
        subscriptions: {
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
        subscriptions: true
      }
    });

    // Créer l'utilisateur sans abonnement
    const noSubUser = await prisma.user.create({
      data: {
        email: 'no-sub@test.com',
        password: hashedPassword,
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
