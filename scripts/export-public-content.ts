import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import prisma from "../lib/prisma";

async function main() {
  const outputDir = join(process.cwd(), "lib", "content");

  const [posts, events] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
    prisma.event.findMany({
      where: { status: { not: "canceled" } },
      orderBy: { date: "asc" },
    }),
  ]);

  const staticPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category?.name || "Technologie",
    publishedAt: post.publishedAt!.toISOString(),
    readingTime: post.readingTime ?? 1,
    ...(post.thumbnail ? { thumbnail: post.thumbnail } : {}),
    ...(post.seoTitle ? { seoTitle: post.seoTitle } : {}),
    ...(post.seoDescription ? { seoDescription: post.seoDescription } : {}),
    contentHtml: post.content,
  }));

  const staticEvents = events.map((event) => ({
    slug: event.slug,
    title: event.title,
    description: event.description,
    date: event.date.toISOString(),
    type: event.type,
    platform: event.platform,
    ...(event.eventUrl ? { eventUrl: event.eventUrl } : {}),
    ...(event.registrationLink ? { registrationLink: event.registrationLink } : {}),
    ...(event.thumbnail ? { thumbnail: event.thumbnail } : {}),
    featured: event.isFeatured && event.status === "upcoming",
  }));

  await Promise.all([
    writeFile(join(outputDir, "posts.json"), `${JSON.stringify(staticPosts, null, 2)}\n`, "utf8"),
    writeFile(join(outputDir, "events.json"), `${JSON.stringify(staticEvents, null, 2)}\n`, "utf8"),
  ]);

  console.info(`Export terminé : ${staticPosts.length} articles publiés et ${staticEvents.length} événements.`);
  console.info("Vérifiez les fichiers JSON générés et committez-les avant de retirer la base de données.");
}

main()
  .catch((error) => {
    console.error("Échec de l'export du contenu public.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
