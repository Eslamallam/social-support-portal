import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import type { PropsWithChildren } from 'react';

import { defaultValues } from '../constants/defaultValues';
import { applicationSchema } from '../schemas/application.schema';
import type { ApplicationFormData } from '../types/application.types';

export const ApplicationFormProvider = ({ children }: PropsWithChildren) => {
  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
    mode: 'onTouched',
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
