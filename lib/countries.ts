export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  continent: string;
  flag?: string;
  exampleNumber?: string;
}

export const countries: Country[] = [
  // Afrique de l'Ouest (en premier)
  {
    code: 'BJ',
    name: 'Bénin',
    phoneCode: '+229',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    phoneCode: '+226',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    phoneCode: '+225',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'GH',
    name: 'Ghana',
    phoneCode: '+233',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'GN',
    name: 'Guinée',
    phoneCode: '+224',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'GW',
    name: 'Guinée-Bissau',
    phoneCode: '+245',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'LR',
    name: 'Libéria',
    phoneCode: '+231',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'ML',
    name: 'Mali',
    phoneCode: '+223',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'MR',
    name: 'Mauritanie',
    phoneCode: '+222',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'NE',
    name: 'Niger',
    phoneCode: '+227',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'NG',
    name: 'Nigeria',
    phoneCode: '+234',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'SN',
    name: 'Sénégal',
    phoneCode: '+221',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    phoneCode: '+232',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'TG',
    name: 'Togo',
    phoneCode: '+228',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'GM',
    name: 'Gambie',
    phoneCode: '+220',
    continent: "Afrique de l'Ouest",
  },
  {
    code: 'CV',
    name: 'Cap-Vert',
    phoneCode: '+238',
    continent: "Afrique de l'Ouest",
  },

  // Autres pays d'Afrique
  {
    code: 'DZ',
    name: 'Algérie',
    phoneCode: '+213',
    continent: 'Afrique du Nord',
  },
  {
    code: 'AO',
    name: 'Angola',
    phoneCode: '+244',
    continent: 'Afrique Centrale',
  },
  {
    code: 'BW',
    name: 'Botswana',
    phoneCode: '+267',
    continent: 'Afrique Australe',
  },
  {
    code: 'BI',
    name: 'Burundi',
    phoneCode: '+257',
    continent: "Afrique de l'Est",
  },
  {
    code: 'CM',
    name: 'Cameroun',
    phoneCode: '+237',
    continent: 'Afrique Centrale',
  },
  {
    code: 'CF',
    name: 'République Centrafricaine',
    phoneCode: '+236',
    continent: 'Afrique Centrale',
  },
  {
    code: 'TD',
    name: 'Tchad',
    phoneCode: '+235',
    continent: 'Afrique Centrale',
  },
  {
    code: 'KM',
    name: 'Comores',
    phoneCode: '+269',
    continent: "Afrique de l'Est",
  },
  {
    code: 'CG',
    name: 'Congo',
    phoneCode: '+242',
    continent: 'Afrique Centrale',
  },
  {
    code: 'CD',
    name: 'République Démocratique du Congo',
    phoneCode: '+243',
    continent: 'Afrique Centrale',
  },
  {
    code: 'DJ',
    name: 'Djibouti',
    phoneCode: '+253',
    continent: "Afrique de l'Est",
  },
  {
    code: 'EG',
    name: 'Égypte',
    phoneCode: '+20',
    continent: 'Afrique du Nord',
  },
  {
    code: 'GQ',
    name: 'Guinée Équatoriale',
    phoneCode: '+240',
    continent: 'Afrique Centrale',
  },
  {
    code: 'ER',
    name: 'Érythrée',
    phoneCode: '+291',
    continent: "Afrique de l'Est",
  },
  {
    code: 'ET',
    name: 'Éthiopie',
    phoneCode: '+251',
    continent: "Afrique de l'Est",
  },
  {
    code: 'GA',
    name: 'Gabon',
    phoneCode: '+241',
    continent: 'Afrique Centrale',
  },
  {
    code: 'KE',
    name: 'Kenya',
    phoneCode: '+254',
    continent: "Afrique de l'Est",
  },
  {
    code: 'LS',
    name: 'Lesotho',
    phoneCode: '+266',
    continent: 'Afrique Australe',
  },
  {
    code: 'LY',
    name: 'Libye',
    phoneCode: '+218',
    continent: 'Afrique du Nord',
  },
  {
    code: 'MG',
    name: 'Madagascar',
    phoneCode: '+261',
    continent: "Afrique de l'Est",
  },
  {
    code: 'MW',
    name: 'Malawi',
    phoneCode: '+265',
    continent: 'Afrique Australe',
  },
  {
    code: 'MU',
    name: 'Maurice',
    phoneCode: '+230',
    continent: "Afrique de l'Est",
  },
  {
    code: 'MA',
    name: 'Maroc',
    phoneCode: '+212',
    continent: 'Afrique du Nord',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    phoneCode: '+258',
    continent: 'Afrique Australe',
  },
  {
    code: 'NA',
    name: 'Namibie',
    phoneCode: '+264',
    continent: 'Afrique Australe',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    phoneCode: '+250',
    continent: "Afrique de l'Est",
  },
  {
    code: 'ST',
    name: 'Sao Tomé-et-Principe',
    phoneCode: '+239',
    continent: 'Afrique Centrale',
  },
  {
    code: 'SC',
    name: 'Seychelles',
    phoneCode: '+248',
    continent: "Afrique de l'Est",
  },
  {
    code: 'SO',
    name: 'Somalie',
    phoneCode: '+252',
    continent: "Afrique de l'Est",
  },
  {
    code: 'ZA',
    name: 'Afrique du Sud',
    phoneCode: '+27',
    continent: 'Afrique Australe',
  },
  {
    code: 'SS',
    name: 'Soudan du Sud',
    phoneCode: '+211',
    continent: "Afrique de l'Est",
  },
  {
    code: 'SD',
    name: 'Soudan',
    phoneCode: '+249',
    continent: "Afrique de l'Est",
  },
  {
    code: 'SZ',
    name: 'Eswatini',
    phoneCode: '+268',
    continent: 'Afrique Australe',
  },
  {
    code: 'TZ',
    name: 'Tanzanie',
    phoneCode: '+255',
    continent: "Afrique de l'Est",
  },
  {
    code: 'TN',
    name: 'Tunisie',
    phoneCode: '+216',
    continent: 'Afrique du Nord',
  },
  {
    code: 'UG',
    name: 'Ouganda',
    phoneCode: '+256',
    continent: "Afrique de l'Est",
  },
  {
    code: 'ZM',
    name: 'Zambie',
    phoneCode: '+260',
    continent: 'Afrique Australe',
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    phoneCode: '+263',
    continent: 'Afrique Australe',
  },

  // Europe (principales villes/pays)
  { code: 'FR', name: 'France', phoneCode: '+33', continent: 'Europe' },
  { code: 'DE', name: 'Allemagne', phoneCode: '+49', continent: 'Europe' },
  { code: 'GB', name: 'Royaume-Uni', phoneCode: '+44', continent: 'Europe' },
  { code: 'IT', name: 'Italie', phoneCode: '+39', continent: 'Europe' },
  { code: 'ES', name: 'Espagne', phoneCode: '+34', continent: 'Europe' },
  { code: 'BE', name: 'Belgique', phoneCode: '+32', continent: 'Europe' },
  { code: 'CH', name: 'Suisse', phoneCode: '+41', continent: 'Europe' },
  { code: 'NL', name: 'Pays-Bas', phoneCode: '+31', continent: 'Europe' },
  {
    code: 'CA',
    name: 'Canada',
    phoneCode: '+1',
    continent: 'Amérique du Nord',
  },
  {
    code: 'US',
    name: 'États-Unis',
    phoneCode: '+1',
    continent: 'Amérique du Nord',
  },

  // Asie (principales villes/pays)
  { code: 'CN', name: 'Chine', phoneCode: '+86', continent: 'Asie' },
  { code: 'JP', name: 'Japon', phoneCode: '+81', continent: 'Asie' },
  { code: 'IN', name: 'Inde', phoneCode: '+91', continent: 'Asie' },
  { code: 'KR', name: 'Corée du Sud', phoneCode: '+82', continent: 'Asie' },
  { code: 'SG', name: 'Singapour', phoneCode: '+65', continent: 'Asie' },
  { code: 'TH', name: 'Thaïlande', phoneCode: '+66', continent: 'Asie' },

  // Amérique du Sud
  {
    code: 'BR',
    name: 'Brésil',
    phoneCode: '+55',
    continent: 'Amérique du Sud',
  },
  {
    code: 'AR',
    name: 'Argentine',
    phoneCode: '+54',
    continent: 'Amérique du Sud',
  },
  { code: 'CL', name: 'Chili', phoneCode: '+56', continent: 'Amérique du Sud' },
  {
    code: 'CO',
    name: 'Colombie',
    phoneCode: '+57',
    continent: 'Amérique du Sud',
  },

  // Océanie
  { code: 'AU', name: 'Australie', phoneCode: '+61', continent: 'Océanie' },
  {
    code: 'NZ',
    name: 'Nouvelle-Zélande',
    phoneCode: '+64',
    continent: 'Océanie',
  },
];

