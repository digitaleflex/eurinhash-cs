import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Démarrage de la sauvegarde de la base de données...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

  try {
    const [users, posts, events, messages, registrations] = await Promise.all([
      prisma.user.findMany(),
      prisma.post.findMany(),
      prisma.event.findMany(),
      prisma.contactMessage.findMany(),
      prisma.eventRegistration.findMany(),
    ]);

    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        users,
        posts,
        events,
        messages,
        registrations,
      },
    };

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Sauvegarde réussie : ${backupFile}`);
    console.log(`📊 Statistiques : 
      - ${users.length} Utilisateurs
      - ${posts.length} Articles
      - ${events.length} Événements
      - ${messages.length} Messages
      - ${registrations.length} Inscriptions`);
      
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde :', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
