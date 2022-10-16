import { FormField } from "../types/formField";

export function formatFormFromObject(formObject: Record<string, any>, fields: FormField[]): Record<string, string> {
  const formattedFormObject: Record<string, string> = {};
  for (const key in formObject) {
    if (typeof formObject[key] === 'string') {
      formattedFormObject[key] = formObject[key].value;
      continue;
    }

    const value = formObject[key];
    const type = fields.find((field) => field.name === key)?.type;

    if (type === 'number') {
      formattedFormObject[key] = value ?? '0';
      continue;
    }
    
    formattedFormObject[key] = String(formObject[key]);
  }
  return formattedFormObject;
}