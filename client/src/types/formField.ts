export interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  invalid: boolean;
  label: string | undefined;
  controlText: string | undefined;
}

export function createFormField(data: Partial<FormField> & {name: string}): FormField {
  return {
    type: 'text',
    placeholder: '',
    required: false,
    disabled: false,
    invalid: false,
    label: undefined,
    controlText: undefined,
    ...data
  }
}