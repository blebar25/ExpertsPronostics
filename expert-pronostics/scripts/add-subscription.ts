const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSubscription() {
  try {
    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: { subscriptions: true }
    });

    if (!user) {
      console.error('❌ Utilisateur non trouvé');
      return;
    }

    // Créer un nouvel abonnement
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'PREMIUM',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        active: true,
        lastPaymentDate: new Date(),
        stripeSubscriptionId: 'test_sub_id' // ID fictif pour les tests
      }
    });

    console.log('✅ Abonnement créé avec succès:', subscription);

    // Vérifier que l'abonnement a bien été ajouté
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

addSubscription();
