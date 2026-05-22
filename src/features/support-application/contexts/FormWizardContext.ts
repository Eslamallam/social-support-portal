import { createContext, useContext } from 'react';

import type { ApplicationFormData } from '../types/application.types';

export interface FormWizardContextValue {
  clearSavedData: () => void;
  resetForm: (values?: ApplicationFormData) => void;
}

export const FormWizardContext = createContext<FormWizardContextValue | null>(
  null,
);

export const useFormWizardContext = () => {
  const ctx = useContext(FormWizardContext);
  if (!ctx)
    throw new Error(
      'useFormWizardContext must be used inside ApplicationFormProvider',
    );
  return ctx;
};
