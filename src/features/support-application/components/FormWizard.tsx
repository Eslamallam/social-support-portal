import Stack from '@mui/material/Stack';

import { useApplicationForm } from '../hooks/useApplicationForm';
import { useStepManager } from '../hooks/useStepManager';
import type { ApplicationFormData } from '../types/application.types';
import { ApplicationStepper } from './ApplicationStepper';
import { FormNavigation } from './FormNavigation';
import { StepRenderer } from './StepRenderer';

export const FormWizard = () => {
  const { handleSubmit } = useApplicationForm();
  const {
    currentStep,
    goToNext,
    goToPrevious,
    resetSteps,
    isFirstStep,
    isLastStep,
  } = useStepManager();

  const onSubmit = async (data: ApplicationFormData) => {
    console.log('Form submitted:', data);
    resetSteps();
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
