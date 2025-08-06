import { FaCheckCircle, FaEnvelope, FaHome, FaUndo } from 'react-icons/fa';
import Link from 'next/link';

export default function Unsubscribed() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-[#1A1F3C]/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-[#007CF0]/20">
          
          {/* Icône */}
          <div className="bg-gradient-to-r from-[#007CF0] to-[#00C48C] p-6 rounded-full mb-8 w-fit mx-auto">
            <FaCheckCircle className="text-5xl text-white" />
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent">
            Désabonnement Confirmé
          </h1>

          {/* Message */}
          <div className="mb-8">
            <p className="text-xl text-gray-200 mb-4">
              Vous avez été désabonné(e) avec succès de nos newsletters.
            </p>
            <p className="text-lg text-gray-300">
              Nous respectons votre choix. Vous ne recevrez plus d'emails de notre part.
            </p>
          </div>

          {/* Feedback optionnel */}
          <div className="bg-[#1A1F3C]/50 p-6 rounded-2xl border border-[#007CF0]/20 mb-8">
            <h3 className="text-lg font-semibold text-[#007CF0] mb-4">
              Aidez-nous à nous améliorer
            </h3>
            <p className="text-gray-300 mb-4">
              Pourriez-vous nous dire pourquoi vous vous désabonnez ?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-[#007CF0]/20 text-[#007CF0] rounded-full text-sm cursor-pointer hover:bg-[#007CF0]/30 transition-colors">
                Trop d'emails
              </span>
              <span className="px-3 py-1 bg-[#007CF0]/20 text-[#007CF0] rounded-full text-sm cursor-pointer hover:bg-[#007CF0]/30 transition-colors">
                Contenu non pertinent
              </span>
              <span className="px-3 py-1 bg-[#007CF0]/20 text-[#007CF0] rounded-full text-sm cursor-pointer hover:bg-[#007CF0]/30 transition-colors">
                Changement de situation
              </span>
              <span className="px-3 py-1 bg-[#007CF0]/20 text-[#007CF0] rounded-full text-sm cursor-pointer hover:bg-[#007CF0]/30 transition-colors">
                Autre raison
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#007CF0] to-[#00C48C] hover:from-[#007CF0]/80 hover:to-[#00C48C]/80 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <FaHome className="text-lg" />
              Retour à l'accueil
            </Link>
            
            <button className="bg-transparent border-2 border-[#00C48C] hover:bg-[#00C48C]/10 px-8 py-4 rounded-xl font-bold text-[#00C48C] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <FaUndo className="text-lg" />
              Se réabonner
            </button>
          </div>

          {/* Note */}
          <div className="mt-8 text-sm text-gray-400">
            <p>
              Vous pouvez toujours vous réabonner à tout moment en visitant notre site web.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}