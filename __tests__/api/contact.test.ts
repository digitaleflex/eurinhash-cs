import { POST } from '@/app/api/contact/route'
import { prisma } from '@/lib/prisma'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    contactMessage: {
      create: jest.fn(),
    },
  },
}))

const mockPrisma = prisma as jest.Mocked<typeof prisma>

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates contact message successfully', async () => {
    const mockContactMessage = {
      id: 'test-id',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockPrisma.contactMessage.create.mockResolvedValue(mockContactMessage)

    const request = new Request('http://localhost:3000/api/contact', {
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
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(data.id).toBe('test-id')
    expect(mockPrisma.contactMessage.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
        status: 'new',
      },
      select: {
        id: true,
        createdAt: true,
      },
    })
  })

  it('returns error for missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        // Missing email and message
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Tous les champs obligatoires doivent être remplis')
  })

  it('returns error for invalid email format', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Format d\'email invalide')
  })

  it('handles database errors', async () => {
    mockPrisma.contactMessage.create.mockRejectedValue(new Error('Database error'))

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Database error')
  })
})
