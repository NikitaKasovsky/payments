import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Сервисы
import { ApiService } from 'src/app/services';

// Кастомный валидатор
import { numberPositiveValidator } from 'src/app/validators';

// Корневой компонент платежей "вьюшка платежей"
@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnDestroy {

  constructor(
    private readonly api: ApiService
  ) { }

  // Форма добавления элемента в таблицу платежей
  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    costPerDay: new FormControl(null, numberPositiveValidator)
  });

  // Подписки
  private subs: Subscription = new Subscription();

  /**
   * Добавление платежа
   */
  public add(): void {
    const { name, costPerDay } = this.form.value;

    this.subs.add(this.api.createPayment({ name, cost: costPerDay })
      .subscribe(() => this.form.reset()));
  }

  // ----------------------------------------------------
  /**
   * Уничтожение компонента
   */
  public ngOnDestroy(): void  {
    this.subs.unsubscribe();
  }
}
