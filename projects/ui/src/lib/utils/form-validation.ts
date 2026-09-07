import { ValidationError } from '@angular/forms/signals';

export type TpValidationErrors = readonly ValidationError.WithOptionalFieldTree[];

let nextErrorId = 0;

export function createValidationErrorId(prefix: string): string {
  nextErrorId += 1;
  return `${prefix}-${nextErrorId}`;
}

export function validationErrorMessage(
  errors: TpValidationErrors,
  fallback: string,
): string {
  return errors.find((error) => !!error.message)?.message ?? fallback;
}
