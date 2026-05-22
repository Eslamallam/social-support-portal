import { useCallback, useState } from 'react';

import { FORM_STEPS } from '../constants/formSteps';

const STEP_STORAGE_KEY = 'social-support-current-step';

export const useStepManager = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STEP_STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, FORM_STEPS.length - 1);
      localStorage.setItem(STEP_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 0);
      localStorage.setItem(STEP_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
    localStorage.removeItem(STEP_STORAGE_KEY);
  }, []);

  return {
    currentStep,
    totalSteps: FORM_STEPS.length,
    goToNext,
    goToPrevious,
    resetSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === FORM_STEPS.length - 1,
  };
};
