import { z } from 'zod';

export const situationDetailsSchema = z.object({
  financialSituation: z
    .string()
    .min(1, 'Financial situation is required')
    .min(20, 'Please provide at least 20 characters'),
  employmentCircumstances: z
    .string()
    .min(1, 'Employment circumstances are required')
    .min(20, 'Please provide at least 20 characters'),
  reasonForApplying: z
    .string()
    .min(1, 'Reason for applying is required')
    .min(20, 'Please provide at least 20 characters'),
});
