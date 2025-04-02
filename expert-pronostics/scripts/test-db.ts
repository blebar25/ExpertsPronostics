const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // Test de requête simple
    const userCount = await prisma.user.count();
    console.log(`✅ Nombre d'utilisateurs dans la base : ${userCount}`);

    // Test de requête avec relations
    const users = await prisma.user.findMany({
      include: {
        subscriptions: true
      }
    });
    console.log('✅ Utilisateurs avec leurs abonnements :', users);

  } catch (error) {
    console.error('❌ Erreur :', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
