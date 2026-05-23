import { z } from 'zod';

export const situationDetailsSchema = z.object({
  financialSituation: z
    .string()
    .min(1, 'validation.financialSituation.required')
    .min(20, 'validation.financialSituation.minLength'),
  employmentCircumstances: z
    .string()
    .min(1, 'validation.employmentCircumstances.required')
    .min(20, 'validation.employmentCircumstances.minLength'),
  reasonForApplying: z
    .string()
    .min(1, 'validation.reasonForApplying.required')
    .min(20, 'validation.reasonForApplying.minLength'),
});
