import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/emailjs';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Générer un token unique
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    // Mettre à jour l'utilisateur avec le token
    const user = await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    if (user) {
      // Envoyer l'email avec le lien de réinitialisation
      await sendPasswordResetEmail({
        to_email: email,
        to_name: user.name,
        reset_link: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`
      });
    }

    // Toujours renvoyer le même message pour éviter les fuites d'information
    return NextResponse.json({
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.'
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
