import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export default function BlogPage() {
  // Articles de blog (tu pourras les remplacer par tes vrais articles)
  const articles = [
    {
      id: 1,
      title: "Les meilleures pratiques pour sécuriser une infrastructure cloud",
      excerpt: "Découvrez les stratégies essentielles pour protéger vos applications et données dans le cloud, de la configuration réseau aux politiques d'accès.",
      date: "2024-12-15",
      readTime: "8 min",
      category: "Cloud & Sécurité",
      slug: "securiser-infrastructure-cloud"
    },
    {
      id: 2,
      title: "Docker et Traefik : Le duo parfait pour vos déploiements",
      excerpt: "Comment orchestrer vos conteneurs avec Docker et automatiser le routage avec Traefik pour des déploiements simples et scalables.",
      date: "2024-12-10",
      readTime: "12 min",
      category: "DevOps",
      slug: "docker-traefik-deploiements"
    },
    {
      id: 3,
      title: "Next.js 15 : Les nouveautés qui changent la donne",
      excerpt: "Analyse des nouvelles fonctionnalités de Next.js 15 et leur impact sur le développement d'applications web modernes.",
      date: "2024-12-05",
      readTime: "6 min",
      category: "Développement",
      slug: "nextjs-15-nouveautes"
    }
  ];

  const categories = ["Tous", "Cloud & Sécurité", "DevOps", "Développement", "Formation"];

  return (
    <main className="relative isolate">
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partage d'expériences, tutoriels techniques et réflexions sur l'évolution 
            du développement web et des technologies cloud.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "Tous"
                  ? "bg-accent text-white"
                  : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Liste des articles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-accent/40">
                  <Tag className="h-12 w-12" />
                </div>
              </div>
              
              <div className="p-6">
                {/* Catégorie */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                    {article.category}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>

                {/* Extrait */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Métadonnées */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Lien de lecture */}
                <a
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  Lire l'article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Message si pas d'articles */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Tag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bientôt des articles</h3>
            <p className="text-muted-foreground">
              Je prépare du contenu de qualité pour partager mes expériences et connaissances.
            </p>
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-20 p-8 rounded-2xl border border-foreground/10 bg-muted text-center">
          <h3 className="text-2xl font-semibold mb-4">Restez informé</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Recevez les nouveaux articles directement dans votre boîte mail. 
            Pas de spam, juste du contenu technique de qualité.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            />
            <button className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}