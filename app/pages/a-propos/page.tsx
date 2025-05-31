import { FaCogs, FaEnvelope, FaUserShield, FaLightbulb, FaRocket, FaLock, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-12 flex flex-col items-center">
      {/* Section 1 : Intro */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg text-center flex flex-col items-center animate-fade-in-up">
        <div className="bg-[#00C48C]/20 p-4 rounded-full mb-4">
          <FaLightbulb className="text-3xl text-[#00C48C]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-title">EurinHash – Le Hub Central du Digital</h1>
        <p className="text-lg text-gray-200 mb-2">
          <strong>Bienvenue sur EurinHash.com</strong>, la plateforme centrale où l'expertise numérique, la cybersécurité de pointe, le cloud computing et l'innovation technologique convergent.
        </p>
        <p className="text-lg text-gray-200">
          Pensé comme un hub d'intelligence digitale, EurinHash est bien plus qu'un simple site : c'est une signature personnelle, un écosystème d'excellence porté par une vision audacieuse de l'avenir numérique.<br/>
          Nous accompagnons les entreprises, développeurs, étudiants en IT, responsables SI et créateurs de solutions vers des architectures robustes, sûres et évolutives.
        </p>
      </section>
      <div className="h-4" />
      {/* Section 2 : Mission & ADN */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#007CF0]/20 p-3 rounded-full"><FaCogs className="text-2xl text-[#007CF0]" /></div>
          <h2 className="text-2xl md:text-3xl font-bold">Notre Mission</h2>
        </div>
        <p className="text-gray-200 mb-2">
          Offrir aux acteurs du numérique une expertise de haut niveau en architecture de solutions digitales, cloud computing et cybersécurité, à travers :
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Des formations premium orientées pratique & certification</li>
          <li>Des consultations techniques personnalisées</li>
          <li>Des solutions cloud souveraines et sécurisées</li>
          <li>Des contenus stratégiques, des outils, des modèles prêts à l'emploi</li>
        </ul>
        <blockquote className="border-l-4 border-[#00C48C] pl-4 italic text-gray-400">
          Chez EurinHash, nous croyons que chaque solution numérique doit être fiable, éthique, scalable et souveraine.
        </blockquote>
      </section>
      <div className="h-4" />
      {/* Section 3 : Vision */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#00C48C]/20 p-3 rounded-full"><FaRocket className="text-2xl text-[#00C48C]" /></div>
          <h2 className="text-2xl md:text-3xl font-bold">Une Vision : construire le futur numérique avec excellence</h2>
        </div>
        <p className="text-gray-200 mb-2">
          Dans un monde ultra-connecté, la donnée est un pouvoir. Mais mal protégée, elle devient une faiblesse.<br/>
          C'est pourquoi EurinHash s'engage à bâtir un web plus sûr, plus clair, et plus performant.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>La technologie est un levier de liberté et de performance</li>
          <li>La sécurité numérique est au cœur des choix stratégiques</li>
          <li>La formation continue est la meilleure des protections</li>
        </ul>
      </section>
      <div className="h-4" />
      {/* Section 4 : Qui est derrière EurinHash ? */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#007CF0]/20 p-3 rounded-full"><FaUserShield className="text-2xl text-[#007CF0]" /></div>
          <h2 className="text-2xl md:text-3xl font-bold">Derrière EurinHash : Eurin HASH</h2>
        </div>
        <p className="text-gray-200 mb-2">
          <strong>Architecte de solutions digitales. Spécialiste cloud & cybersécurité. Formateur. Visionnaire.</strong>
        </p>
        <p className="text-gray-200 mb-2">
          Je m'appelle <strong>Eurin HASH</strong>. Entrepreneur numérique, passionné par la technologie, j'ai fondé EurinHash pour :
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Partager mes savoirs et mes compétences</li>
          <li>Accompagner les porteurs de projets</li>
          <li>Créer une plateforme de confiance pour tous ceux qui veulent construire l'avenir du numérique, en toute sécurité</li>
        </ul>
        <p className="text-gray-200">
          Avec plus de 10 ans de passion pour le digital, je crois en l'impact positif de la tech sur les vies humaines et les organisations.
        </p>
      </section>
      <div className="h-4" />
      {/* Section 5 : Ce que nous préparons */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#00C48C]/20 p-3 rounded-full"><FaLock className="text-2xl text-[#00C48C]" /></div>
          <h2 className="text-2xl md:text-3xl font-bold">Ce qui arrive bientôt…</h2>
        </div>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>🛠️ Une suite d'outils & de formations stratégiques</li>
          <li>🔐 Un espace membres sécurisé pour les projets sensibles</li>
          <li>📘 Des ressources exclusives sur le cloud, la cybersécurité et l'architecture logicielle</li>
          <li>📅 Un calendrier de masterclass et de certifications professionnelles</li>
          <li>🤝 Un pont entre entreprises, développeurs, freelances et solutions fiables</li>
        </ul>
        <blockquote className="border-l-4 border-[#007CF0] pl-4 italic text-gray-400">
          Le compte à rebours a commencé… Et vous êtes au bon endroit.
        </blockquote>
      </section>
      <div className="h-4" />
      {/* Section 6 : Contact / Connexion humaine */}
      <section className="max-w-3xl w-full mb-8 p-8 bg-[#1A1F3C]/80 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#007CF0]/20 p-3 rounded-full"><FaEnvelope className="text-2xl text-[#007CF0]" /></div>
          <h2 className="text-2xl md:text-3xl font-bold">Entrons en contact</h2>
        </div>
        <p className="text-gray-200 mb-2">Vous avez un projet ? Une idée ? Un besoin stratégique ?</p>
        <div className="flex flex-col md:flex-row md:justify-center gap-4 items-center mb-2">
          <a href="https://www.linkedin.com/in/eurindalemeida/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg hover:text-[#007CF0] transition-colors"><FaLinkedin /> LinkedIn</a>
          <a href="https://github.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg hover:text-[#007CF0] transition-colors"><FaGithub /> GitHub</a>
          <a href="https://x.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg hover:text-[#007CF0] transition-colors"><FaXTwitter /> X</a>
        </div>
        <p className="text-gray-200 mb-2">📅 Inscrivez-vous dès maintenant pour recevoir l'ouverture officielle de la plateforme et nos contenus VIP.</p>
        <div className="flex justify-center mt-4">
          <a href="/pages/contact" className="btn-primary">Me contacter</a>
        </div>
      </section>
    </main>
  );
} 