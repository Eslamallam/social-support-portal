import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getCountryList } from '../../../shared/utils/countries';
import type { CountryOption } from '../../../shared/utils/countries';
import { useApplicationForm } from '../hooks/useApplicationForm';

export const PersonalInfoStep = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useApplicationForm();

  const countryList = getCountryList(i18n.language);
  const todayISO = new Date().toISOString().split('T')[0];

  const te = (msg?: string) => (msg ? t(msg) : undefined);

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
          <TextField
            label={t('personalInfo.fullName')}
            {...register('personalInfo.fullName')}
            error={!!errors.personalInfo?.fullName}
            helperText={te(errors.personalInfo?.fullName?.message)}
            fullWidth
          />
        </Grid>

        {/* Row 2: National ID | Date of Birth */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.nationalId')}
            {...register('personalInfo.nationalId')}
            error={!!errors.personalInfo?.nationalId}
            helperText={te(errors.personalInfo?.nationalId?.message)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.dateOfBirth')}
            type="date"
            {...register('personalInfo.dateOfBirth')}
            error={!!errors.personalInfo?.dateOfBirth}
            helperText={te(errors.personalInfo?.dateOfBirth?.message)}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { max: todayISO },
            }}
          />
        </Grid>

        {/* Row 3: Gender | Phone Number */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.gender')}
            select
            defaultValue=""
            {...register('personalInfo.gender')}
            error={!!errors.personalInfo?.gender}
            helperText={te(errors.personalInfo?.gender?.message)}
            fullWidth
          >
            <MenuItem value="male">
              {t('personalInfo.genderOptions.male')}
            </MenuItem>
            <MenuItem value="female">
              {t('personalInfo.genderOptions.female')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.phoneNumber')}
            type="tel"
            {...register('personalInfo.phoneNumber')}
            error={!!errors.personalInfo?.phoneNumber}
            helperText={te(errors.personalInfo?.phoneNumber?.message)}
            fullWidth
          />
        </Grid>

        {/* Row 4: Email */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label={t('personalInfo.email')}
            type="email"
            {...register('personalInfo.email')}
            error={!!errors.personalInfo?.email}
            helperText={te(errors.personalInfo?.email?.message)}
            fullWidth
          />
        </Grid>

        {/* Row 5: Address */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label={t('personalInfo.address')}
            {...register('personalInfo.address')}
            error={!!errors.personalInfo?.address}
            helperText={te(errors.personalInfo?.address?.message)}
            fullWidth
          />
        </Grid>

        {/* Row 6: City | State */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.city')}
            {...register('personalInfo.city')}
            error={!!errors.personalInfo?.city}
            helperText={te(errors.personalInfo?.city?.message)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('personalInfo.state')}
            {...register('personalInfo.state')}
            error={!!errors.personalInfo?.state}
            helperText={te(errors.personalInfo?.state?.message)}
            fullWidth
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
                    helperText={te(error?.message)}
                    fullWidth
                  />
                )}
                slotProps={{
                  paper: {
                    sx: { maxHeight: 300 },
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
