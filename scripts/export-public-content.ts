import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import prisma from "../lib/prisma";

async function main() {
  const outputDir = join(process.cwd(), "lib", "content");

  const posts = await prisma.post.findMany({
    where: { published: true, publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

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



  await writeFile(
    join(outputDir, "posts.json"),
    `${JSON.stringify(staticPosts, null, 2)}\n`,
    "utf8",
  );

  console.info(`Export terminé : ${staticPosts.length} articles publiés.`);
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
