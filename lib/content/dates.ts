/**
 * Formatage déterministe des dates éditoriales.
 *
 * `toLocaleDateString('fr-FR')` dépend du fuseau horaire du serveur et peut
 * afficher la veille ou le lendemain pour une date stockée en UTC. On
 * normalise ici : la partie date (`YYYY-MM-DD`) est interprétée en UTC et le
 * rendu force `timeZone: 'UTC'`, quel que soit l'environnement d'exécution.
 */
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})/;

const publishedDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function parsePublishedDate(value: string): Date {
  const match = DATE_ONLY.exec(value);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

/** Date affichée, par exemple « 20 octobre 2026 ». */
export function formatPublishedDate(value: string): string {
  return publishedDateFormatter.format(parsePublishedDate(value));
}

/** Attribut `dateTime` HTML stable (`YYYY-MM-DD`). */
export function toPublishedDateString(value: string): string {
  return parsePublishedDate(value).toISOString().slice(0, 10);
}

/** Date ISO complète et stable pour JSON-LD et sitemap. */
export function toPublishedISOString(value: string): string {
  return parsePublishedDate(value).toISOString();
}
