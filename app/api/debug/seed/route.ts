import { NextResponse } from 'next/server';
import prismaApi from '@/lib/prisma-api';

const prisma = prismaApi;

export async function GET() {
  try {
    // 1. Nettoyage (Optionnel, décoché par défaut pour sécurité)
    // await (prisma as any).post.deleteMany();

    // 2. Création des articles de validation
    const posts = [
      {
        title: "L'Architecture Clean avec Next.js 15 : Guide Ultime",
        slug: "architecture-clean-nextjs-15",
        excerpt: "Comment structurer un projet d'envergure pour garantir scalabilité et maintenabilité sur le long terme.",
        content: `
          <h2>Pourquoi l'architecture compte ?</h2>
          <p>Dans le développement moderne, la vitesse est souvent privilégiée au détriment de la structure. Cependant, pour Eurin Hash, nous prônons la <strong>Souveraineté Technique</strong>.</p>
          <blockquote>"Une bonne architecture permet de retarder les décisions difficiles." - Robert C. Martin</blockquote>
          <h3>Les 3 piliers de notre approche :</h3>
          <ul>
            <li><strong>Modularité :</strong> Séparer la logique métier de l'infrastructure.</li>
            <li><strong>Testabilité :</strong> Utiliser l'injection de dépendances pour des tests unitaires robustes.</li>
            <li><strong>Performance :</strong> Exploiter les Server Components pour un rendu ultra-rapide.</li>
          </ul>
          <p>En utilisant Next.js 15, nous pouvons isoler nos actions serveur et nos services pour créer une base de code indestructible.</p>
        `,
        published: true,
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
        readingTime: 8,
        seoTitle: "Guide Architecture Next.js 15 | Eurin Hash",
        seoDescription: "Découvrez comment implémenter une architecture Clean dans vos projets Next.js 15 pour une scalabilité maximale.",
      },
      {
        title: "Cybersécurité : Protéger vos API Next.js en 2026",
        slug: "cybersecurite-api-nextjs-2026",
        excerpt: "Les nouvelles menaces et les meilleures pratiques pour sécuriser vos endpoints et vos données sensibles.",
        content: `
          <h2>Le paysage des menaces a changé</h2>
          <p>Avec l'avènement des IA génératives, les attaques par injection et le brute force sont devenus plus sophistiqués.</p>
          <h3>Nos recommandations de sécurité :</h3>
          <ol>
            <li><strong>Rate Limiting :</strong> Indispensable pour contrer les bots.</li>
            <li><strong>Validation stricte :</strong> Utilisation de Zod pour chaque requête entrante.</li>
            <li><strong>Auth de pointe :</strong> Transition vers les Passkeys et WebAuthn.</li>
          </ol>
          <p>La sécurité n'est pas un produit, c'est un processus continu qui commence dès la première ligne de code.</p>
        `,
        published: true,
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        readingTime: 6,
        seoTitle: "Sécurité API Next.js | Expertise Eurin Hash",
        seoDescription: "Apprenez à sécuriser vos applications web contre les menaces modernes avec les protocoles de 2026.",
      }
    ];

    // On récupère le premier admin pour l'auteur
    const admin = await (prisma as any).user.findFirst({ where: { role: 'admin' } });

    if (!admin) {
      return NextResponse.json({ error: "Aucun admin trouvé pour être l'auteur." }, { status: 404 });
    }

    for (const post of posts) {
      await (prisma as any).post.upsert({
        where: { slug: post.slug },
        update: post,
        create: {
          ...post,
          authorId: admin.id,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Articles de validation créés !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors du seeding" }, { status: 500 });
  }
}
