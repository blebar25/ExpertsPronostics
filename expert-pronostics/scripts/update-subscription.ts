const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateSubscription() {
  try {
    // 1. Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    if (!user) {
      console.error('❌ Utilisateur non trouvé');
      return;
    }

    // 2. Supprimer tous les abonnements existants
    await prisma.subscription.deleteMany({
      where: { userId: user.id }
    });

    console.log('✅ Anciens abonnements supprimés');

    // 3. Créer un nouvel abonnement STANDARD
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'STANDARD',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        active: true,
        lastPaymentDate: new Date(),
        stripeSubscriptionId: 'test_standard_sub_id'
      }
    });

    console.log('✅ Nouvel abonnement STANDARD créé:', subscription);

    // 4. Vérifier le résultat
    const updatedUser = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    console.log('✅ Utilisateur mis à jour:', updatedUser);
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSubscription();
