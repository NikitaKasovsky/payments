import { Injectable } from '@angular/core';

// Интерфейсы
import { IPayment } from '../interfaces';

// Апи сервис
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Все добавленные платежи
  private payments: IPayment[] = [];

  constructor() { }

}
