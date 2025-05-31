export default function CGU() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 hero-title text-center">Conditions Générales d’Utilisation</h1>
      <section className="max-w-3xl space-y-6 text-lg text-gray-200">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Objet</h2>
          <p>
            Les présentes CGU définissent les règles d’utilisation du site EurinHash.com. En naviguant sur ce site, vous acceptez ces conditions sans réserve.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Accès au site</h2>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant d’un accès internet. Certains services peuvent nécessiter une inscription.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
          <p>
            Tous les contenus du site (textes, images, logos, code) sont protégés. Toute reproduction sans autorisation est interdite.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Responsabilité</h2>
          <p>
            EurinHash ne saurait être tenu responsable des dommages directs ou indirects liés à l’utilisation du site ou à l’impossibilité d’y accéder.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">5. Données personnelles</h2>
          <p>
            Voir notre <a href="/pages/confidentialite" className="underline text-blue-300">politique de confidentialité</a> pour plus d’informations sur la gestion de vos données.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">6. Modification des CGU</h2>
          <p>
            EurinHash se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
          <p>
            Pour toute question, contactez-nous à <a href="mailto:eurinhash@gmail.com" className="underline text-blue-300">eurinhash@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}