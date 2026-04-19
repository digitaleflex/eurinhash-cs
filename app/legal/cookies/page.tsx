import { LegalPage } from '@/components/legal-page';
import type { Metadata } from 'next';

export const revalidate = 86400; // Revalider toutes les 24 heures (ISR)

export const metadata: Metadata = {
  title: 'Gestion des cookies - Eurin Hash',
  description: 'Politique de gestion des cookies du site eurinhash.com - État actuel et contrôle par l\'utilisateur.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Gestion des cookies"
      description="État actuel et évolutions prévues concernant les cookies utilisés sur le site."
      lastUpdated="21 Mars 2026"
      toc={[
        { id: 'etat', label: 'État actuel' },
        { id: 'evolutions', label: 'Évolutions futures' },
        { id: 'controle', label: 'Contrôle par l’utilisateur' },
        { id: 'contact', label: 'Contact' },
      ]}
    >
      <p>
        Actuellement, le site <strong>eurinhash.com</strong> n’utilise pas de
        cookies ou autres traceurs à des fins de suivi, d’analyse ou de
        personnalisation.
      </p>

      <h2 id="evolutions">Évolutions futures</h2>
      <p>
        Dans un futur proche, certains cookies pourront être utilisés
        notamment en cas de mise en place d’une{' '}
        <strong>connexion utilisateur</strong> ou de services nécessitant la
        mémorisation de vos préférences. Cette page sera alors mise à jour
        afin de détailler :
      </p>
      <ul>
        <li>
          Les types de cookies utilisés (essentiels, performance,
          personnalisation, etc.).
        </li>
        <li>
          Les finalités précises (authentification, sécurité, mesure
          d’audience, etc.).
        </li>
        <li>La durée de conservation et vos droits de paramétrage.</li>
      </ul>
      <p>
        Le site est hébergé et diffusé via l’infrastructure de{' '}
        <strong>Vercel Inc.</strong>
        (CDN et Edge Network). Si des cookies techniques ou de performance
        propres à Vercel sont requis, ils seront listés ici avec leurs
        finalités.
      </p>

      <h2 id="controle">Contrôle par l’utilisateur</h2>
      <p>
        Vous conservez à tout moment la possibilité de gérer ou supprimer les
        cookies directement depuis les paramètres de votre navigateur
        internet. En cas de mise en place de cookies spécifiques, un bandeau
        d’information et un module de gestion des préférences seront proposés
        sur le site.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Pour toute question relative à l’utilisation future des cookies, vous
        pouvez nous écrire à :
        <a href="mailto:contact@eurinhash.com"> contact@eurinhash.com</a>.
      </p>
    </LegalPage>
  );
}
