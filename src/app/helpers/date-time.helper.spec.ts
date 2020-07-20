import { daysInMonth } from './date-time.helper';

describe('date-time.helper', () => {
  it('should be return count days on month', () => {
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    expect(daysInMonth(now.getMonth(), now.getFullYear())).toEqual(days);
  });
});
