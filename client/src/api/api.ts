export const API_ROOT = 'http://localhost:5000';

export interface ResponseErrorType {
  messages: string[];
  fields?: string[];
}

export function isSuccessResponse<Type extends Object>(response: Type | ResponseErrorType): response is Type {
  return "token" in response || "id" in response;
}

export function filterFieldErrors(errorObj: ResponseErrorType, fields: string[]): ResponseErrorType {
  if (!errorObj.fields) {
    return errorObj;
  }

  const hasErrors = errorObj.fields.some(field => fields.includes(field));
  return hasErrors ? errorObj : { messages: [], fields: [] };
}