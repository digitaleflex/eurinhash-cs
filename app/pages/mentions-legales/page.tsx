export default function MentionsLegales() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-20 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Mentions légales
      </h1>

      <section className="max-w-4xl space-y-6 text-lg text-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Éditeur du site
          </h2>
          <p>
            Le présent site <strong>EurinHash.com</strong> est édité par :<br />
            <strong>E-FLEX / Eurin HASH</strong>
            <br />
            Siège social : Cotonou, Bénin
            <br />
            Email :{" "}
            <a
              href="mailto:eurinhash@gmail.com"
              className="underline text-blue-300"
            >
              eurinhash@gmail.com
            </a>
            <br />
            Téléphone : +229 01 62 26 5246
            <br />
            Responsable de la publication : Eurin HASH
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            Site web :{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300"
            >
              vercel.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Propriété intellectuelle
          </h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, logos,
            vidéos, éléments graphiques, code, etc.) sont la propriété exclusive
            de E-FLEX ou font l'objet d'une licence d'utilisation. Toute
            reproduction ou représentation, totale ou partielle, sans
            autorisation expresse est interdite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Données personnelles
          </h2>
          <p>
            Les données collectées via ce site (formulaires, cookies) sont
            traitées dans le respect de la réglementation en vigueur. Aucune
            donnée personnelle ne sera vendue ou cédée à des tiers sans votre
            consentement.
            <br />
            Pour toute demande relative à vos données, vous pouvez nous écrire à
            :{" "}
            <a
              href="mailto:rgpd@eurinhash.com"
              className="underline text-blue-300"
            >
              rgpd@eurinhash.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Cookies</h2>
          <p>
            Ce site utilise des cookies afin d'améliorer l'expérience
            utilisateur et d'analyser le trafic. Vous pouvez accepter ou refuser
            les cookies en configurant vos préférences dans votre navigateur.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Conditions d'utilisation
          </h2>
          <p>
            En naviguant sur ce site, l'utilisateur accepte les présentes
            mentions légales et s'engage à les respecter. Le contenu du site
            peut être modifié à tout moment sans préavis.
          </p>
        </div>
      </section>
    </main>
  );
}
