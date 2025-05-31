export default function Confidentialite() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 hero-title text-center">Politique de confidentialité</h1>
      <section className="max-w-3xl space-y-6 text-lg text-gray-200">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Collecte des données</h2>
          <p>
            Nous collectons uniquement les données strictement nécessaires à l’amélioration de nos services : email, nom, domaine d’intérêt, consentement explicite. Aucune donnée sensible n’est collectée à votre insu.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
          <p>
            Vos données sont utilisées exclusivement pour : <br />
            - L’envoi de newsletters et d’informations sur EurinHash<br />
            - L’analyse statistique anonyme de la fréquentation du site<br />
            - La gestion de votre consentement
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Partage et sécurité</h2>
          <p>
            Vos données ne sont jamais vendues ni cédées à des tiers. Elles sont stockées de façon sécurisée (base de données chiffrée, accès restreint). Nous mettons tout en œuvre pour garantir leur confidentialité.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Vos droits</h2>
          <p>
            Conformément au RGPD, vous pouvez à tout moment demander l’accès, la rectification ou la suppression de vos données en écrivant à <a href="mailto:rgpd@eurinhash.com" className="underline text-blue-300">rgpd@eurinhash.com</a>.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l’expérience utilisateur et mesurer l’audience. Vous pouvez les refuser via les paramètres de votre navigateur.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
          <p>
            Pour toute question sur la gestion de vos données, contactez-nous à <a href="mailto:eurinhash@gmail.com" className="underline text-blue-300">eurinhash@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}