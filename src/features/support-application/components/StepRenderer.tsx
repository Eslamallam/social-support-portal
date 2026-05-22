import Typography from '@mui/material/Typography';

const PersonalInfoStep = () => (
  <Typography color="text.secondary">
    Personal Information form coming soon.
  </Typography>
);

const FinancialInfoStep = () => (
  <Typography color="text.secondary">
    Family & Financial Information form coming soon.
  </Typography>
);

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
