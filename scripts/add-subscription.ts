import prisma from '@/lib/prisma';

async function main() {
  try {
    // Trouver l'utilisateur test
    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: {
        subscription: true
      }
    });

    if (!user) {
      console.log('Utilisateur test non trouvé');
      return;
    }

    // Créer un nouvel abonnement
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        type: 'STANDARD',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        active: true,
        lastPaymentDate: new Date()
      }
    });

    // Vérifier le résultat
    const updatedUser = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
      include: {
        subscription: true
      }
    });

    console.log('Abonnement ajouté avec succès:', subscription);
    console.log('Utilisateur mis à jour:', updatedUser);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'abonnement:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
