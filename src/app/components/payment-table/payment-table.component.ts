import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

// Сервисы
import { ApiService } from 'src/app/services';

// Интерфейсы
import { IPayment } from 'src/app/interfaces';

// Хелперы
import { daysInMonth } from 'src/app/helpers';

// Константа с месяцами
const MONTHS = [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

// Компонент "Таблица платежей"
@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit, OnDestroy {

  constructor(
    private readonly api: ApiService
  ) { }

  // Общая сумма израсходованных средств
  @Output() cost: EventEmitter<number> = new EventEmitter<number>();

  // Список платежей
  public payments: IPayment[] = [];

  // Месяцы
  public months = MONTHS;

  // Подписки
  private subs: Subscription = new Subscription();

  /**
   * Загрузить список платежей
   */
  private loadPayments(): void {
    this.subs.add(this.api.getPayments()
      .subscribe((items: IPayment[]) => {
        this.payments = items;
        this.culcTotalCost();
      }));
  }

  /**
   * Удаление элемента из списки
   * @param {number} id - id платежа (*)
   */
  public delete(id: number): void {
    this.subs.add(this.api.deletePayment(id)
      .subscribe(this.loadPayments.bind(this)));
  }

  /**
   * Детектим изменения количества отмеченных месяцев
   * @param {number} id - id платежа (*)
   * @param {number} i - индекс в массиве месяцев (*)
   */
  public changeMonthCost(id: number, i: number): void {
    const payment = this.payments.find((item: IPayment) => item.id === id);

    if (payment.months.length && !!payment.months.find((month: number) => month === i)) {
      payment.months.splice(payment.months.findIndex((item: number) => item === i), 1);
    } else {
      payment.months.push(i);
    }

    this.culcTotalCost();
  }

  /**
   * Считаем итоговую сумму израсходованных средств
   */
  private culcTotalCost(): void {
    const currentYear = new Date().getFullYear();
    const total = this.payments.map((payment: IPayment) => {
      return {
        id: payment.id,
        days: payment.months.map((month: number) => {
          return daysInMonth(month, currentYear);
        })
      };
    }).map(item => {
      const days = item.days.reduce((a, b) => a + b, 0);
      const payment: IPayment = this.payments.find((pay: IPayment) => pay.id === item.id);
      return  days * payment.cost
    });

    this.cost.emit(total.reduce((a, b) => a + b, 0));
  }

  // ----------------------------------------------------
  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {
    this.loadPayments();
  }

  /**
   * Уничтожение компонента
   */
  public ngOnDestroy(): void  {
    this.subs.unsubscribe();
  }
}
