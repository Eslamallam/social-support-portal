export type Gender = 'male' | 'female';

export interface PersonalInformation {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
}
