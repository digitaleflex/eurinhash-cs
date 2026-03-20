'use client';

import { useState, useMemo } from 'react';
import { countries, defaultCountry, formatPhoneNumber, validatePhoneNumber, searchCountry } from '@/lib/countries';

export function usePhoneInput(initialCountry: string = defaultCountry.code) {
  const [country, setCountry] = useState(initialCountry);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  const filteredCountries = useMemo(
    () => searchCountry(countrySearchQuery),
    [countrySearchQuery]
  );

  const selectedCountry = useMemo(
    () => countries.find(c => c.code === country) || defaultCountry,
    [country]
  );

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, country);
    setPhone(formatted);

    if (formatted) {
      const validation = validatePhoneNumber(formatted, country);
      setPhoneError(validation.isValid ? '' : validation.message || '');
    } else {
      setPhoneError('');
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    setIsCountryDropdownOpen(false);
    setCountrySearchQuery('');

    if (phone) {
      const validation = validatePhoneNumber(phone, countryCode);
      setPhoneError(validation.isValid ? '' : validation.message || '');
    }
  };

  const resetPhone = () => {
    setPhone('');
    setPhoneError('');
  };

  return {
    country,
    phone,
    phoneError,
    isCountryDropdownOpen,
    countrySearchQuery,
    filteredCountries,
    selectedCountry,
    setIsCountryDropdownOpen,
    setCountrySearchQuery,
    handlePhoneChange,
    handleCountryChange,
    resetPhone,
    setPhone,
    setPhoneError,
  };
}
