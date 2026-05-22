import { Controller, type FieldValues } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { type BaseFormFieldProps } from './types';

type FormTextareaFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  minRows?: number;
  maxRows?: number;
};

export const FormTextareaField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  minRows = 4,
  maxRows,
}: FormTextareaFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          multiline
          minRows={minRows}
          maxRows={maxRows}
          fullWidth
          variant="outlined"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
