import { Mail, LinkedinIcon, GithubIcon, Zap, Send, MessageCircle, Calendar, Coffee, ArrowRight, CheckCircle, Clock, Users, MapPin, MessageSquare } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { FAQSection, contactFAQData } from "@/components/faq-section";

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.06),transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            Parlons de votre projet
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Transformons vos idées
            <br />
            <span className="text-accent">en réalité</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Que vous ayez un projet ambitieux, une question technique ou simplement envie d'échanger,
            je suis là pour vous accompagner dans votre réussite.
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
          <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-1">24h</div>
            <div className="text-sm text-muted-foreground">Temps de réponse</div>
          </div>

          <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Projets réalisés</div>
          </div>

          <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <Coffee className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-1">30min</div>
            <div className="text-sm text-muted-foreground">Consultation gratuite</div>
          </div>

          <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction client</div>
          </div>

          <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-lg font-bold text-blue-500 mb-1">Bénin</div>
            <div className="text-sm text-muted-foreground">Abomey-Calavi</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Formulaire de contact - Plus large */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-3xl border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Send className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Envoyez-moi un message</h2>
                  <p className="text-muted-foreground">Je vous réponds personnellement sous 24h</p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>

          {/* Sidebar avec infos et photo */}
          <div className="space-y-8">
            {/* Photo et intro */}
            <div className="p-6 rounded-3xl border border-foreground/10 bg-background/80 backdrop-blur-sm text-center">
              <div className="relative h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg">
                <Image
                  src="/eurin-photo.webp"
                  alt="Eurin Hash - Consultant IT"
                  fill
                  className="object-cover object-center"
                  sizes="96px"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Eurin Hash</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Consultant IT & Entrepreneur Numérique
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-accent mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Disponible pour nouveaux projets
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Abomey-Calavi, Bénin
              </div>
            </div>

            {/* Moyens de contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Contactez-moi directement</h3>

              <a
                href="mailto:contact@eurinhash.com"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-foreground/10 bg-background/50 hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium group-hover:text-accent transition-colors">Email</div>
                  <div className="text-sm text-muted-foreground">contact@eurinhash.com</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="https://linkedin.com/in/eurinalmeida"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-foreground/10 bg-background/50 hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <LinkedinIcon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium group-hover:text-accent transition-colors">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">Réseau professionnel</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="https://wa.me/2290162265246?text=Bonjour%20Eurin,%20je%20souhaiterais%20discuter%20d'un%20projet%20avec%20vous."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-foreground/10 bg-background/50 hover:bg-green-500/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium group-hover:text-green-500 transition-colors">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">+229 01 62 26 52 46</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="https://github.com/digitaleflex"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-foreground/10 bg-background/50 hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <GithubIcon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium group-hover:text-accent transition-colors">GitHub</div>
                  <div className="text-sm text-muted-foreground">Code & projets</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Avantages */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-accent">Consultation gratuite</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  30 minutes d'échange pour analyser votre projet et vous conseiller.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-500">Réponse rapide</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Réponse garantie sous 24h, souvent bien plus rapide !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <FAQSection items={contactFAQData} />
    </main>
  );
}