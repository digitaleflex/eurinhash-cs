export default function Footer() {
  return (
    <footer className="py-8 bg-[#0A0F2C] border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-gray-400">
        <p>© 2024 EurinHash. Tous droits réservés.</p>
        <div className="mt-2">
          <a href="/pages/mentions-legales" className="hover:text-[#007CF0] transition-colors">Mentions légales</a>
          <span className="mx-2">|</span>
          <a href="/pages/cgu" className="hover:text-[#007CF0] transition-colors">CGU</a>
          <span className="mx-2">|</span>
          <a href="/pages/confidentialite" className="hover:text-[#007CF0] transition-colors">Confidentialité</a>
          <span className="mx-2">|</span>
          <a href="https://digitaleflex.com" className="hover:text-[#007CF0] transition-colors">E-FLEX</a>
        </div>
      </div>
    </footer>
  );
} 