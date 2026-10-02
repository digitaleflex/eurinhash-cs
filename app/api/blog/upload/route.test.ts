/**
 * @jest-environment node
 */
import { POST } from './route';

const requireAdminMock = jest.fn();
jest.mock('@/lib/authorization', () => ({
  requireAdmin: (...args: unknown[]) => requireAdminMock(...args),
}));

const putMock = jest.fn();
jest.mock('@vercel/blob', () => ({
  put: (...args: unknown[]) => putMock(...args),
}));

const MAX = 5 * 1024 * 1024;

function request({
  contentType = 'image/png',
  declaredLength,
  body,
}: {
  contentType?: string | null;
  declaredLength?: number;
  body?: BodyInit | null;
}) {
  const headers = new Headers();
  if (contentType !== null) headers.set('content-type', contentType);
  if (declaredLength !== undefined)
    headers.set('content-length', String(declaredLength));

  return new Request('http://localhost/api/blog/upload', {
    method: 'POST',
    headers,
    body,
  });
}

const asAdmin = () =>
  requireAdminMock.mockResolvedValue({ user: { id: 'a1', role: 'admin' } });

describe('POST /api/blog/upload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    asAdmin();
    putMock.mockImplementation(async (_name: string, body: ReadableStream) => {
      // Le garde-fou de taille vit dans le TransformStream : il ne se déclenche que si
      // le corps est réellement consommé. On lit donc le flux au lecteur (sous Jest,
      // new Response(stream) renvoie un corps vide et ne déclencherait rien).
      const reader = body.getReader();
      while (!(await reader.read()).done) {
        // drainage
      }
      return { url: 'https://blob.example/blog/x.png' };
    });
  });

  it("refuse un appel anonyme avec 403 et n'écrit jamais dans le blob", async () => {
    requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

    const res = await POST(request({ body: new Uint8Array([1, 2, 3]) }));

    expect(res.status).toBe(403);
    expect(putMock).not.toHaveBeenCalled();
  });

  it('refuse un utilisateur authentifié non admin avec 403', async () => {
    requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

    const res = await POST(request({ body: new Uint8Array([1]) }));

    expect(res.status).toBe(403);
    expect(putMock).not.toHaveBeenCalled();
  });

  it.each(['application/pdf', 'image/svg+xml', 'text/html'])(
    'refuse le type %s avec 415',
    async contentType => {
      const res = await POST(
        request({ contentType, body: new Uint8Array([1]) })
      );

      expect(res.status).toBe(415);
      expect(putMock).not.toHaveBeenCalled();
    }
  );

  it('refuse un type absent avec 415', async () => {
    const res = await POST(
      request({ contentType: null, body: new Uint8Array([1]) })
    );

    expect(res.status).toBe(415);
    expect(putMock).not.toHaveBeenCalled();
  });

  it('accepte un type en majuscules avec paramètres de charset', async () => {
    const res = await POST(
      request({
        contentType: 'IMAGE/PNG; charset=binary',
        body: new Uint8Array([1, 2, 3]),
      })
    );

    expect(res.status).toBe(200);
    expect(putMock).toHaveBeenCalledWith(
      expect.stringMatching(/^blog\/[0-9a-f-]{36}\.png$/),
      expect.anything(),
      expect.objectContaining({ access: 'public', contentType: 'image/png' })
    );
  });

  it('refuse un content-length déclaré supérieur à 5 Mio sans lire le corps', async () => {
    const res = await POST(
      request({ declaredLength: MAX + 1, body: new Uint8Array([1]) })
    );

    expect(res.status).toBe(413);
    expect(putMock).not.toHaveBeenCalled();
  });

  it('refuse un flux supérieur à 5 Mio même sans content-length déclaré', async () => {
    const res = await POST(request({ body: new Uint8Array(MAX + 1024) }));

    expect(res.status).toBe(413);
  });

  it('accepte un flux juste sous la limite', async () => {
    const res = await POST(request({ body: new Uint8Array(1024) }));

    expect(res.status).toBe(200);
  });

  it('refuse un corps absent avec 400', async () => {
    const res = await POST(request({ body: null }));

    expect(res.status).toBe(400);
    expect(putMock).not.toHaveBeenCalled();
  });

  it("renvoie 500 sans divulguer le message d'erreur du blob", async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    putMock.mockRejectedValue(new Error('BLOB_READ_TOKEN invalide'));

    const res = await POST(request({ body: new Uint8Array([1]) }));
    const payload = await res.json();

    expect(res.status).toBe(500);
    expect(payload.error).toBe("Échec de l'upload");
    expect(JSON.stringify(payload)).not.toContain('BLOB_READ_TOKEN');
    consoleError.mockRestore();
  });

  it('tire le nom de fichier du type validé, jamais du client', async () => {
    await POST(
      request({ contentType: 'image/gif', body: new Uint8Array([1]) })
    );

    const target = putMock.mock.calls[0][0] as string;
    expect(target.endsWith('.gif')).toBe(true);
    expect(target).not.toContain('..');
  });
});
