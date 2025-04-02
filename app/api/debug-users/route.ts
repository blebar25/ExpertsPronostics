import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Récupérer tous les utilisateurs avec leurs abonnements
    const users = await prisma.user.findMany({
      include: {
        subscription: true
      }
    });

    // Récupérer le nombre total d'utilisateurs
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      users,
      totalUsers,
      message: 'Liste des utilisateurs avec leurs abonnements'
    });
  } catch (error) {
    console.error('Erreur lors du debug des utilisateurs:', error);
    return NextResponse.json(
      { error: 'Erreur lors du debug des utilisateurs' },
      { status: 500 }
    );
  }
}
