import { type FinancialInformation } from './financialInformation.types';
import { type PersonalInformation } from './personalInformation.types';
import { type SituationDetails } from './situationDetails.types';

export interface ApplicationFormData {
  personalInfo: PersonalInformation;
  familyFinancial: FinancialInformation;
  situation: SituationDetails;
}
