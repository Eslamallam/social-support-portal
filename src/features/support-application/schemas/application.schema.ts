import { z } from 'zod';

import { financialInformationSchema } from './financialInformation.schema';
import { personalInformationSchema } from './personalInformation.schema';
import { situationDetailsSchema } from './situationDetails.schema';

export const applicationSchema = z.object({
  personalInfo: personalInformationSchema,
  familyFinancial: financialInformationSchema,
  situation: situationDetailsSchema,
});

export type ApplicationSchemaType = z.infer<typeof applicationSchema>;
