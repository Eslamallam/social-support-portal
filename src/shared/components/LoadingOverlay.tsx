import { useTranslation } from 'react-i18next';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
}

export const LoadingOverlay = ({ open, message }: LoadingOverlayProps) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Backdrop
        open={open}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <CircularProgress color="inherit" size={36} />
        <Typography variant="h6" color="inherit">
          {message ?? t('form.submitting')}
        </Typography>
      </Backdrop>
    </Portal>
  );
};
