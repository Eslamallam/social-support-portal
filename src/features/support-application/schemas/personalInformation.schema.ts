import { z } from 'zod';

export const personalInformationSchema = z.object({
  fullName: z.string().min(1, 'validation.fullName.required'),
  nationalId: z
    .string()
    .min(1, 'validation.nationalId.required')
    .min(5, 'validation.nationalId.minLength'),
  dateOfBirth: z
    .string()
    .min(1, 'validation.dateOfBirth.required')
    .refine(
      (value) => !value || new Date(value) <= new Date(),
      'validation.dateOfBirth.future',
    ),
  gender: z.enum(['male', 'female'], {
    error: 'validation.gender.required',
  }),
  address: z.string().min(1, 'validation.address.required'),
  city: z.string().min(1, 'validation.city.required'),
  state: z.string().min(1, 'validation.state.required'),
  country: z.string().min(1, 'validation.country.required'),
  phoneNumber: z
    .string()
    .min(1, 'validation.phoneNumber.required')
    .regex(/^[0-9+\-\s()]+$/, 'validation.phoneNumber.invalid')
    .refine(
      (value) => value.replace(/\D/g, '').length >= 10,
      'validation.phoneNumber.minDigits',
    ),
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
});
