const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  console.log('Testing connection with:', connectionString.split('@')[1]); // Hide password
  
  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    const prisma = new PrismaClient({ adapter });

    const result = await prisma.user.findFirst();
    console.log('✅ Connection successful! Found user:', result?.email);
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error);
  }
}

testConnection();
