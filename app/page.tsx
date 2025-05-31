'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SuccessAlert from './components/SuccessAlert';
import ErrorAlert from './components/ErrorAlert';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 89,
    hours: 12,
    minutes: 43,
    seconds: 21
  });

  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          interest: formData.get('interest'),
          consent: formData.get('consent') === 'on'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setShowNewsletter(false);
        setErrorMessage(data.error || 'Une erreur est survenue');
        setShowError(true);
        return;
      }
      setShowNewsletter(false);
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
      setShowError(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0]">
      {/* Popups d'alerte */}
      {showSuccess && (
        <SuccessAlert message="" onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <ErrorAlert message={errorMessage} onClose={() => setShowError(false)} />
      )}

      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1F3C] rounded-2xl p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
            <button 
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 hero-title">Restez informé !</h3>
              <p className="text-gray-300">Soyez les premiers à découvrir le Hub Central EurinHash</p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Votre email professionnel" 
                  required
                  className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <select 
                    name="interest"
                    className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] text-white"
                  >
                    <option value="" disabled selected>Domaine d'intérêt</option>
                    <option value="security">Cybersécurité</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="ai">Intelligence Artificielle</option>
                    <option value="training">Formation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  id="newsletter-consent" 
                  name="consent"
                  className="rounded border-[#007CF0]/30" 
                  required 
                />
                <label htmlFor="newsletter-consent">
                  J'accepte de recevoir la newsletter et les actualités d'EurinHash
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#007CF0] hover:bg-[#0066CC] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                S'inscrire à la newsletter
              </button>
            </form>

            <div className="mt-6 p-4 bg-[#0A0F2C]/50 rounded-lg border border-[#007CF0]/20">
              <h4 className="text-sm font-semibold mb-2 text-[#00C48C]">🔒 Protection de vos données</h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Vos données sont chiffrées et stockées de manière sécurisée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Conformité RGPD et CNIL garantie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Droit de modification et suppression à tout moment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Aucun partage avec des tiers</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Vos données sont protégées et ne seront jamais partagées.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed w-full bg-[#0A0F2C]/80 backdrop-blur-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo-text text-2xl font-bold">EurinHash</div>
          <div className="space-x-6">
            <a href="#" className="hover:text-[#007CF0] transition-colors">Accueil</a>
            <a href="#" className="hover:text-[#007CF0] transition-colors">À propos</a>
            <a href="#" className="hover:text-[#007CF0] transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title">
            Le Hub Central de l'Innovation Digitale arrive bientôt.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Cybersécurité, Cloud, IA, Formation, Architecture de solutions... Tout ce qui va transformer votre univers numérique.
          </p>
          <button 
            onClick={() => setShowNewsletter(true)}
            className="btn-primary"
          >
            📬 Restez informé →
          </button>
          
          {/* Badges de confiance */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="text-[#00C48C]">✓</span>
              <span>Expert Certifié</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="text-[#00C48C]">✓</span>
              <span>100% Sécurisé</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="text-[#00C48C]">✓</span>
              <span>Support Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-20 bg-[#1A1F3C]">
        <div className="container mx-auto text-center">
          <h2 className="section-title">Lancement prévu dans :</h2>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.days}</div>
              <div className="text-sm text-gray-400">Jours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm text-gray-400">Heures</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-400">Secondes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Ce qui vous attend</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="text-2xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2">Sécurité avancée</h3>
              <p className="text-gray-400">Protection de vos données et projets avec les dernières technologies.</p>
            </div>
            <div className="feature-card">
              <div className="text-2xl mb-4">☁️</div>
              <h3 className="text-xl font-bold mb-2">Outils Cloud modulaires</h3>
              <p className="text-gray-400">Solutions adaptées pour développeurs et PME.</p>
            </div>
            <div className="feature-card">
              <div className="text-2xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Formations Premium</h3>
              <p className="text-gray-400">Expertise en cybersécurité et cloud.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-[#1A1F3C]">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl italic mb-4">
              "Créer, sécuriser, déployer… Ce sont plus que des actions, c'est une vision digitale. Bienvenue chez EurinHash."
            </p>
            <footer className="text-[#007CF0] font-bold">— Eurin Hash</footer>
          </blockquote>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Connectez-vous avec nous</h2>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-2xl hover:text-[#007CF0] transition-colors">LinkedIn</a>
            <a href="#" className="text-2xl hover:text-[#007CF0] transition-colors">GitHub</a>
            <a href="#" className="text-2xl hover:text-[#007CF0] transition-colors">WhatsApp</a>
            <a href="#" className="text-2xl hover:text-[#007CF0] transition-colors">Email</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0A0F2C] border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>© 2024 EurinHash. Tous droits réservés.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-[#007CF0] transition-colors">Mentions légales</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[#007CF0] transition-colors">CGU</a>
            <span className="mx-2">|</span>
            <a href="https://digitaleflex.com" className="hover:text-[#007CF0] transition-colors">E-FLEX</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
