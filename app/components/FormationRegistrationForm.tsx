import { useState } from 'react';
import { Modal, Form, Input, Button, Heading, Text, Badge } from './ui';

interface FormationRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram?: string;
}

export default function FormationRegistrationForm({
  isOpen,
  onClose,
  selectedProgram
}: FormationRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = {
        nom: formData.get('nom'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        niveau: formData.get('niveau'),
        programme: formData.get('programme'),
        motivation: formData.get('motivation')
      };
      
      console.log('Form submitted:', data);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: 'nom',
      type: 'text' as const,
      placeholder: 'Votre nom complet',
      required: true,
      icon: <span>👤</span>
    },
    {
      name: 'email',
      type: 'email' as const,
      placeholder: 'Votre email',
      required: true,
      icon: <span>📧</span>
    },
    {
      name: 'telephone',
      type: 'tel' as const,
      placeholder: 'Votre numéro de téléphone',
      required: true,
      icon: <span>📱</span>
    }
  ];

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Inscription réussie !" size="md">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <Heading level={3} className="mb-4 text-[#00C48C]">
            Félicitations !
          </Heading>
          <Text className="mb-6">
            Votre demande d'inscription a été envoyée avec succès.
            <br />
            Nous vous contacterons sous 24h pour programmer votre entretien.
          </Text>
          <div className="bg-[#00C48C]/10 p-4 rounded-lg border border-[#00C48C]/30">
            <Text size="sm" color="success" weight="semibold">
              📅 Prochaines étapes :
            </Text>
            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              <li>• Entretien de motivation (30 min)</li>
              <li>• Test de niveau (si nécessaire)</li>
              <li>• Confirmation d'inscription</li>
            </ul>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Inscription Formation" size="lg">
      <div className="mb-6">
        <Text className="mb-4">
          Remplissez ce formulaire pour vous inscrire à nos formations.
          Un entretien sera programmé pour valider votre candidature.
        </Text>
        
        {selectedProgram && (
          <Badge variant="info" className="mb-4">
            Programme sélectionné : {selectedProgram}
          </Badge>
        )}
      </div>

      <Form
        fields={formFields}
        onSubmit={handleSubmit}
        submitButton={{
          text: "Envoyer ma candidature",
          icon: <span>🚀</span>,
          loading: isSubmitting
        }}
      >
        {/* Custom fields that need special handling */}
        <div className="space-y-4">
          {/* Niveau actuel */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Votre niveau actuel *
            </label>
            <select
              name="niveau"
              required
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white"
            >
              <option value="">Sélectionnez votre niveau</option>
              <option value="debutant">Débutant complet</option>
              <option value="quelques-bases">Quelques bases</option>
              <option value="intermediaire">Niveau intermédiaire</option>
              <option value="avance">Niveau avancé</option>
              <option value="professionnel">Professionnel expérimenté</option>
            </select>
          </div>

          {/* Programme souhaité */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Programme souhaité *
            </label>
            <select
              name="programme"
              required
              defaultValue={selectedProgram || ''}
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white"
            >
              <option value="">Choisissez un programme</option>
              <option value="programmation">Développement Web & Mobile</option>
              <option value="reseaux">Réseaux & Infrastructure</option>
              <option value="cybersecurite">Cybersécurité & Ethical Hacking</option>
              <option value="cloud">Cloud Computing & DevOps</option>
              <option value="ia">Intelligence Artificielle & Data Science</option>
            </select>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Votre motivation (optionnel)
            </label>
            <textarea
              name="motivation"
              rows={4}
              placeholder="Parlez-nous de vos objectifs professionnels et de votre motivation..."
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Additional info */}
        <div className="bg-[#007CF0]/10 p-4 rounded-lg border border-[#007CF0]/30">
          <Text size="sm" weight="semibold" className="mb-2">
            ℹ️ Informations importantes :
          </Text>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• L'entretien est gratuit et sans engagement</li>
            <li>• Possibilité de financement en plusieurs fois</li>
            <li>• Places limitées par session</li>
            <li>• Réponse sous 24h garantie</li>
          </ul>
        </div>
      </Form>
    </Modal>
  );
}