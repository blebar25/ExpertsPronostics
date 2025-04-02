import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Supprimer l'utilisateur s'il existe déjà
    await prisma.user.deleteMany({
      where: {
        email: 'premium@test.com'
      }
    })

    // Créer un nouvel utilisateur
    const hashedPassword = await hash('test123', 12)
    const user = await prisma.user.create({
      data: {
        email: 'premium@test.com',
        password: hashedPassword
      }
    })

    // Créer l'abonnement premium
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'MONTHLY_PREMIUM',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        active: true
      }
    })

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { subscription: true }
    })

    console.log('Utilisateur premium créé:', fullUser)
  } catch (error) {
    console.error('Erreur lors de la création:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
