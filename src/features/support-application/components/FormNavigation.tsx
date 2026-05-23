import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { STEP_FIELD_MAP } from '../constants/stepFieldMap';
import { useFormWizardContext } from '../contexts/FormWizardContext';
import { useApplicationForm } from '../hooks/useApplicationForm';

interface FormNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const FormNavigation = ({
  currentStep,
  isFirstStep,
  isLastStep,
  onNext,
  onBack,
  onSubmit,
}: FormNavigationProps) => {
  const { t } = useTranslation();
  const {
    trigger,
    clearErrors,
    formState: { isSubmitting },
  } = useApplicationForm();
  const { setHasAttemptedSubmit } = useFormWizardContext();

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELD_MAP[currentStep];

    if (!fieldsToValidate) {
      clearErrors();
      onNext();
      return;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      clearErrors();
      onNext();
    }
  };

  const handleBack = () => {
    clearErrors();
    onBack();
  };

  return (
    <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-between' }}>
      <Button
        variant="outlined"
        onClick={handleBack}
        disabled={isFirstStep}
        aria-label={t('navigation.previous')}
      >
        {t('navigation.previous')}
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          variant="contained"
          disabled={isSubmitting}
          onClick={() => {
            setHasAttemptedSubmit(true);
            onSubmit();
          }}
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
