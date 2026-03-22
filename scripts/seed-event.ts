import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      title: 'Architecture Microservices & Next.js 15',
      slug: 'architecture-microservices-nextjs-15',
      description: 'Découvrez comment nous construisons des systèmes résilients et hautement performants avec les dernières avancées du cloud et de Next.js.',
      date: new Date('2026-04-15T18:00:00Z'),
      type: 'Live',
      platform: 'YouTube',
      eventUrl: 'https://youtube.com/live/example',
      isFeatured: true,
      status: 'upcoming',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070',
    },
  });
  console.log('Created test event:', event.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
