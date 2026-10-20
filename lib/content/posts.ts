import postData from "./posts.json";

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
  contentHtml: string;
};

/**
 * Generated from the existing database by `pnpm content:export`.
 * Export the current production data before deploying this static migration.
 */
export const posts = postData as StaticPost[];

export function getPublishedPost(slug: string): StaticPost | undefined {
  return posts.find((post) => post.slug === slug);
}
