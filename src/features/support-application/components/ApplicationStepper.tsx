import { useTranslation } from 'react-i18next';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FORM_STEPS } from '../constants/formSteps';

interface ApplicationStepperProps {
  activeStep: number;
}

export const ApplicationStepper = ({ activeStep }: ApplicationStepperProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel={!isMobile}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      aria-label={t('applicationProgress')}
      role="navigation"
    >
      {FORM_STEPS.map((stepKey) => (
        <Step key={stepKey}>
          <StepLabel>{t(stepKey)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
