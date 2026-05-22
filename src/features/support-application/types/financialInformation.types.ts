export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type EmploymentStatus =
  | 'employed'
  | 'unemployed'
  | 'self-employed'
  | 'student'
  | 'retired';

export type HousingStatus = 'owned' | 'rented' | 'temporary';

export interface FinancialInformation {
  maritalStatus: MaritalStatus;
  dependents: number;
  employmentStatus: EmploymentStatus;
  monthlyIncome: number;
  housingStatus: HousingStatus;
}
