/**
 * Articles publics versionnés dans Git.
 *
 * Avant de retirer la base de production, exporter les articles publiés depuis
 * la base existante vers ce format. Ne pas inventer de contenu ni supprimer
 * les enregistrements d'origine pendant la migration.
 */
export type PostSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type StaticPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: PostSection[];
};

/**
 * Les articles historiques doivent être exportés depuis la base avant la mise
 * en production de cette migration. Tableau laissé vide volontairement :
 * aucune donnée de production n'a été disponible pour être migrée fidèlement.
 */
export const posts: StaticPost[] = [];

export function getPublishedPost(slug: string): StaticPost | undefined {
  return posts.find((post) => post.slug === slug);
}
