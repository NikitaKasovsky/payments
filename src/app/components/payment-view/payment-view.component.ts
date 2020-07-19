import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Корневой компонент платежей "вьюшка платежей"
@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {

  constructor() { }

  // Форма добавления элемента в таблицу платежей
  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    costPerDay: new FormControl(null)
  });

  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {}

}
