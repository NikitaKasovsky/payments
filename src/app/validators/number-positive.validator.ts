import { FormControl } from '@angular/forms';

// Валидатор положительности числа
export function numberPositiveValidator(control: FormControl): {[error: string]: boolean} | null {
  if (control?.value > 0) {
    return null;
  }

  return { nonPositive: true };
}
