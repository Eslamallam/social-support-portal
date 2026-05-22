import type { ApplicationFormData } from '../types/application.types';

export const STEP_FIELD_MAP: Record<number, (keyof ApplicationFormData)[]> = {
  0: ['personalInfo'],
  1: ['familyFinancial'],
  2: ['situation'],
};
