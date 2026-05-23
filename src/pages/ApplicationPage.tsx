import { useTranslation } from 'react-i18next';

import LockOutlined from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ApplicationFormProvider } from '@/features/support-application/components/ApplicationFormProvider';
import { FormWizard } from '@/features/support-application/components/FormWizard';
import { AppLayout } from '@/shared/components/layout/AppLayout';

export const ApplicationPage = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
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
        <Stack spacing={3}>
          <Stack spacing={1} sx={{ px: { xs: 1, sm: 0 } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 500, color: 'text.primary' }}
            >
              {t('appTitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('appSubtitle')}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <LockOutlined sx={{ fontSize: 14 }} color="action" />
              <Typography variant="caption" color="text.disabled">
                {t('app.secureMessage')}
              </Typography>
            </Stack>
          </Stack>

          <Paper
            elevation={2}
            sx={{
              px: { xs: 3, sm: 5, md: 6 },
              py: { xs: 4, sm: 5, md: 6 },
              borderRadius: 3,
            }}
          >
            <ApplicationFormProvider>
              <FormWizard />
            </ApplicationFormProvider>
          </Paper>
        </Stack>
      </Container>
    </AppLayout>
  );
};
