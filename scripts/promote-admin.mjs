import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Afficher tous les utilisateurs existants
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log('\n📋 Utilisateurs dans la base de données:\n');
  users.forEach((u, i) => {
    console.log(`  ${i + 1}. ${u.email} — role: ${u.role ?? 'user'} — id: ${u.id}`);
  });

  // 2. Lire l'email passé en argument
  const targetEmail = process.argv[2];

  if (!targetEmail) {
    console.log('\n⚠️  Usage: node scripts/promote-admin.mjs <email>');
    console.log('   Exemple: node scripts/promote-admin.mjs admin@eurinhash.com\n');
    return;
  }

  // 3. Promouvoir l'utilisateur
  const updated = await prisma.user.update({
    where: { email: targetEmail },
    data: { role: 'admin' },
    select: { id: true, email: true, name: true, role: true },
  });

  console.log(`\n✅ Utilisateur promu avec succès:\n`);
  console.log(`   Email : ${updated.email}`);
  console.log(`   Nom   : ${updated.name}`);
  console.log(`   Rôle  : ${updated.role}`);
  console.log(`\n🔗 Accède maintenant à: http://localhost:3000/admin\n`);
}

main()
  .catch((e) => {
    console.error('\n❌ Erreur:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
