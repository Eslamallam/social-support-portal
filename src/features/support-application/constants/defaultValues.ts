import type { ApplicationFormData } from '../types/application.types';

export const defaultValues: ApplicationFormData = {
  personalInfo: {
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '' as ApplicationFormData['personalInfo']['gender'],
    address: '',
    city: '',
    state: '',
    country: '',
    phoneNumber: '',
    email: '',
  },
  familyFinancial: {
    maritalStatus:
      '' as ApplicationFormData['familyFinancial']['maritalStatus'],
    dependents: 0,
    employmentStatus:
      '' as ApplicationFormData['familyFinancial']['employmentStatus'],
    monthlyIncome: 0,
    housingStatus:
      '' as ApplicationFormData['familyFinancial']['housingStatus'],
  },
  situation: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};
