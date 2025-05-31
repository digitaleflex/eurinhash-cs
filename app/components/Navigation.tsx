"use client";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
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
          <a href="/" className="hover:text-[#007CF0] transition-colors">Accueil</a>
          <a href="/pages/a-propos" className="hover:text-[#007CF0] transition-colors">À propos</a>
          <a href="/pages/contact" className="hover:text-[#007CF0] transition-colors">Contact</a>
        </div>
        {/* Menu Mobile */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0A0F2C]/95 backdrop-blur-sm transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="hover:text-[#007CF0] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Accueil</a>
            <a href="/pages/a-propos" className="hover:text-[#007CF0] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>À propos</a>
            <a href="/pages/contact" className="hover:text-[#007CF0] transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      </nav>
    </header>
  );
} 