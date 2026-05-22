export const FORM_STEPS = [
  'steps.personalInfo',
  'steps.financialInfo',
  'steps.situationDetails',
] as const;

export type FormStep = (typeof FORM_STEPS)[number];
