import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { STEP_FIELD_MAP } from '../constants/stepFieldMap';
import { useApplicationForm } from '../hooks/useApplicationForm';

interface FormNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const FormNavigation = ({
  currentStep,
  isFirstStep,
  isLastStep,
  onNext,
  onBack,
}: FormNavigationProps) => {
  const { t } = useTranslation();
  const {
    trigger,
    control,
    formState: { isSubmitting },
  } = useApplicationForm();

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELD_MAP[currentStep];
    const hasRegisteredFields = fieldsToValidate.some(
      (field) => field in (control._fields ?? {}),
    );

    if (hasRegisteredFields) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    onNext();
  };

  return (
    <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-between' }}>
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={isFirstStep}
        aria-label={t('navigation.previous')}
      >
        {t('navigation.previous')}
      </Button>

      {isLastStep ? (
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          aria-label={t('navigation.submit')}
        >
          {isSubmitting ? t('navigation.submitting') : t('navigation.submit')}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleNext}
          aria-label={t('navigation.next')}
        >
          {t('navigation.next')}
        </Button>
      )}
    </Stack>
  );
};
