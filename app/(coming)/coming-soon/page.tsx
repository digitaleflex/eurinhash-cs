export const dynamic = 'force-static';

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Bientôt disponible</h1>
        <p className="text-white/80 text-lg md:text-xl mb-8">
          Notre site est en cours de préparation. Revenez très bientôt pour découvrir EurinHash.
        </p>
        <a
          href="mailto:contact@eurinhash.com"
          className="inline-block bg-[#007CF0] hover:bg-[#0064c6] text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Nous contacter
        </a>
      </div>
    </main>
  );
}


