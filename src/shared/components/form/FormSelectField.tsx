import { Controller, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { type BaseFormFieldProps } from './types';

export interface SelectOption {
  label: string;
  value: string;
}

type FormSelectFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  options: SelectOption[];
};

export const FormSelectField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  options,
}: FormSelectFieldProps<T>) => {
  const { t } = useTranslation();
  const labelId = `${String(name)}-label`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth
          variant="outlined"
          required={required}
          disabled={disabled}
          error={Boolean(fieldState.error)}
        >
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...field}
            value={field.value ?? ''}
            labelId={labelId}
            label={label}
            displayEmpty={Boolean(placeholder)}
          >
            {placeholder ? (
              <MenuItem disabled value="">
                {placeholder}
              </MenuItem>
            ) : null}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error?.message ? (
            <FormHelperText>{t(fieldState.error.message)}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};
