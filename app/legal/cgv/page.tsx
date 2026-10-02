import { LegalPage } from '../../../components/legal-page';
import type { Metadata } from 'next';

export const revalidate = 86400; // Revalider toutes les 24 heures (ISR)

export const metadata: Metadata = {
  title: 'CGV - Conditions Générales de Vente',
  description: 'Conditions Générales de Vente des prestations de E-FLEX - Devis, délais, paiement et propriété intellectuelle.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <LegalPage
      title="Conditions Générales de Vente"
      description="Règles applicables aux prestations fournies par E-FLEX."
      lastUpdated="21 Mars 2026"
      toc={[
        { id: 'devis', label: '1. Devis et commandes' },
        { id: 'delais', label: '2. Délais et livrables' },
        { id: 'paiement', label: '3. Paiement' },
        { id: 'pi', label: '4. Propriété intellectuelle' },
        { id: 'resp', label: '5. Responsabilités' },
        { id: 'resiliation', label: '6. Résiliation' },
        { id: 'droit', label: '7. Droit applicable' },
      ]}
    >
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les
        prestations proposées par <strong>E-FLEX</strong> dans le cadre de ses
        activités (services numériques, formations, hébergement et
        accompagnement technique).
      </p>

      <h2 id="devis">1. Devis et commandes</h2>
      <p>
        Toute prestation fait l’objet d’un devis détaillé précisant la nature
        des services, les délais indicatifs et le prix. Les devis sont
        valables <strong>30 jours</strong> à compter de leur date d’émission.
        La commande est considérée comme ferme après acceptation écrite du
        devis et versement d’un acompte de <strong>30 %</strong> du montant
        total (sauf conditions particulières).
      </p>

      <h2 id="delais">2. Délais et livrables</h2>
      <p>
        Les délais de réalisation indiqués dans le devis ou le cahier des
        charges sont donnés à titre indicatif. Les livrables (documents, sites
        web, accès logiciels, supports de formation, etc.) sont précisés dans
        le devis. E-FLEX s’engage à informer le client de toute difficulté
        susceptible de modifier les délais prévus.
      </p>

      <h2 id="paiement">3. Paiement</h2>
      <p>
        Le règlement s’effectue selon l’échéancier précisé au devis ou au
        contrat. Les moyens de paiement acceptés : virement bancaire, mobile
        money, carte bancaire (selon disponibilité). Tout retard de paiement
        entraîne, sans mise en demeure préalable, l’application de pénalités
        équivalentes à <strong>10 % du montant dû par mois de retard</strong>,
        ainsi que la suspension des prestations en cours.
      </p>

      <h2 id="pi">4. Propriété intellectuelle</h2>
      <p>
        Les créations réalisées par E-FLEX (sites, logiciels, supports
        pédagogiques, contenus) restent sa propriété jusqu’au paiement
        intégral des sommes dues. Après règlement complet, les droits
        d’utilisation sont transférés au client, sauf mention contraire dans
        le devis ou le contrat.
      </p>

      <h3>Hébergement et diffusion</h3>
      <p>
        Les services d’hébergement, de déploiement et de diffusion de contenus
        (CDN) sont assurés par <strong>Vercel Inc.</strong>. L’usage de cette
        infrastructure est limité à l’exécution et à la disponibilité des
        livrables.
      </p>

      <h2 id="resp">5. Responsabilités</h2>
      <p>
        E-FLEX s’engage à fournir ses prestations avec soin et
        professionnalisme. La responsabilité de l’éditeur ne saurait être
        engagée en cas de mauvaise utilisation des livrables par le client, ou
        de dommages indirects tels que perte de chiffre d’affaires. Le client
        reste seul responsable du contenu hébergé, diffusé ou exploité via les
        services fournis.
      </p>

      <h2 id="resiliation">6. Résiliation</h2>
      <p>
        En cas de non-respect des obligations contractuelles par l’une des
        parties, le contrat pourra être résilié de plein droit après mise en
        demeure restée sans effet pendant 15 jours. Les sommes déjà versées
        restent acquises à E-FLEX à titre de dédommagement.
      </p>

      <h2 id="droit">7. Droit applicable et juridiction compétente</h2>
      <p>
        Les présentes CGV sont soumises au droit en vigueur au Bénin. Tout
        litige relatif à leur interprétation ou à leur exécution sera porté
        devant les tribunaux compétents du ressort d’Abomey-Calavi, sauf
        disposition légale contraire.
      </p>
    </LegalPage>
  );
}
