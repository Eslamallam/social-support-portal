import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { useApplicationForm } from '@/features/support-application/hooks/useApplicationForm';
import { FormSelectField } from '@/shared/components/form/FormSelectField';
import { FormTextField } from '@/shared/components/form/FormTextField';

export const FinancialInfoStep = () => {
  const { t } = useTranslation();
  const { control } = useApplicationForm();

  const maritalStatusOptions = (
    ['single', 'married', 'divorced', 'widowed'] as const
  ).map((v) => ({
    value: v,
    label: t(`familyFinancial.maritalStatusOptions.${v}`),
  }));

  const employmentStatusOptions = (
    ['employed', 'unemployed', 'self-employed', 'student', 'retired'] as const
  ).map((v) => ({
    value: v,
    label: t(`familyFinancial.employmentStatusOptions.${v}`),
  }));

  const housingStatusOptions = (['owned', 'rented', 'temporary'] as const).map(
    (v) => ({
      value: v,
      label: t(`familyFinancial.housingStatusOptions.${v}`),
    }),
  );

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
        {t('steps.financialInfo')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {t('familyFinancial.subtitle')}
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1: Marital Status | Dependents */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormSelectField
            name="familyFinancial.maritalStatus"
            control={control}
            label={t('familyFinancial.maritalStatus')}
            options={maritalStatusOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="familyFinancial.dependents"
            control={control}
            label={t('familyFinancial.dependents')}
            type="number"
            slotProps={{ htmlInput: { min: 0, max: 20 } }}
          />
        </Grid>

        {/* Row 2: Employment Status (full width) */}
        <Grid size={{ xs: 12 }}>
          <FormSelectField
            name="familyFinancial.employmentStatus"
            control={control}
            label={t('familyFinancial.employmentStatus')}
            options={employmentStatusOptions}
          />
        </Grid>

        {/* Row 3: Monthly Income | Housing Status */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="familyFinancial.monthlyIncome"
            control={control}
            label={t('familyFinancial.monthlyIncome')}
            type="number"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    {t('familyFinancial.currency')}
                  </InputAdornment>
                ),
              },
              htmlInput: { min: 6000 },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormSelectField
            name="familyFinancial.housingStatus"
            control={control}
            label={t('familyFinancial.housingStatus')}
            options={housingStatusOptions}
          />
        </Grid>
      </Grid>
    </>
  );
};
