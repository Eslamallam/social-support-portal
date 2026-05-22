import { Controller, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField, { type TextFieldProps } from '@mui/material/TextField';

import { type BaseFormFieldProps } from './types';

type FormTextFieldType = 'date' | 'email' | 'number' | 'tel' | 'text';

type FormTextFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  type?: FormTextFieldType;
  slotProps?: TextFieldProps['slotProps'];
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
}: FormTextFieldProps<T>) => {
  const { t } = useTranslation();

  // For date inputs the label must shrink so it doesn't overlap the browser's
  // native date value. Caller-supplied slotProps are spread after, so any
  // explicit inputLabel from the caller takes precedence.
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
        // Number inputs: native <input type="number"> always yields a string.
        // We store NaN for an empty field so Zod's invalid_type check catches
        // it, and display '' so the input appears empty to the user.
        const isNumber = type === 'number';
        const value = isNumber
          ? Number.isNaN(field.value as number)
            ? ''
            : field.value
          : field.value;

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
            fullWidth
            variant="outlined"
            error={Boolean(fieldState.error)}
            helperText={
              fieldState.error?.message
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
