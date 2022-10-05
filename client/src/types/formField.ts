export interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  invalid: boolean;
}

export function createFormField(data: Partial<FormField> & {name: string}): FormField {
  return {
    type: 'text',
    placeholder: '',
    required: false,
    disabled: false,
    invalid: false,
    ...data
  }
}