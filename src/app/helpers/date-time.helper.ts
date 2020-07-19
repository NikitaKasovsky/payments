/**
 * Функция хелпер для работы с датами
 * @param {number} month - Нужно указать необходимый месяц (*)
 * @param {number} year - Нужно указать необходимый год (*)
 * @return {number} вернет количество дней в указанном месяце указанного года
 */
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}
