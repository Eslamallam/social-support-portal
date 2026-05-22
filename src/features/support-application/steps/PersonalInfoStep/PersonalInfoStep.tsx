import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useApplicationForm } from '@/features/support-application/hooks/useApplicationForm';
import { FormSelectField } from '@/shared/components/form/FormSelectField';
import { FormTextField } from '@/shared/components/form/FormTextField';
import { getCountryList } from '@/shared/utils/countries';
import type { CountryOption } from '@/shared/utils/countries';

export const PersonalInfoStep = () => {
  const { t, i18n } = useTranslation();
  const { control, trigger } = useApplicationForm();

  const countryList = getCountryList(i18n.language);
  const todayISO = new Date().toISOString().split('T')[0];

  const genderOptions = [
    { value: 'male', label: t('personalInfo.genderOptions.male') },
    { value: 'female', label: t('personalInfo.genderOptions.female') },
  ];

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
        {t('steps.personalInfo')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {t('personalInfo.subtitle')}
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1: Full Name */}
        <Grid size={{ xs: 12 }}>
          <FormTextField
            name="personalInfo.fullName"
            control={control}
            label={t('personalInfo.fullName')}
          />
        </Grid>

        {/* Row 2: National ID | Date of Birth */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="personalInfo.nationalId"
            control={control}
            label={t('personalInfo.nationalId')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="personalInfo.dateOfBirth"
            control={control}
            label={t('personalInfo.dateOfBirth')}
            type="date"
            slotProps={{ htmlInput: { max: todayISO } }}
          />
        </Grid>

        {/* Row 3: Gender | Phone Number */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormSelectField
            name="personalInfo.gender"
            control={control}
            label={t('personalInfo.gender')}
            options={genderOptions}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="personalInfo.phoneNumber"
            control={control}
            label={t('personalInfo.phoneNumber')}
            type="tel"
          />
        </Grid>

        {/* Row 4: Email */}
        <Grid size={{ xs: 12 }}>
          <FormTextField
            name="personalInfo.email"
            control={control}
            label={t('personalInfo.email')}
            type="email"
          />
        </Grid>

        {/* Row 5: Address */}
        <Grid size={{ xs: 12 }}>
          <FormTextField
            name="personalInfo.address"
            control={control}
            label={t('personalInfo.address')}
          />
        </Grid>

        {/* Row 6: City | State */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="personalInfo.city"
            control={control}
            label={t('personalInfo.city')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="personalInfo.state"
            control={control}
            label={t('personalInfo.state')}
          />
        </Grid>

        {/* Row 7: Country autocomplete */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="personalInfo.country"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                options={countryList}
                getOptionLabel={(option: CountryOption) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                value={countryList.find((c) => c.code === field.value) || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.code ?? '');
                  void trigger('personalInfo.country');
                }}
                onBlur={field.onBlur}
                renderOption={(props, option) => (
                  <li {...props} key={option.code}>
                    <Box
                      component="img"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt={option.name}
                      sx={{ mr: 1.5, flexShrink: 0, width: 20 }}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('personalInfo.country')}
                    error={!!error}
                    helperText={error?.message ? t(error.message) : undefined}
                    fullWidth
                  />
                )}
                slotProps={{
                  paper: { sx: { maxHeight: 300 } },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
