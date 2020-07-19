import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

// Интерфейсы
import { IPayment, IPaymentCreateRequest } from '../interfaces';

// Апи сервис
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Все добавленные платежи
  private payments: IPayment[] = [];

  /**
   * Создать платеж
   */
  public createPayment(request: IPaymentCreateRequest): Observable<string> {
    const { name, cost } = request;

    this.payments.push({
      id: this.payments.length,
      name,
      cost,
      months: 1
    });

    return of('200');
  }

  /**
   * Получить список платежей
   */
  public getPayments(): Observable<IPayment[]> {
    return of(this.payments);
  }

  /**
   * Удалить платеж
   */
  public deletePayment(id: number): Observable<string> {
    this.payments.splice(this.payments.findIndex((item: IPayment) => item.id === id), 1);

    return of('200');
  }
}
