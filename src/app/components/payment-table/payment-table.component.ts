import { Component, OnInit } from '@angular/core';

// Временная константа с месяцами
const MONTHS = [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

// Компонент "Таблица платежей"
@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {

  constructor() { }

  // Месяцы
  public months = MONTHS;

  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {}

}
