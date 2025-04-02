import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        subscriptions: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    const activeSubscription = user.subscriptions.find(
      sub => sub.active && sub.endDate > new Date()
    );

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Connexion réussie',
      user: {
        ...userWithoutPassword,
        hasActiveSubscription: !!activeSubscription
      }
    });
  } catch (error) {
    console.error('Erreur lors du test de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors du test de connexion' },
      { status: 500 }
    );
  }
}
