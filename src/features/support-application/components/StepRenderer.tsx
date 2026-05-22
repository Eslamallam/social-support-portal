import Typography from '@mui/material/Typography';

import { FinancialInfoStep } from '@/features/support-application/steps/FinancialInfoStep';
import { PersonalInfoStep } from '@/features/support-application/steps/PersonalInfoStep';

const SituationDetailsStep = () => (
  <Typography color="text.secondary">
    Situation Details form coming soon.
  </Typography>
);

interface StepRendererProps {
  currentStep: number;
}

export const StepRenderer = ({ currentStep }: StepRendererProps) => {
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
