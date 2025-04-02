import prisma from '@/lib/prisma';

async function main() {
  try {
    // Vérifier la connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connexion à la base de données établie');

    // Compter le nombre total d'utilisateurs
    const userCount = await prisma.user.count();
    console.log('📊 Nombre total d\'utilisateurs:', userCount);

    // Récupérer tous les utilisateurs avec leurs abonnements
    const users = await prisma.user.findMany({
      include: {
        subscription: true
      }
    });
    console.log('👥 Utilisateurs trouvés:', users);

    // Compter le nombre total d'abonnements
    const subscriptionCount = await prisma.subscription.count();
    console.log('📊 Nombre total d\'abonnements:', subscriptionCount);

    // Récupérer tous les abonnements
    const subscriptions = await prisma.subscription.findMany();
    console.log('🎫 Abonnements trouvés:', subscriptions);

    // Afficher un résumé
    console.log('\n📑 Résumé:');
    console.log(`- ${userCount} utilisateurs`);
    console.log(`- ${subscriptionCount} abonnements`);

    // Afficher les détails de chaque utilisateur
    console.log('\n👤 Détails des utilisateurs:');
    users.forEach(user => {
      console.log(`\nUtilisateur: ${user.email}`);
      if (user.subscription) {
        console.log(`- Abonnement: ${user.subscription.type}`);
        console.log(`- Actif: ${user.subscription.active}`);
        console.log(`- Expire le: ${user.subscription.endDate}`);
      } else {
        console.log('- Pas d\'abonnement');
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors du test de la base de données:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
