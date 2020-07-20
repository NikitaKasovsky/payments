import { numberPositiveValidator } from './number-positive.validator';
import { FormControl } from '@angular/forms';

describe('number-positiove.validator', () => {
  it('should return validity error', () => {
    const control = new FormControl(1);

    expect(numberPositiveValidator(control.value)).toBeTruthy();
  });
});
