const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: {
        email: 'premium@test.com'
      }
    })

    if (!user) {
      console.error('Utilisateur non trouvé')
      return
    }

    // Créer l'abonnement premium
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'MONTHLY_PREMIUM',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
        active: true
      }
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { subscription: true }
    })

    console.log('Abonnement premium ajouté:', updatedUser)
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'abonnement:', error)
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
