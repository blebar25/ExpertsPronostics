const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function extendPremiumSubscription() {
  try {
    // Trouver l'utilisateur premium
    const user = await prisma.user.findUnique({
      where: {
        email: 'premium@test.com'
      },
      include: {
        subscription: true
      }
    });

    if (!user) {
      console.log('Utilisateur premium non trouvé');
      return;
    }

    if (!user.subscription) {
      console.log('Pas d\'abonnement trouvé pour l\'utilisateur premium');
      return;
    }

    // Mettre à jour l'abonnement avec la date de fin au 1er mai 2025
    const endDate = new Date('2025-05-01');
    const now = new Date();
    
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: user.subscription.id
      },
      data: {
        active: true, // On active l'abonnement
        endDate: endDate,
        lastPaymentDate: now // Mise à jour de la date du dernier paiement
      }
    });

    console.log('Abonnement prolongé jusqu\'au 1er mai 2025:', updatedSubscription);
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

extendPremiumSubscription();
