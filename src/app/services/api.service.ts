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
   * @param {IPaymentCreateRequest} request - объект с полями name: string, cost: number
   * @return {Observable<string>} - обзерабл
   */
  public createPayment(request: IPaymentCreateRequest): Observable<string> {
    const { name, cost } = request;

    this.payments.push({
      id: this.payments.length,
      name,
      cost,
      months: []
    });

    return of('200');
  }

  /**
   * Получить список платежей
   * @return {Observable<IPayment[]>} - обзерабл
   */
  public getPayments(): Observable<IPayment[]> {
    return of(this.payments);
  }

  /**
   * Удалить платеж
   * @param {number} id - id платежа
   * @return {Observable<string>} - обзерабл
   */
  public deletePayment(id: number): Observable<string> {
    this.payments.splice(this.payments.findIndex((item: IPayment) => item.id === id), 1);

    return of('200');
  }
}
