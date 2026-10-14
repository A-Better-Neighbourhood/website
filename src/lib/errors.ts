/** @format */

import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (!error.response) {
      return "We couldn't reach the server. Check your connection and try again.";
    }
  }
  return "Something went wrong. Please try again.";
}
