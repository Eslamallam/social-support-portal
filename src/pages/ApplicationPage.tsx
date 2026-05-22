import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ApplicationFormProvider } from '@/features/support-application/components/ApplicationFormProvider';
import { FormWizard } from '@/features/support-application/components/FormWizard';
import {
  APP_BAR_HEIGHT,
  AppLayout,
} from '@/shared/components/layout/AppLayout';

export const ApplicationPage = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <Container
        component="main"
        maxWidth="lg"
        aria-label="Social Support Application"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
          py: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            maxWidth: 900,
            borderRadius: 4,
            p: { xs: 3, sm: 5 },
          }}
        >
          <ApplicationFormProvider>
            <Stack spacing={3}>
              <Typography variant="body1" color="text.secondary">
                {t('appSubtitle')}
              </Typography>

              <FormWizard />
            </Stack>
          </ApplicationFormProvider>
        </Paper>
      </Container>
    </AppLayout>
  );
};
