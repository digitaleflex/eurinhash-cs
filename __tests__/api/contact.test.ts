import { POST } from '@/app/api/contact/route';
import { prismaApi } from '@/lib/prisma-api';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('@/lib/prisma-api', () => ({
  prismaApi: {
    contactMessage: {
      create: jest.fn(),
    },
  },
}));

// Cast pour TypeScript
const mockPrisma = prismaApi as any;

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates contact message successfully', async () => {
    const mockContactMessage = {
      id: 'test-id',
      createdAt: new Date(),
    };

    mockPrisma.contactMessage.create.mockResolvedValue(mockContactMessage);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Message transmis avec succès.');
    expect(mockPrisma.contactMessage.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      },
      cacheStrategy: { swr: 60, ttl: 60 },
    });
  });

  it('returns error for missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        // Missing email and message
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Données invalides');
  });

  it('returns error for invalid email format', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Données invalides');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.stringContaining('invalide')
      ])
    );
  });

  it('handles database errors', async () => {
    mockPrisma.contactMessage.create.mockRejectedValue(
      new Error('Database error')
    );

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Échec de la transmission du message.');
  });
});
