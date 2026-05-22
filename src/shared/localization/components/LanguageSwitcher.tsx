import { useTranslation } from 'react-i18next';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Language = 'en' | 'ar';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: Language | null,
  ) => {
    if (value !== null) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language as Language}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="language"
    >
      <ToggleButton value="en" aria-label="English">
        English
      </ToggleButton>
      <ToggleButton value="ar" aria-label="العربية">
        العربية
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
