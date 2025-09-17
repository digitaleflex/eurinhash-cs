"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProfileSwitcher from "./ProfileSwitcher";
import { getUserPreferences } from "../lib/userPreferences";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<'entreprise' | 'formation' | 'particuliers' | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Determine current profile from URL or preferences
    if (pathname.startsWith('/entreprise')) {
      setCurrentProfile('entreprise');
    } else if (pathname.startsWith('/formation')) {
      setCurrentProfile('formation');
    } else if (pathname.startsWith('/particuliers')) {
      setCurrentProfile('particuliers');
    } else {
      // For root path, check stored preferences
      const preferences = getUserPreferences();
      if (preferences) {
        setCurrentProfile(preferences.audience);
      }
    }
  }, [pathname]);

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: "/pages/a-propos", label: "À propos" },
      { href: "/pages/contact", label: "Contact" }
    ];

    // Add profile-specific links
    if (currentProfile === 'entreprise') {
      return [
        { href: "/entreprise", label: "Solutions Entreprise" },
        ...baseLinks
      ];
    } else if (currentProfile === 'formation') {
      return [
        { href: "/formation", label: "Formations" },
        ...baseLinks
      ];
    } else if (currentProfile === 'particuliers') {
      return [
        { href: "/particuliers", label: "Services Particuliers" },
        ...baseLinks
      ];
    }

    return [
      { href: "/", label: "Accueil" },
      ...baseLinks
    ];
  };

  const navigationLinks = getNavigationLinks();

  return (
    <header className="fixed w-full bg-[#0A0F2C]/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="logo-text text-2xl font-bold hover:text-[#007CF0] transition-colors">
            EurinHash
          </a>
          
          {/* Profile indicator for mobile */}
          {currentProfile && (
            <div className="md:hidden">
              <ProfileSwitcher currentProfile={currentProfile} />
            </div>
          )}
        </div>

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
        <div className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#007CF0] transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          {/* Profile switcher for desktop */}
          {currentProfile && (
            <ProfileSwitcher currentProfile={currentProfile} />
          )}
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0A0F2C]/95 backdrop-blur-sm transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#007CF0] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
} 