import countries from 'i18n-iso-countries';
import arLocale from 'i18n-iso-countries/langs/ar.json';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

export interface CountryOption {
  code: string;
  name: string;
}

export const getCountryList = (lang: string): CountryOption[] => {
  const list = countries.getNames(lang, { select: 'official' });
  return Object.entries(list)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
