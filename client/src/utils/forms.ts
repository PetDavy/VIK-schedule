import { FormField } from "../types/formField";

export function formatFormFromObject(formObject: Record<string, any>, fields: FormField[]): Record<string, string> {
  const formattedFormObject: Record<string, string> = {};
  for (const key in formObject) {
    
    const value = formObject[key];
    const type = fields.find((field) => field.name === key)?.type;
    
    if (type === 'number' || type === 'range') {
      formattedFormObject[key] = value ?? '0';
      continue;
    }
    
    if (type === 'time') {
      const [hour, min] = value.split(':');
      formattedFormObject[key] = `${hour}:${min}`;
      continue;
    }

    if (typeof value === 'string') {
      formattedFormObject[key] = value;
      continue;
    }
    
    formattedFormObject[key] = String(formObject[key]);
  }
  return formattedFormObject;
}

export function formatFormToObject(formObject: Record<string, any>, fields: FormField[]): Record<string, any> {
  const formattedFormObject: Record<string, any> = {};
  for (const key in formObject) {
    const value = formObject[key];
    const apiField = fields.find((field) => field.name === key);

    if (!apiField) {
      continue;
    }

    const type = apiField?.type;

    if (type === 'number') {
      formattedFormObject[key] = Number(value);
      continue;
    }

    formattedFormObject[key] = value;
  }
  return formattedFormObject;
}