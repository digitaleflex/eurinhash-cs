/**
 * @jest-environment node
 */
import { ContactSchema } from './validation';
import { SITE_CONFIG } from './config';

const { validation } = SITE_CONFIG.forms.contact;

const validPayload = {
  name: 'Eurin Hash',
  email: 'contact@eurinhash.com',
  subject: 'Audit de Résilience',
  message: 'Bonjour, je souhaite échanger au sujet de mon architecture.',
};

describe('ContactSchema', () => {
  it('accepte un payload valide', () => {
    const result = ContactSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validPayload);
    }
  });

  it('rejette un nom trop court', () => {
    const result = ContactSchema.safeParse({ ...validPayload, name: 'A' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Le nom est trop court');
      expect(result.error.issues[0].path).toEqual(['name']);
    }
  });

  it('rejette un nom trop long', () => {
    const result = ContactSchema.safeParse({
      ...validPayload,
      name: 'a'.repeat(validation.name.maxLength + 1),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Le nom est trop long');
    }
  });

  it('rejette un email invalide', () => {
    const result = ContactSchema.safeParse({ ...validPayload, email: 'pas-un-email' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Format d'email invalide");
      expect(result.error.issues[0].path).toEqual(['email']);
    }
  });

  it('rejette un message trop court', () => {
    const result = ContactSchema.safeParse({
      ...validPayload,
      message: 'a'.repeat(validation.message.minLength - 1),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Le message est trop court');
    }
  });

  it('rejette un message trop long', () => {
    const result = ContactSchema.safeParse({
      ...validPayload,
      message: 'a'.repeat(validation.message.maxLength + 1),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Le message est trop long');
    }
  });

  it('accepte un sujet absent', () => {
    const { subject: _subject, ...withoutSubject } = validPayload;
    const result = ContactSchema.safeParse(withoutSubject);

    expect(result.success).toBe(true);
  });

  it('accepte un sujet vide', () => {
    const result = ContactSchema.safeParse({ ...validPayload, subject: '' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.subject).toBe('');
    }
  });

  it('accepte un honeypot absent', () => {
    const result = ContactSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBeUndefined();
    }
  });

  it('accepte un honeypot vide', () => {
    const result = ContactSchema.safeParse({ ...validPayload, website: '' });

    expect(result.success).toBe(true);
  });

  it('rejette un honeypot rempli (2 caractères ou plus)', () => {
    const result = ContactSchema.safeParse({ ...validPayload, website: 'http://spam' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['website']);
    }
  });
});
