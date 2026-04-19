import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const emails = ['eurinhash.works@gmail.com', 'eflexcloud@gmail.com'];
  
  for (const email of emails) {
    try {
      const updated = await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
      });
      console.log('Granted ADMIN role to:', updated.email);
    } catch (err) {
      console.warn(`Could not update user ${email}: User may not exist yet.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
