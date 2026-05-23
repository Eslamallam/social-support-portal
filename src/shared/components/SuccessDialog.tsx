import { useTranslation } from 'react-i18next';

import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessDialog = ({ open, onClose }: SuccessDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      aria-labelledby="success-dialog-title"
    >
      <DialogContent>
        <Stack spacing={2} sx={{ py: 3, alignItems: 'center' }}>
          <CheckCircleOutlined
            sx={{
              fontSize: 72,
              color: 'success.main',
              animation: 'pop 0.4s ease-out',
              '@keyframes pop': {
                '0%': { transform: 'scale(0)', opacity: 0 },
                '70%': { transform: 'scale(1.2)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          />
          <Typography
            variant="h6"
            id="success-dialog-title"
            sx={{ fontWeight: 600, textAlign: 'center' }}
          >
            {t('form.successTitle')}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            {t('form.successMessage')}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          size="large"
          aria-label={t('form.successClose')}
        >
          {t('form.successClose')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
