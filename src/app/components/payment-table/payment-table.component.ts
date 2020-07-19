import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Сервисы
import { ApiService } from 'src/app/services';

// Интерфейсы
import { IPayment } from 'src/app/interfaces';

// Временная константа с месяцами
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
      }));
  }

  /**
   * Удаление элемента из списки
   */
  public delete(id: number): void {
    this.subs.add(this.api.deletePayment(id)
      .subscribe(this.loadPayments.bind(this)));
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
