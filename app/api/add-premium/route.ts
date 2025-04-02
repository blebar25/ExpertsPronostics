import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { SubscriptionTypes } from '@/types/subscription'

export async function POST(req: Request) {
  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: {
        email: 'premium@test.com'
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    console.log('Utilisateur trouvé:', user)

    // Vérifier si l'utilisateur a déjà un abonnement
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id
      }
    })

    console.log('Abonnement existant:', existingSubscription)

    if (existingSubscription) {
      // Mettre à jour l'abonnement existant
      const updatedSubscription = await prisma.subscription.update({
        where: {
          id: existingSubscription.id
        },
        data: {
          type: SubscriptionTypes.PREMIUM,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          active: true,
          lastPaymentDate: new Date()
        }
      })
      
      console.log('Abonnement mis à jour:', updatedSubscription)
      return NextResponse.json({ message: 'Abonnement mis à jour', subscription: updatedSubscription })
    }

    // Créer un nouvel abonnement premium
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: SubscriptionTypes.PREMIUM,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        active: true,
        lastPaymentDate: new Date()
      }
    })

    console.log('Nouvel abonnement créé:', subscription)
    return NextResponse.json({ message: 'Abonnement créé', subscription })
  } catch (error) {
    console.error('Erreur détaillée:', error)
    return NextResponse.json({ 
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
