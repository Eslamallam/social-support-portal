import { useTranslation } from 'react-i18next';

import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FormTextField } from '@/shared/components/form';

import { useApplicationForm } from '../hooks/useApplicationForm';

interface SituationTextFieldProps {
  name: string;
  label: string;
  onAIAssist: (currentValue: string) => void;
}

export const SituationTextField = ({
  name,
  label,
  onAIAssist,
}: SituationTextFieldProps) => {
  const { t } = useTranslation();
  const { control, getValues } = useApplicationForm();

  return (
    <Box>
      <FormTextField
        name={name as never}
        control={control}
        label={label}
        multiline
        rows={4}
        hideErrorsUntilSubmit
        slotProps={{
          htmlInput: { maxLength: 1000 },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AutoAwesomeOutlined />}
          onClick={() =>
            onAIAssist((getValues(name as never) as unknown as string) ?? '')
          }
          aria-label={t('aiAssistant.helpMeWrite')}
        >
          {t('aiAssistant.helpMeWrite')}
        </Button>
      </Box>
    </Box>
  );
};
