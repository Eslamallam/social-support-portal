import { Controller, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField, { type TextFieldProps } from '@mui/material/TextField';

import { useFormWizardContext } from '@/features/support-application/contexts/FormWizardContext';

import { type BaseFormFieldProps } from './types';

type FormTextFieldType = 'date' | 'email' | 'number' | 'tel' | 'text';

type FormTextFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  type?: FormTextFieldType;
  slotProps?: TextFieldProps['slotProps'];
  multiline?: boolean;
  rows?: number;
  hideErrorsUntilSubmit?: boolean;
};

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  type = 'text',
  slotProps,
  multiline,
  rows,
  hideErrorsUntilSubmit = false,
}: FormTextFieldProps<T>) => {
  const { t } = useTranslation();
  const { hasAttemptedSubmit } = useFormWizardContext();

  const resolvedSlotProps =
    type === 'date'
      ? ({
          inputLabel: { shrink: true },
          ...slotProps,
        } as TextFieldProps['slotProps'])
      : slotProps;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const isNumber = type === 'number';
        const value = isNumber
          ? Number.isNaN(field.value as number)
            ? ''
            : field.value
          : field.value;

        const hasError = Boolean(fieldState.error);
        const showError = hideErrorsUntilSubmit
          ? hasError && hasAttemptedSubmit
          : hasError;

        return (
          <TextField
            {...field}
            value={value}
            onChange={
              isNumber
                ? (e) =>
                    field.onChange(
                      e.target.value === '' ? NaN : Number(e.target.value),
                    )
                : field.onChange
            }
            label={label}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth
            variant="outlined"
            error={showError}
            helperText={
              showError && fieldState.error?.message
                ? t(fieldState.error.message)
                : undefined
            }
            slotProps={resolvedSlotProps}
          />
        );
      }}
    />
  );
};
