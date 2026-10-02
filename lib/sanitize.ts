import sanitizeHtml from 'sanitize-html';

/**
 * Politique de sanitization unique pour le HTML riche stocké (TipTap).
 * Appliquée côté serveur au moment du rendu — jamais uniquement côté client.
 * N'autorise que les balises/attributs produits par components/blog/Editor.tsx.
 */
export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      // Structure (StarterKit)
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
      'hr', 'br',
      // Formatage inline
      'strong', 'b', 'em', 'i', 's', 'del', 'u', 'mark',
      // Liens et images (Link / Image)
      'a', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
      code: ['class'],
      pre: ['class'],
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    allowedSchemesByTag: {
      img: ['https', 'http'],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'noopener noreferrer nofollow',
      }),
    },
    disallowedTagsMode: 'discard',
  });
}
