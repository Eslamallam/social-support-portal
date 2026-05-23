import { z } from 'zod';

export const financialInformationSchema = z.object({
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    error: 'Please select a marital status',
  }),
  dependents: z
    .number({
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'Dependents must be a number'
          : undefined,
    })
    .min(0, 'Dependents cannot be negative'),
  employmentStatus: z.enum(
    ['employed', 'unemployed', 'self-employed', 'student', 'retired'],
    {
      error: 'Please select an employment status',
    },
  ),
  monthlyIncome: z
    .number({
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'Monthly income must be a number'
          : undefined,
    })
    .min(0, 'validation.monthlyIncome.min'),
  housingStatus: z.enum(['owned', 'rented', 'temporary'], {
    error: 'Please select a housing status',
  }),
});
