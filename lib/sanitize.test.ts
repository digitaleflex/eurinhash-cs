/**
 * @jest-environment node
 */
import { sanitizeBlogHtml } from './sanitize';

describe('sanitizeBlogHtml', () => {
  it('supprime les balises script', () => {
    expect(sanitizeBlogHtml('<p>ok</p><script>alert(1)</script>')).toBe('<p>ok</p>');
  });

  it('neutralise les gestionnaires d’événements inline', () => {
    const out = sanitizeBlogHtml('<p onclick="alert(1)">x</p><img src="https://a.b/c.png" onerror="alert(2)" alt="c" />');
    expect(out).not.toContain('onclick');
    expect(out).not.toContain('onerror');
  });

  it('supprime les URLs javascript: dans les liens', () => {
    const out = sanitizeBlogHtml('<a href="javascript:alert(1)">lien</a>');
    expect(out).not.toContain('javascript:');
  });

  it('supprime les URLs data: dans les images', () => {
    const out = sanitizeBlogHtml('<img src="data:image/svg+xml;base64,AAAA" alt="x" />');
    expect(out).not.toContain('data:');
  });

  it('conserve le contenu légitime issu de l’éditeur', () => {
    const html =
      '<h2>Titre</h2><p><strong>gras</strong> <em>italic</em> <u>souligné</u></p>' +
      '<ul><li>item</li></ul><pre><code>const a = 1;</code></pre>' +
      '<blockquote>citation</blockquote><a href="https://example.com">lien</a>' +
      '<img src="https://example.com/x.png" alt="x" />';
    const out = sanitizeBlogHtml(html);
    for (const frag of ['<h2>', '<strong>', '<em>', '<u>', '<ul>', '<li>', '<pre>', '<code>', '<blockquote>', 'href="https://example.com"', 'src="https://example.com/x.png"']) {
      expect(out).toContain(frag);
    }
  });

  it('force rel noopener sur les liens', () => {
    const out = sanitizeBlogHtml('<a href="https://example.com" target="_blank">x</a>');
    expect(out).toContain('noopener');
  });
});
