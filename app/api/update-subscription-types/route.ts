import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    // Mettre à jour tous les abonnements premium
    const updatedPremiumSubscriptions = await prisma.subscription.updateMany({
      where: {
        type: {
          in: ['MONTHLY_PREMIUM', 'YEARLY_PREMIUM']
        }
      },
      data: {
        type: 'PREMIUM'
      }
    })

    // Mettre à jour tous les abonnements standard
    const updatedStandardSubscriptions = await prisma.subscription.updateMany({
      where: {
        type: {
          in: ['MONTHLY_STANDARD', 'YEARLY_STANDARD']
        }
      },
      data: {
        type: 'STANDARD'
      }
    })

    return NextResponse.json({
      message: 'Types d\'abonnement mis à jour',
      premiumUpdated: updatedPremiumSubscriptions.count,
      standardUpdated: updatedStandardSubscriptions.count
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    return NextResponse.json({ 
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
