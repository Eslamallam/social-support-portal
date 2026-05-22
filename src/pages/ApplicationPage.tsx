import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LanguageSwitcher } from '@/shared/localization/components/LanguageSwitcher';

export const ApplicationPage = () => {
  const { t } = useTranslation();

  return (
    <Container
      component="main"
      maxWidth="md"
      aria-label="Social Support Application"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          px: { xs: 3, sm: 5, md: 6 },
          py: { xs: 4, sm: 5, md: 6 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LanguageSwitcher />
          </Box>

          <Stack spacing={1}>
            <Typography
              variant="h4"
              component="h1"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              {t('appTitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('appSubtitle')}
            </Typography>
          </Stack>

          <Paper
            variant="outlined"
            sx={{
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderRadius: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="body2" color="text.disabled">
              {t('formPlaceholder')}
            </Typography>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
};
