import { useEffect } from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      <div className="relative bg-red-50 dark:bg-red-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 border border-red-200 dark:border-red-700 animate-fade-in-up">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-400 rounded-full p-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-orbitron text-red-700 dark:text-red-200 text-center mb-2">
          Oups !
        </h3>
        <p className="text-base text-red-600 dark:text-red-300 text-center mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
} 