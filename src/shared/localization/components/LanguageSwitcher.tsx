import { useTranslation } from 'react-i18next';

import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type Language = 'en' | 'ar';

const getCurrentLanguage = (language: string): Language =>
  language.startsWith('ar') ? 'ar' : 'en';

const TARGET_LANGUAGE: Record<Language, Language> = {
  en: 'ar',
  ar: 'en',
};

const TARGET_LANGUAGE_LABEL: Record<Language, string> = {
  en: 'EN',
  ar: 'عربي',
};

const TARGET_LANGUAGE_ARIA_LABEL: Record<Language, string> = {
  en: 'Switch language to English',
  ar: 'Switch language to Arabic',
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage(i18n.language);
  const targetLanguage = TARGET_LANGUAGE[currentLanguage];

  const handleToggleLanguage = () => {
    i18n.changeLanguage(targetLanguage);
  };

  return (
    <Stack direction="row" spacing={1} dir="ltr" sx={{ alignItems: 'center' }}>
      <LanguageIcon
        fontSize="small"
        sx={{ color: 'text.secondary' }}
        aria-hidden="true"
      />

      <Button
        variant="text"
        size="small"
        onClick={handleToggleLanguage}
        aria-label={TARGET_LANGUAGE_ARIA_LABEL[targetLanguage]}
        sx={{
          minWidth: 'auto',
          px: 0.75,
          py: 0.25,
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'text.secondary',
          '&:hover': {
            bgcolor: 'transparent',
            color: 'primary.main',
          },
        }}
      >
        {TARGET_LANGUAGE_LABEL[targetLanguage]}
      </Button>
    </Stack>
  );
};
