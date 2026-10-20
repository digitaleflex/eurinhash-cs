import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './contact-form';

// Le popup de feedback (framer-motion + chargement dynamique) est hors du contrat testé ici.
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => null,
}));

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: 'Eurin Hash' } });
  fireEvent.change(screen.getByLabelText(/Email/), {
    target: { value: 'contact@eurinhash.com' },
  });
  fireEvent.change(screen.getByLabelText(/Message/), {
    target: { value: 'Bonjour, je souhaite un audit de mon architecture.' },
  });
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('associe les labels aux champs Nom, Email et Message', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nom/)).toHaveAttribute('name', 'name');
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('name', 'email');
    expect(screen.getByLabelText(/Message/)).toHaveAttribute('name', 'message');
  });

  it('expose le honeypot website, masqué et non tabulable', () => {
    const { container } = render(<ContactForm />);

    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute('id', 'website');
    expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  it('expose les options du sélecteur de sujet', () => {
    render(<ContactForm />);

    const select = screen.getByRole('combobox', { name: 'Sujet' });
    expect(select).toHaveAttribute('name', 'subject');

    const options = screen.getAllByRole('option').map(option => option.textContent);
    expect(options).toEqual([
      'Sélectionnez un sujet',
      'Audit de Résilience',
      'Architecture de Système',
      'Accompagnement CTO',
      'Formation & Communauté',
      'Support Technique',
      'Autre demande',
    ]);
  });

  it('soumet le formulaire au endpoint /api/contact et affiche le succès', async () => {
    const { container, unmount } = render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/ }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({ method: 'POST' })
      );
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'Eurin Hash',
      email: 'contact@eurinhash.com',
      subject: '',
      message: 'Bonjour, je souhaite un audit de mon architecture.',
      website: '',
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Envoyé !/ })).toBeInTheDocument();
    });
    expect(container.querySelector('input[name="website"]')).toHaveValue('');

    unmount();
    jest.clearAllTimers();
  });
});
