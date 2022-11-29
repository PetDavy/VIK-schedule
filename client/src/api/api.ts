export const API_ROOT = 'http://localhost:5000';

export interface ResponseErrorType {
  messages: string[];
  fields?: string[];
}

export function isSuccessResponse<Type>(response: Type | ResponseErrorType): response is Type {
  return "token" in response;
}