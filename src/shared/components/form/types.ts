import { type Control, type FieldValues, type Path } from 'react-hook-form';

export interface BaseFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}
