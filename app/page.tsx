'use client';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          
          {/* Menu Hamburger pour Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-[#007CF0] transition-colors">Accueil</a>
            <a href="#" className="hover:text-[#007CF0] transition-colors">À propos</a>
            <a href="#" className="hover:text-[#007CF0] transition-colors">Contact</a>
          </div>

          {/* Menu Mobile */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0A0F2C]/95 backdrop-blur-sm transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#" className="hover:text-[#007CF0] transition-colors py-2">Accueil</a>
              <a href="#" className="hover:text-[#007CF0] transition-colors py-2">À propos</a>
              <a href="#" className="hover:text-[#007CF0] transition-colors py-2">Contact</a>
            </div>
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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Connectez-vous avec nous</h2>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:space-x-8 md:gap-0 max-w-full overflow-x-auto py-4">
            <a href="https://www.linkedin.com/in/eurindalemeida/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.003 3.604 4.605v4.725z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://wa.me/22962265246" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.72.98.99-3.62-.25-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.2 2.01 3.07 4.88 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
              WhatsApp
            </a>
            <a href="mailto:eurinhash@gmail.com" className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
              Email
            </a>
            <a href="https://www.facebook.com/eurincode" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
              Facebook
            </a>
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
