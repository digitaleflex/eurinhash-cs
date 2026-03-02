'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Target,
  Shield,
  Leaf,
  Zap,
  ShieldCheck,
  Smartphone,
  Users,
  RotateCcw,
  Handshake,
  ArrowRight,
  Globe,
  Code,
  Quote,
  Star,
  Rocket,
  Heart,
  Brain,
  Eye,
} from 'lucide-react';

export default function VisionPage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const quotes = [
    {
      text: 'La technologie doit se faire oublier : puissante, rapide, fluide.',
      author: 'Ma philosophie du développement',
    },
    {
      text: "L'innovation naît de la simplicité, pas de la complexité.",
      author: 'Mon approche technique',
    },
    {
      text: 'Chaque ligne de code est un pas vers un monde meilleur.',
      author: 'Ma vision du développement',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <main className="relative isolate overflow-hidden">
      {/* Hero animé avec citations rotatives */}
      <section className="relative mx-auto max-w-6xl px-6 md:px-8 py-20 sm:py-28 md:py-36 text-center">
        {/* Background animé */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-8">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Quote className="w-8 h-8 text-accent mx-auto mb-6" />
              <blockquote className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-6">
                « {quotes[currentQuote].text} »
              </blockquote>
              <p className="text-xl text-muted-foreground">
                {quotes[currentQuote].author}
              </p>
            </motion.div>
          </div>

          {/* Indicateurs de citation */}
          <div className="flex justify-center gap-2 mb-12">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentQuote ? 'bg-accent w-8' : 'bg-foreground/30'
                  }`}
              />
            ))}
          </div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="/start-project"
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Démarrer votre transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistiques impactantes */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              L&apos;impact de la technologie bien conçue
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des chiffres qui témoignent de l&apos;importance d&apos;une
              approche technique réfléchie
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                number: '3x',
                label: 'Plus rapide',
                icon: Zap,
                color: 'text-yellow-500',
              },
              {
                number: '60%',
                label: 'Moins de bugs',
                icon: ShieldCheck,
                color: 'text-green-500',
              },
              {
                number: '90%',
                label: 'Satisfaction client',
                icon: Heart,
                color: 'text-red-500',
              },
              {
                number: '24/7',
                label: 'Disponibilité',
                icon: Globe,
                color: 'text-blue-500',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 md:p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/10 hover:border-accent/30 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision détaillée avec animations */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ma Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trois piliers fondamentaux qui guident chaque décision technique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: 'Simplicité & Efficacité',
                description:
                  "La meilleure technologie est celle qu'on ne remarque pas. Elle doit être intuitive, performante et résoudre des problèmes réels sans créer de complexité inutile.",
                color: 'from-blue-500/10 to-blue-600/10',
                iconColor: 'text-blue-500',
              },
              {
                icon: Shield,
                title: 'Souveraineté Numérique',
                description:
                  'Dans un monde hyperconnecté, il est crucial de maîtriser ses outils et ses données. Je privilégie les solutions qui offrent autonomie et contrôle.',
                color: 'from-green-500/10 to-green-600/10',
                iconColor: 'text-green-500',
              },
              {
                icon: Leaf,
                title: 'Durabilité & Pérennité',
                description:
                  "Concevoir pour durer, c'est penser à long terme. Technologies éprouvées, code maintenable, architecture évolutive pour minimiser l'impact environnemental.",
                color: 'from-emerald-500/10 to-emerald-600/10',
                iconColor: 'text-emerald-500',
              },
            ].map((vision, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${vision.color} border border-foreground/10 hover:border-accent/30 transition-all duration-300 hover:scale-105 group`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div
                    className={`h-16 w-16 mx-auto mb-6 rounded-full bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <vision.icon className={`h-8 w-8 ${vision.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                    {vision.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-center">
                    {vision.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline de l'évolution technologique */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-muted to-background">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              L&apos;évolution de la technologie
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comment nous sommes passés de la complexité à la simplicité
            </p>
          </motion.div>

          {/* Version Desktop */}
          <div className="hidden md:block relative">
            {/* Ligne de temps */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent to-accent/50 rounded-full" />

            <div className="space-y-12">
              {[
                {
                  year: '2000-2010',
                  title: "L'ère de la complexité",
                  description:
                    'Technologies lourdes, interfaces compliquées, apprentissage difficile',
                  icon: Code,
                  side: 'left',
                  color: 'text-red-500',
                },
                {
                  year: '2010-2020',
                  title: 'La révolution mobile',
                  description:
                    'Naissance du mobile-first, interfaces simplifiées, accessibilité améliorée',
                  icon: Smartphone,
                  side: 'right',
                  color: 'text-yellow-500',
                },
                {
                  year: '2020-2025',
                  title: "L'ère de la simplicité",
                  description:
                    'IA intégrée, interfaces invisibles, expérience utilisateur optimale',
                  icon: Brain,
                  side: 'left',
                  color: 'text-green-500',
                },
                {
                  year: '2025+',
                  title: "L'avenir invisible",
                  description:
                    'Technologie transparente, intelligence contextuelle, expérience naturelle',
                  icon: Eye,
                  side: 'right',
                  color: 'text-blue-500',
                },
              ].map((era, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: era.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${era.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-1/2 ${era.side === 'left' ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                  >
                    <div className="bg-background p-6 rounded-2xl border border-foreground/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div
                        className={`inline-flex items-center gap-2 mb-3 ${era.side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <era.icon className={`w-5 h-5 ${era.color}`} />
                        <span className="text-sm font-semibold text-accent">
                          {era.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {era.title}
                      </h3>
                      <p className="text-muted-foreground">{era.description}</p>
                    </div>
                  </div>

                  {/* Point sur la timeline */}
                  <div className="relative z-10 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg" />

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Version Mobile */}
          <div className="md:hidden space-y-8">
            {[
              {
                year: '2000-2010',
                title: "L'ère de la complexité",
                description:
                  'Technologies lourdes, interfaces compliquées, apprentissage difficile',
                icon: Code,
                color: 'text-red-500',
                bgColor: 'from-red-500/10 to-red-600/10',
              },
              {
                year: '2010-2020',
                title: 'La révolution mobile',
                description:
                  'Naissance du mobile-first, interfaces simplifiées, accessibilité améliorée',
                icon: Smartphone,
                color: 'text-yellow-500',
                bgColor: 'from-yellow-500/10 to-yellow-600/10',
              },
              {
                year: '2020-2025',
                title: "L'ère de la simplicité",
                description:
                  'IA intégrée, interfaces invisibles, expérience utilisateur optimale',
                icon: Brain,
                color: 'text-green-500',
                bgColor: 'from-green-500/10 to-green-600/10',
              },
              {
                year: '2025+',
                title: "L'avenir invisible",
                description:
                  'Technologie transparente, intelligence contextuelle, expérience naturelle',
                icon: Eye,
                color: 'text-blue-500',
                bgColor: 'from-blue-500/10 to-blue-600/10',
              },
            ].map((era, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br ${era.bgColor} p-6 rounded-2xl border border-foreground/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {/* Ligne de connexion mobile */}
                {index < 3 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-accent to-accent/50" />
                )}

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center">
                      <era.icon className={`w-6 h-6 ${era.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {era.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {era.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {era.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principes améliorés */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Mes Principes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Six piliers qui guident chaque décision technique et créative
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Performance First',
                description:
                  'Chaque milliseconde compte. Optimisation continue pour des expériences fluides et rapides.',
                color: 'from-yellow-500/10 to-orange-500/10',
                iconColor: 'text-yellow-500',
              },
              {
                icon: ShieldCheck,
                title: 'Sécurité by Design',
                description:
                  "La sécurité n'est pas une option, c'est un prérequis intégré dès la conception.",
                color: 'from-green-500/10 to-emerald-500/10',
                iconColor: 'text-green-500',
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                description:
                  "Concevoir d'abord pour mobile garantit une expérience optimale sur tous les appareils.",
                color: 'from-blue-500/10 to-cyan-500/10',
                iconColor: 'text-blue-500',
              },
              {
                icon: Users,
                title: 'Accessibilité',
                description:
                  'La technologie doit être accessible à tous, sans exception ni discrimination.',
                color: 'from-purple-500/10 to-pink-500/10',
                iconColor: 'text-purple-500',
              },
              {
                icon: RotateCcw,
                title: 'Amélioration Continue',
                description:
                  'Itération constante, feedback utilisateur et optimisation permanente des solutions.',
                color: 'from-indigo-500/10 to-blue-500/10',
                iconColor: 'text-indigo-500',
              },
              {
                icon: Handshake,
                title: 'Collaboration',
                description:
                  'Les meilleures solutions naissent de la collaboration et du partage de connaissances.',
                color: 'from-teal-500/10 to-green-500/10',
                iconColor: 'text-teal-500',
              },
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${principle.color} border border-foreground/10 hover:border-accent/30 transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <principle.icon
                        className={`w-6 h-6 ${principle.iconColor}`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {principle.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages clients */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ce que disent mes clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des témoignages qui reflètent l&apos;impact de mon approche
              technique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote:
                  'Eurin a transformé notre vision du développement. Des solutions simples mais puissantes qui ont révolutionné notre productivité.',
                author: 'Marie K.',
                role: 'Directrice IT, Entreprise locale',
                rating: 5,
              },
              {
                quote:
                  "Une approche technique solide avec quelques points d'amélioration. Le projet a été livré dans les temps avec une qualité correcte.",
                author: 'Jean-Baptiste M.',
                role: 'CEO, Startup tech',
                rating: 4,
              },
              {
                quote:
                  'La formation dispensée par Eurin a changé la donne pour notre équipe. Des connaissances pratiques et applicables immédiatement.',
                author: 'Fatou S.',
                role: 'Responsable formation',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-4 md:p-6 rounded-2xl border border-foreground/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <blockquote className="text-foreground/80 mb-4 italic text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-foreground/10 pt-4">
                  <div className="font-semibold text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact et CTA final */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              L&apos;Impact que je veux créer
            </h2>

            <div className="space-y-8 mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mon ambition va au-delà du simple développement technique. Je
                veux contribuer à
                <strong className="text-foreground">
                  {' '}
                  former la prochaine génération de talents IT
                </strong>
                , partager les connaissances et démocratiser l'accès aux
                technologies modernes.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Chaque projet est une opportunité de créer de la valeur durable,
                d&apos;innover de manière responsable et de construire un
                écosystème technologique plus humain et plus accessible.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/start-project"
                className="group inline-flex items-center gap-3 rounded-full bg-accent text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Démarrer votre projet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-6 py-3 text-foreground font-medium transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105 active:scale-95"
              >
                <Handshake className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Discutons de votre vision
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
