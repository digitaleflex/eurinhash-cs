import { LegalPage } from '@/components/legal-page';

import type { Metadata } from 'next';

export const revalidate = 86400; // Revalider toutes les 24 heures (ISR)

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Eurin Hash',
  description: 'Politique de confidentialité du site eurinhash.com - Collecte, utilisation et protection de vos données personnelles.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Collecte, utilisation, conservation des données et droits des utilisateurs."
      lastUpdated="21 Mars 2026"
      toc={[
        { id: 'donnees', label: 'Données collectées' },
        { id: 'finalites', label: 'Finalités du traitement' },
        { id: 'duree', label: 'Durée de conservation' },
        { id: 'partage', label: 'Partage des données' },
        { id: 'droits', label: 'Vos droits' },
        { id: 'cookies', label: 'Cookies' },
        { id: 'securite', label: 'Sécurité' },
        { id: 'droit', label: 'Droit applicable' },
      ]}
    >
      <p>
        La présente politique de confidentialité a pour objectif d’informer
        les utilisateurs du site{' '}
        <strong>eurinhash.com</strong> sur la collecte, l’utilisation et la
        protection de leurs données personnelles.
      </p>

      <h2 id="donnees">Données collectées</h2>
      <p>
        Lors de l’utilisation du site, les données suivantes peuvent être
        collectées :
      </p>
      <ul>
        <li>
          Informations transmises via le formulaire de contact : nom, adresse
          email, sujet, message.
        </li>
        <li>
          Données techniques : adresse IP, type de navigateur, pages
          consultées (via outils d’analyse de trafic).
        </li>
        <li>
          Éventuellement, cookies ou traceurs (voir section « Cookies »).
        </li>
      </ul>

      <h2 id="finalites">Finalités du traitement</h2>
      <p>
        Les données personnelles collectées sont utilisées exclusivement pour
        :
      </p>
      <ul>
        <li>Répondre aux demandes envoyées via le formulaire de contact.</li>
        <li>Assurer le suivi administratif ou commercial si nécessaire.</li>
        <li>Améliorer la qualité du site et des services proposés.</li>
      </ul>

      <h2 id="duree">Durée de conservation</h2>
      <p>
        Les données sont conservées uniquement pendant la durée nécessaire aux
        finalités pour lesquelles elles ont été collectées, et au maximum 3
        ans après le dernier contact, sauf obligation légale contraire.
      </p>

      <h2 id="partage">Partage des données</h2>
      <p>
        Aucune donnée personnelle n’est cédée ou vendue à des tiers. Les
        informations collectées peuvent être partagées uniquement avec des
        prestataires techniques (hébergeur, outils d’emailing, outils
        analytiques), dans le strict cadre du fonctionnement du site.
      </p>
      <p>
        À ce titre, l’hébergement et le déploiement sont assurés par{' '}
        <strong>Vercel Inc.</strong> (CDN et Edge Network). Vercel agit en
        qualité de <em>sous‑traitant</em> technique pour fournir
        l’infrastructure d’exécution et de diffusion.
      </p>

      <h2 id="droits">Vos droits</h2>
      <p>
        Conformément à la réglementation en vigueur, vous disposez des droits
        suivants :
      </p>
      <ul>
        <li>Droit d’accès à vos données personnelles.</li>
        <li>
          Droit de rectification si elles sont inexactes ou incomplètes.
        </li>
        <li>Droit de suppression (« droit à l’oubli »).</li>
        <li>Droit d’opposition ou de limitation du traitement.</li>
      </ul>
      <p>
        Pour exercer vos droits, vous pouvez adresser une demande à l'adresse
        suivante :{' '}
        <a href="mailto:contact@eurinhash.com">contact@eurinhash.com</a>.
      </p>


      <h2 id="cookies">Cookies</h2>
      <p>
        Le site peut utiliser des cookies afin d’améliorer l’expérience
        utilisateur, mesurer l’audience et optimiser les contenus proposés.
        Vous pouvez configurer votre navigateur pour refuser ou limiter
        l’enregistrement de cookies.
      </p>

      <h2 id="securite">Sécurité</h2>
      <p>
        Des mesures techniques et organisationnelles appropriées sont mises en
        place pour protéger vos données personnelles contre la perte,
        l’altération ou l’accès non autorisé.
      </p>

      <h2 id="droit">Droit applicable</h2>
      <p>
        La présente politique est régie par le droit en vigueur au Bénin. En
        cas de litige, et à défaut de résolution amiable, les tribunaux
        compétents seront saisis.
      </p>
    </LegalPage>
  );
}
