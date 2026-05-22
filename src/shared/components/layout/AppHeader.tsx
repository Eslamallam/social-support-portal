import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import govIcon from '@/assets/gov.svg';
import { LanguageSwitcher } from '@/shared/localization/components/LanguageSwitcher';

import { APP_BAR_HEIGHT } from './constants';

export const AppHeader = () => {
  const { t } = useTranslation();

  return (
    <AppBar
      component="header"
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: APP_BAR_HEIGHT,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          aria-label={t('appTitle')}
          sx={{ alignItems: 'center' }}
        >
          <Box
            component="img"
            src={govIcon}
            alt=""
            aria-hidden="true"
            sx={{
              height: { xs: 26, sm: 40 },
              width: 'auto',
              display: 'block',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              component: 'span',
              fontWeight: 700,
              letterSpacing: 0.3,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              color: 'text.primary',
              lineHeight: 1.3,
            }}
          >
            {t('appTitle')}
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};
