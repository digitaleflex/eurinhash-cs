import { LegalPage } from '../../../components/legal-page';
import { Metadata } from 'next';

export const revalidate = 86400; // Revalider toutes les 24 heures (ISR)

export const metadata: Metadata = {
  title: 'Mentions légales - Eurin Hash',
  description: 'Mentions légales du site eurinhash.com - Informations sur l\'éditeur, l\'hébergement et la propriété intellectuelle.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      description="Informations relatives à l’éditeur, l’hébergement et la propriété intellectuelle."
      lastUpdated="21 Mars 2026"
      toc={[
        { id: 'editeur', label: 'Éditeur' },
        { id: 'hebergement', label: 'Hébergement' },
        { id: 'propriete', label: 'Propriété intellectuelle' },
        { id: 'responsabilite', label: 'Responsabilité' },
        { id: 'donnees', label: 'Données personnelles' },
        { id: 'droit', label: 'Droit applicable' },
      ]}
    >
      <p>
        Le présent site <strong>eurinhash.com</strong> est un site personnel
        édité par
        <strong> Eurin Hash (E-FLEX)</strong>.
      </p>

      <h2 id="editeur">Éditeur</h2>
      <p>
        <strong>Nom / Raison sociale :</strong> Eurin Hash (E-FLEX)
        <br />
        <strong>Adresse :</strong> Abomey-Calavi, Bénin
        <br />
        <strong>Email :</strong>{' '}
        <a href="mailto:contact@eurinhash.com">contact@eurinhash.com</a>
        <br />
        <strong>Téléphone :</strong> +229 01 62 26 52 46
      </p>

      <h2 id="hebergement">Hébergement</h2>
      <p>
        <strong>Hébergeur :</strong> Vercel Inc.
        <br />
        <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789,
        États‑Unis
        <br />
        <strong>Site web :</strong>{' '}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com
        </a>
        <br />
        <strong>Email support :</strong> support@vercel.com
      </p>

      <h2 id="propriete">Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus présents sur le site{' '}
        <strong>eurinhash.com</strong>
        (textes, images, graphismes, logo, vidéos, structure, code, etc.) sont
        protégés par les lois en vigueur relatives à la propriété
        intellectuelle. Toute reproduction, représentation, modification,
        publication, adaptation totale ou partielle est interdite sans
        autorisation écrite préalable de l’éditeur.
      </p>

      <h2 id="responsabilite">Responsabilité</h2>
      <p>
        L’éditeur met à disposition des informations aussi précises que
        possible, mais ne saurait être tenu responsable des omissions,
        inexactitudes ou manques de mise à jour. Le site peut contenir des
        liens vers d’autres sites dont l’éditeur n’assume aucune
        responsabilité quant au contenu.
      </p>

      <h2 id="donnees">Données personnelles</h2>
      <p>
        Les informations collectées via le site <strong>eurinhash.com</strong>
        sont destinées uniquement à un usage interne. Conformément à la
        réglementation, vous disposez d’un droit d’accès, de rectification et
        de suppression de vos données en adressant une demande à :{' '}
        <a href="mailto:contact@eurinhash.com">contact@eurinhash.com</a>.
      </p>

      <h2 id="droit">Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit en vigueur au
        Bénin. En cas de litige, et à défaut de résolution amiable, les
        tribunaux compétents seront saisis.
      </p>
    </LegalPage>
  );
}
