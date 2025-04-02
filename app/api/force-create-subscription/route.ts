import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email et type d\'abonnement requis' },
        { status: 400 }
      );
    }

    if (!['STANDARD', 'PREMIUM'].includes(type)) {
      return NextResponse.json(
        { error: 'Type d\'abonnement invalide' },
        { status: 400 }
      );
    }

    // 1. Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
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

    // 2. Vérifier si l'utilisateur a déjà un abonnement actif
    if (user.subscription && user.subscription.active) {
      return NextResponse.json(
        { error: 'L\'utilisateur a déjà un abonnement actif' },
        { status: 400 }
      );
    }

    // 3. Créer un nouvel abonnement
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        active: true,
        lastPaymentDate: new Date()
      }
    });

    // 4. Récupérer l'utilisateur mis à jour
    const updatedUser = await prisma.user.findUnique({
      where: { email },
      include: {
        subscription: true
      }
    });

    return NextResponse.json({
      message: 'Abonnement créé avec succès',
      user: updatedUser,
      subscription: subscription
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'abonnement' },
      { status: 500 }
    );
  }
}
