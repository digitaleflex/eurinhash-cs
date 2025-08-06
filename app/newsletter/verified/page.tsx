import { FaCheckCircle, FaEnvelope, FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function EmailVerified() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-[#1A1F3C]/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-[#00C48C]/20">
          
          {/* Icône de succès */}
          <div className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] p-6 rounded-full mb-8 w-fit mx-auto">
            <FaCheckCircle className="text-5xl text-white" />
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00C48C] to-[#007CF0] bg-clip-text text-transparent">
            Email Vérifié !
          </h1>

          {/* Message de confirmation */}
          <div className="mb-8">
            <p className="text-xl text-gray-200 mb-4">
              Félicitations ! Votre adresse email a été vérifiée avec succès.
            </p>
            <p className="text-lg text-gray-300">
              Vous êtes maintenant inscrit(e) à nos newsletters et recevrez bientôt 
              nos contenus exclusifs directement dans votre boîte mail.
            </p>
          </div>

          {/* Avantages */}
          <div className="bg-gradient-to-r from-[#00C48C]/10 to-[#007CF0]/10 p-6 rounded-2xl border border-[#00C48C]/20 mb-8">
            <h3 className="text-lg font-semibold text-[#00C48C] mb-4 flex items-center justify-center gap-2">
              <FaEnvelope className="text-lg" />
              Ce qui vous attend
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>✅ Contenus exclusifs sur la cybersécurité et le cloud</li>
              <li>✅ Accès anticipé aux nouvelles formations</li>
              <li>✅ Invitations aux masterclass et événements</li>
              <li>✅ Ressources et outils professionnels gratuits</li>
              <li>✅ Conseils d'experts et retours d'expérience</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] hover:from-[#00C48C]/80 hover:to-[#007CF0]/80 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <FaHome className="text-lg" />
              Retour à l'accueil
            </Link>
            
            <Link
              href="/formation"
              className="bg-transparent border-2 border-[#007CF0] hover:bg-[#007CF0]/10 px-8 py-4 rounded-xl font-bold text-[#007CF0] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Découvrir nos formations
            </Link>
          </div>

          {/* Note */}
          <div className="mt-8 text-sm text-gray-400">
            <p>
              Vous ne trouvez pas nos emails ? Pensez à vérifier votre dossier spam 
              et à ajouter notre adresse à vos contacts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}