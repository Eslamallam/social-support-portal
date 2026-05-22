import { useFormContext } from 'react-hook-form';

import type { ApplicationFormData } from '../types/application.types';

export const useApplicationForm = () => useFormContext<ApplicationFormData>();
