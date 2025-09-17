"use client";
import { useState } from "react";

interface AudienceSelectorProps {
  onSelect: (audience: 'entreprise' | 'formation' | 'particuliers') => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AudienceSelector({ onSelect, isOpen, onClose }: AudienceSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (audience: 'entreprise' | 'formation' | 'particuliers') => {
    setSelectedOption(audience);
    setTimeout(() => {
      onSelect(audience);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#1A1F3C] rounded-2xl p-8 max-w-4xl w-full relative transform transition-all duration-300 scale-100 border border-[#007CF0]/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            Bienvenue chez <span className="text-[#00C48C]">EurinHash</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Pour mieux vous servir, dites-nous qui vous êtes :
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Option Entreprise */}
          <div
            onClick={() => handleSelect('entreprise')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedOption === 'entreprise'
                ? 'border-[#007CF0] bg-[#007CF0]/20 scale-105'
                : 'border-[#007CF0]/30 bg-[#0A0F2C]/50 hover:border-[#007CF0]/60'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-3 text-[#007CF0]">Entreprise</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Solutions professionnelles, sécurité avancée, infrastructure cloud
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Audit sécurité gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Support 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>ROI garanti</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option Formation */}
          <div
            onClick={() => handleSelect('formation')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedOption === 'formation'
                ? 'border-[#00C48C] bg-[#00C48C]/20 scale-105'
                : 'border-[#00C48C]/30 bg-[#0A0F2C]/50 hover:border-[#00C48C]/60'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3 text-[#00C48C]">Étudiant / Reconversion</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Formations certifiantes, accompagnement carrière, projets pratiques
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>5 programmes disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Certification reconnue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Financement possible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option Particuliers */}
          <div
            onClick={() => handleSelect('particuliers')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedOption === 'particuliers'
                ? 'border-[#FF6B6B] bg-[#FF6B6B]/20 scale-105'
                : 'border-[#FF6B6B]/30 bg-[#0A0F2C]/50 hover:border-[#FF6B6B]/60'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-bold mb-3 text-[#FF6B6B]">Particulier</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Services personnalisés, tarifs accessibles, support individuel
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Dépannage informatique</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Sites web personnels</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C48C]">✓</span>
                  <span>Prix en FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Vous pourrez changer votre choix à tout moment dans la navigation
          </p>
        </div>
      </div>
    </div>
  );
}