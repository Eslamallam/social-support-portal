import Stack from '@mui/material/Stack';

import { defaultValues } from '../constants/defaultValues';
import { useFormWizardContext } from '../contexts/FormWizardContext';
import { useApplicationForm } from '../hooks/useApplicationForm';
import { useStepManager } from '../hooks/useStepManager';
import type { ApplicationFormData } from '../types/application.types';
import { ApplicationStepper } from './ApplicationStepper';
import { FormNavigation } from './FormNavigation';
import { StepRenderer } from './StepRenderer';

export const FormWizard = () => {
  const { handleSubmit, reset } = useApplicationForm();
  const {
    currentStep,
    goToNext,
    goToPrevious,
    resetSteps,
    isFirstStep,
    isLastStep,
  } = useStepManager();
  const { clearSavedData } = useFormWizardContext();

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      console.log('Form submitted:', data);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearSavedData();
      reset(defaultValues);
      resetSteps();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <ApplicationStepper activeStep={currentStep} />
        <StepRenderer currentStep={currentStep} />
        <FormNavigation
          currentStep={currentStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={goToNext}
          onBack={goToPrevious}
        />
      </Stack>
    </form>
  );
};
