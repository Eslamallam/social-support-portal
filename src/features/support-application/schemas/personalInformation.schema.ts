import { z } from 'zod';

export const personalInformationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  nationalId: z
    .string()
    .min(1, 'National ID is required')
    .min(5, 'National ID must be at least 5 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], {
    error: 'Please select a gender',
  }),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number')
    .refine(
      (value) => value.replace(/\D/g, '').length >= 10,
      'Phone number must contain at least 10 digits',
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});
