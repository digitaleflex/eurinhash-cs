/**
 * @jest-environment node
 */
const findManyMock = jest.fn();
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    post: { findMany: (...args: unknown[]) => findManyMock(...args) },
  },
}));

import sitemap from './sitemap';

describe('sitemap', () => {
  beforeEach(() => findManyMock.mockReset());

  it('includes static public routes and published posts', async () => {
    findManyMock.mockResolvedValue([
      {
        slug: 'architecture-logicielle',
        updatedAt: new Date('2026-01-02'),
        publishedAt: new Date('2026-01-01'),
      },
    ]);

    const entries = await sitemap();
    const urls = entries.map(entry => entry.url);

    expect(urls).toContain('https://eurinhash.com/');
    expect(urls).toContain('https://eurinhash.com/services/audit');
    expect(urls).toContain(
      'https://eurinhash.com/blog/architecture-logicielle'
    );
    expect(
      urls.some(url => url.includes('/admin') || url.includes('/dashboard'))
    ).toBe(false);
  });

  it('filters unpublished posts in the database query', async () => {
    findManyMock.mockResolvedValue([]);
    await sitemap();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { published: true, publishedAt: { not: null } },
      })
    );
  });

  it('still serves static routes when the database is unavailable', async () => {
    findManyMock.mockRejectedValue(new Error('db down'));

    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0);
  });
});
