import { z } from 'zod';

export const personalInformationSchema = z.object({
  fullName: z
    .string()
    .min(1, 'validation.fullName.required')
    .min(2, 'validation.fullName.minLength')
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'validation.fullName.lettersOnly'),
  nationalId: z
    .string()
    .min(1, 'validation.nationalId.required')
    .min(5, 'validation.nationalId.minLength')
    .regex(/^[a-zA-Z0-9]+$/, 'validation.nationalId.alphanumeric'),
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
  city: z
    .string()
    .min(1, 'validation.city.required')
    .min(2, 'validation.city.minLength')
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'validation.city.lettersOnly'),
  state: z
    .string()
    .min(1, 'validation.state.required')
    .min(2, 'validation.state.minLength')
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'validation.state.lettersOnly'),
  country: z.string().min(1, 'validation.country.required'),
  phoneNumber: z
    .string()
    .min(1, 'validation.phoneNumber.required')
    .regex(/^\+[1-9]\d{6,14}$/, 'validation.phoneNumber.invalid')
    .refine(
      (value) => value.replace(/\D/g, '').length >= 10,
      'validation.phoneNumber.minDigits',
    ),
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
});
