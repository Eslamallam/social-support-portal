import { CacheProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { type PropsWithChildren, useEffect, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { ltrCache, rtlCache } from '@/shared/theme/rtlCache';
import { createAppTheme } from '@/shared/theme/theme';

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const isRtl = direction === 'rtl';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  const theme = useMemo(() => createAppTheme(direction), [direction]);

  return (
    <CacheProvider value={isRtl ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};
