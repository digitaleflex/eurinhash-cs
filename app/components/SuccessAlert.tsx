import { useEffect } from 'react';

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

export default function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-2xl transform transition-all animate-fade-in-up max-w-md w-full mx-4 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-orbitron text-gray-900 dark:text-white text-center mb-3">
          Bienvenue à bord ! 🚀
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
          Votre inscription à la newsletter a été confirmée. Vous recevrez bientôt nos dernières actualités sur la cybersécurité, le cloud et l'IA.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Super, merci !
        </button>
      </div>
    </div>
  );
} 