import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Vérifier si l'utilisateur test existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscription: true }
    });

    // Si l'utilisateur existe, supprimer ses abonnements et l'utilisateur
    if (existingUser) {
      // Supprimer l'utilisateur existant
      await prisma.user.delete({
        where: { email: 'test@test.com' }
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
