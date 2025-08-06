import { useState } from 'react';
import { Modal, Form, Input, Button, Heading, Text, Badge } from './ui';

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
  serviceTitle?: string;
}

export default function QuoteRequestForm({
  isOpen,
  onClose,
  selectedService,
  serviceTitle
}: QuoteRequestFormProps) {
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
        service: formData.get('service'),
        budget: formData.get('budget'),
        urgence: formData.get('urgence'),
        description: formData.get('description'),
        adresse: formData.get('adresse')
      };
      
      console.log('Quote request submitted:', data);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
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
    },
    {
      name: 'adresse',
      type: 'text' as const,
      placeholder: 'Votre adresse (pour intervention à domicile)',
      required: false,
      icon: <span>📍</span>
    }
  ];

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Demande envoyée !" size="md">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <Heading level={3} className="mb-4 text-[#00C48C]">
            Demande reçue !
          </Heading>
          <Text className="mb-6">
            Votre demande de devis a été envoyée avec succès.
            <br />
            Nous vous contacterons sous 2h pour discuter de vos besoins.
          </Text>
          <div className="bg-[#007CF0]/10 p-4 rounded-lg border border-[#007CF0]/30">
            <Text size="sm" color="primary" weight="semibold">
              📞 Prochaines étapes :
            </Text>
            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              <li>• Appel de confirmation sous 2h</li>
              <li>• Diagnostic gratuit si nécessaire</li>
              <li>• Devis détaillé personnalisé</li>
              <li>• Intervention rapide</li>
            </ul>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Demande de devis gratuit" size="lg">
      <div className="mb-6">
        <Text className="mb-4">
          Décrivez-nous vos besoins et recevez un devis personnalisé sous 2h.
          Diagnostic gratuit et sans engagement !
        </Text>
        
        {serviceTitle && (
          <Badge variant="info" className="mb-4">
            Service sélectionné : {serviceTitle}
          </Badge>
        )}
      </div>

      <Form
        fields={formFields}
        onSubmit={handleSubmit}
        submitButton={{
          text: "Envoyer ma demande",
          icon: <span>📨</span>,
          loading: isSubmitting
        }}
      >
        {/* Custom fields */}
        <div className="space-y-4">
          {/* Service souhaité */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Service souhaité *
            </label>
            <select
              name="service"
              required
              defaultValue={selectedService || ''}
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white"
            >
              <option value="">Choisissez un service</option>
              <option value="depannage-pc">Dépannage Informatique</option>
              <option value="site-web-personnel">Site Web Personnel</option>
              <option value="formation-bureautique">Formation Bureautique</option>
              <option value="consultation-tech">Consultation Technologique</option>
              <option value="installation-logiciels">Installation & Configuration</option>
              <option value="sauvegarde-donnees">Sauvegarde & Sécurité</option>
              <option value="autre">Autre (préciser dans la description)</option>
            </select>
          </div>

          {/* Budget indicatif */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Budget indicatif
            </label>
            <select
              name="budget"
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white"
            >
              <option value="">Sélectionnez votre budget</option>
              <option value="moins-25k">Moins de 25,000 FCFA</option>
              <option value="25k-50k">25,000 - 50,000 FCFA</option>
              <option value="50k-100k">50,000 - 100,000 FCFA</option>
              <option value="100k-200k">100,000 - 200,000 FCFA</option>
              <option value="plus-200k">Plus de 200,000 FCFA</option>
              <option value="a-discuter">À discuter</option>
            </select>
          </div>

          {/* Urgence */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Niveau d'urgence
            </label>
            <select
              name="urgence"
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white"
            >
              <option value="normal">Normal (sous 48h)</option>
              <option value="urgent">Urgent (sous 24h)</option>
              <option value="tres-urgent">Très urgent (même jour)</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description de votre besoin *
            </label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Décrivez votre problème ou votre projet en détail..."
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Additional info */}
        <div className="bg-[#00C48C]/10 p-4 rounded-lg border border-[#00C48C]/30">
          <Text size="sm" weight="semibold" className="mb-2">
            🎯 Nos engagements :
          </Text>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Réponse garantie sous 2h</li>
            <li>• Diagnostic gratuit et sans engagement</li>
            <li>• Tarifs transparents et compétitifs</li>
            <li>• Intervention à domicile possible</li>
            <li>• Paiement flexible (espèces, mobile money)</li>
          </ul>
        </div>
      </Form>
    </Modal>
  );
}