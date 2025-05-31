export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4">
      <h1 className="text-6xl font-bold mb-4 hero-title">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page non trouvée</h2>
      <p className="text-lg text-gray-200 mb-8 text-center">Oups, la page que vous cherchez n'existe pas ou a été déplacée.</p>
      <a href="/" className="btn-primary">Retour à l'accueil</a>
    </main>
  );
} 