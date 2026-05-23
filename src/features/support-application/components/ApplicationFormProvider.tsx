import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { type PropsWithChildren, useState } from 'react';

import { defaultValues } from '../constants/defaultValues';
import { FormWizardContext } from '../contexts/FormWizardContext';
import {
  loadSavedFormData,
  useFormPersistence,
} from '../hooks/useFormPersistence';
import { applicationSchema } from '../schemas/application.schema';
import type { ApplicationFormData } from '../types/application.types';

export const ApplicationFormProvider = ({ children }: PropsWithChildren) => {
  const savedData = loadSavedFormData();

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: savedData
      ? { ...defaultValues, ...savedData }
      : defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { clearSavedData } = useFormPersistence(methods);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const resetForm = (values: ApplicationFormData = defaultValues) => {
    methods.reset(values);
  };

  return (
    <FormWizardContext.Provider
      value={{
        clearSavedData,
        resetForm,
        hasAttemptedSubmit,
        setHasAttemptedSubmit,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormWizardContext.Provider>
  );
};
