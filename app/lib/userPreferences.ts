export interface UserPreferences {
  audience: 'entreprise' | 'formation' | 'particuliers';
  timestamp: number;
  hasVisited: boolean;
}

const STORAGE_KEY = 'eurinhash_user_preferences';

export const getUserPreferences = (): UserPreferences | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const preferences = JSON.parse(stored) as UserPreferences;
    
    // Check if preferences are older than 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    if (preferences.timestamp < thirtyDaysAgo) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return preferences;
  } catch (error) {
    console.error('Error reading user preferences:', error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const setUserPreferences = (audience: 'entreprise' | 'formation' | 'particuliers'): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const preferences: UserPreferences = {
      audience,
      timestamp: Date.now(),
      hasVisited: true
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
    // Fallback to session storage if localStorage fails
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        audience,
        timestamp: Date.now(),
        hasVisited: true
      }));
    } catch (sessionError) {
      console.error('Error saving to session storage:', sessionError);
    }
  }
};

export const clearUserPreferences = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user preferences:', error);
  }
};

// Hook for using preferences in React components
export const useAudiencePreference = () => {
  const getPreferences = () => getUserPreferences();
  const setPreferences = (audience: 'entreprise' | 'formation' | 'particuliers') => {
    setUserPreferences(audience);
  };
  const clearPreferences = () => clearUserPreferences();
  
  return {
    getPreferences,
    setPreferences,
    clearPreferences
  };
};