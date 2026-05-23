import { useEffect } from 'react';

import { FinancialInfoStep } from '@/features/support-application/steps/FinancialInfoStep';
import { PersonalInfoStep } from '@/features/support-application/steps/PersonalInfoStep';
import { SituationDetailsStep } from '@/features/support-application/steps/SituationDetailsStep';

import { useApplicationForm } from '../hooks/useApplicationForm';

interface StepRendererProps {
  currentStep: number;
}

export const StepRenderer = ({ currentStep }: StepRendererProps) => {
  const { clearErrors } = useApplicationForm();

  useEffect(() => {
    clearErrors();
  }, [currentStep, clearErrors]);

  switch (currentStep) {
    case 0:
      return <PersonalInfoStep />;
    case 1:
      return <FinancialInfoStep />;
    case 2:
      return <SituationDetailsStep />;
    default:
      return null;
  }
};
