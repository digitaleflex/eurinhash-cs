import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Badge, Modal, Heading, Text } from './ui';
import { getUserPreferences, setUserPreferences, clearUserPreferences } from '../lib/userPreferences';

interface ProfileSwitcherProps {
  currentProfile: 'entreprise' | 'formation' | 'particuliers';
}

export default function ProfileSwitcher({ currentProfile }: ProfileSwitcherProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const profiles = {
    entreprise: {
      name: 'Entreprise',
      icon: '🏢',
      color: 'text-[#007CF0]',
      description: 'Solutions professionnelles et sécurité'
    },
    formation: {
      name: 'Formation',
      icon: '🎓',
      color: 'text-[#00C48C]',
      description: 'Programmes certifiants et carrière'
    },
    particuliers: {
      name: 'Particulier',
      icon: '👤',
      color: 'text-[#FF6B6B]',
      description: 'Services personnalisés et accessibles'
    }
  };

  const handleProfileSwitch = (newProfile: 'entreprise' | 'formation' | 'particuliers') => {
    if (newProfile === currentProfile) {
      setShowModal(false);
      return;
    }

    // Save new preference
    setUserPreferences(newProfile);
    
    // Close modal
    setShowModal(false);
    
    // Redirect to new profile page
    router.push(`/${newProfile}`);
  };

  const handleResetPreferences = () => {
    clearUserPreferences();
    setShowModal(false);
    router.push('/');
  };

  return (
    <>
      {/* Profile indicator and switch button */}
      <div className="flex items-center gap-3">
        {/* Current profile indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
          <span className="text-lg">{profiles[currentProfile].icon}</span>
          <Text size="sm" className={profiles[currentProfile].color}>
            {profiles[currentProfile].name}
          </Text>
        </div>

        {/* Switch button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowModal(true)}
          icon={<span>🔄</span>}
          className="text-xs"
        >
          <span className="hidden md:inline">Changer</span>
        </Button>
      </div>

      {/* Profile selection modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Changer de profil"
        size="lg"
      >
        <div className="mb-6">
          <Text className="mb-4">
            Sélectionnez le profil qui correspond le mieux à vos besoins.
            Vous serez redirigé vers la page appropriée.
          </Text>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span className="text-[#00C48C]">✓</span>
            <span>Votre choix sera mémorisé pour vos prochaines visites</span>
          </div>
        </div>

        {/* Profile options */}
        <div className="grid gap-4 mb-6">
          {Object.entries(profiles).map(([key, profile]) => (
            <div
              key={key}
              onClick={() => handleProfileSwitch(key as any)}
              className={`
                cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${currentProfile === key
                  ? 'border-[#00C48C] bg-[#00C48C]/20 scale-105'
                  : 'border-gray-600/30 bg-[#0A0F2C]/50 hover:border-[#007CF0]/60'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{profile.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Heading level={4} className={profile.color}>
                      {profile.name}
                    </Heading>
                    {currentProfile === key && (
                      <Badge variant="success" size="sm">
                        Actuel
                      </Badge>
                    )}
                  </div>
                  <Text size="sm" color="muted">
                    {profile.description}
                  </Text>
                </div>
                <div className="text-[#007CF0]">
                  {currentProfile === key ? '✓' : '→'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional options */}
        <div className="border-t border-gray-600/30 pt-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetPreferences}
              className="text-gray-400 hover:text-white"
            >
              Réinitialiser les préférences
            </Button>
            
            <div className="text-xs text-gray-400 text-center">
              Vous pouvez changer de profil à tout moment
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}