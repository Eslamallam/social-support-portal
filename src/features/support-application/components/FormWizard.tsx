import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Stack from '@mui/material/Stack';

import { LoadingOverlay, SuccessDialog } from '@/shared/components';

import { useFormWizardContext } from '../contexts/FormWizardContext';
import { useApplicationForm } from '../hooks/useApplicationForm';
import { useStepManager } from '../hooks/useStepManager';
import type { ApplicationFormData } from '../types/application.types';
import { ApplicationStepper } from './ApplicationStepper';
import { FormNavigation } from './FormNavigation';
import { StepRenderer } from './StepRenderer';

export const FormWizard = () => {
  const { t } = useTranslation();
  const methods = useApplicationForm();
  const {
    currentStep,
    goToNext,
    goToPrevious,
    resetSteps,
    isFirstStep,
    isLastStep,
  } = useStepManager();
  const { clearSavedData, resetForm, setHasAttemptedSubmit } =
    useFormWizardContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = () => {
    void methods.handleSubmit(onSubmit)();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearSavedData();
    resetForm();
    resetSteps();
    setHasAttemptedSubmit(false);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <Stack spacing={4}>
          <ApplicationStepper activeStep={currentStep} />
          <StepRenderer currentStep={currentStep} />
          <FormNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onNext={goToNext}
            onBack={goToPrevious}
            onSubmit={handleFormSubmit}
          />
        </Stack>
      </form>

      <LoadingOverlay open={isSubmitting} message={t('form.submitting')} />

      <SuccessDialog open={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};
