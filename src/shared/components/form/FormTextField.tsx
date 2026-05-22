import { Controller, type FieldValues } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { type BaseFormFieldProps } from './types';

type FormTextFieldType = 'date' | 'email' | 'tel' | 'text';

type FormTextFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  type?: FormTextFieldType;
};

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  type = 'text',
}: FormTextFieldProps<T>) => {
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
          type={type}
          fullWidth
          variant="outlined"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
