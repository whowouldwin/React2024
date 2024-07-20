import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }
  return error.message || 'An unknown error occurred';
};