// Pays par défaut (Bénin)
export const defaultCountry = countries.find(c => c.code === 'BJ')!;

// Fonction pour formater le numéro de téléphone
export function formatPhoneNumber(phone: string, countryCode: string): string {
  // Supprimer tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '');

  // Si le numéro commence par le code du pays, le supprimer
  const country = countries.find(c => c.code === countryCode);
  if (country && cleaned.startsWith(country.phoneCode.replace('+', ''))) {
    return cleaned.substring(country.phoneCode.length - 1);
  }

  // Formatage spécial pour le Bénin (ajouter 01 si manquant)
  if (
    countryCode === 'BJ' &&
    cleaned.length >= 8 &&
    !cleaned.startsWith('01')
  ) {
    // Si le numéro a 8 chiffres et ne commence pas par 01, ajouter 01
    if (cleaned.length === 8) {
      return '01' + cleaned;
    }
  }

  return cleaned;
}

// Fonction pour valider le numéro de téléphone
export function validatePhoneNumber(
  phone: string,
  countryCode: string
): { isValid: boolean; message?: string } {
  const country = countries.find(c => c.code === countryCode);
  if (!country) {
    return { isValid: false, message: 'Pays non reconnu' };
  }

  const cleaned = phone.replace(/\D/g, '');

  // Vérifier la longueur minimale
  if (cleaned.length < 8) {
    return { isValid: false, message: 'Numéro trop court' };
  }

  // Vérifier la longueur maximale
  if (cleaned.length > 15) {
    return { isValid: false, message: 'Numéro trop long' };
  }

  // Validation spécifique par pays
  switch (countryCode) {
    case 'BJ': // Bénin
      if (cleaned.length !== 10) {
        return {
          isValid: false,
          message: 'Le numéro béninois doit avoir 10 chiffres',
        };
      }
      if (!cleaned.startsWith('01')) {
        return {
          isValid: false,
          message: 'Le numéro béninois doit commencer par 01',
        };
      }
      break;
    case 'FR': // France
      if (cleaned.length !== 10) {
        return {
          isValid: false,
          message: 'Le numéro français doit avoir 10 chiffres',
        };
      }
      break;
    case 'US': // États-Unis
    case 'CA': // Canada
      if (cleaned.length !== 10) {
        return { isValid: false, message: 'Le numéro doit avoir 10 chiffres' };
      }
      break;
  }

  return { isValid: true };
}

// Fonction utilitaire pour rechercher un pays
export function searchCountry(query: string): Country[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return countries;
  
  return countries.filter(country => 
    country.name.toLowerCase().includes(normalizedQuery) ||
    country.phoneCode.includes(normalizedQuery) ||
    country.continent.toLowerCase().includes(normalizedQuery) ||
    country.code.toLowerCase().includes(normalizedQuery)
  );
}

// Fonction pour obtenir le pays par code
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

// Fonction pour obtenir les pays par continent
export function getCountriesByContinent(continent: string): Country[] {
  return countries.filter(c => c.continent === continent);
}

// Liste des continents
export const continents = [
  "Afrique de l'Ouest",
  'Afrique du Nord',
  'Afrique Centrale',
  "Afrique de l'Est",
  'Afrique Australe',
  'Europe',
  'Europe/Asie',
  'Amérique du Nord',
  'Amérique du Sud',
  'Asie',
  'Océanie',
];
