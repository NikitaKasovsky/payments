import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Компоненты
import { PaymentViewComponent } from './payment-view.component';

// Сервисы
import { ApiService } from 'src/app/services';

describe('PaymentViewComponent', () => {
  let component: PaymentViewComponent;
  let fixture: ComponentFixture<PaymentViewComponent>;
  let de;
  let api;
  @Component({
    selector: 'app-payment-table',
    template: ''
  })
  class TestPaymentTableComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentViewComponent,
        TestPaymentTableComponent
      ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            createPayment: jasmine.createSpy('createPayment').and.returnValue(of({}))
          }
        }
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaymentViewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    api = TestBed.get(ApiService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be render selectors', () => {
    expect(de.queryAll(By.css('.add-payment__input')).length).toEqual(2);
    expect(de.query(By.css('button'))).toBeTruthy();
    expect(de.query(By.css('app-payment-table'))).toBeTruthy();
  });

  it('should be set value to form', () => {
    expect(component.form.invalid).toBeTruthy();
    expect(de.query(By.css('button')).nativeElement.disabled).toBeTruthy();

    component.form.setValue({
      name: 'test',
      costPerDay: 100
    });
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    expect(de.query(By.css('button')).nativeElement.disabled).toBeFalsy();
  });

  it('should be create payment', fakeAsync(() => {
    component.form.setValue({
      name: 'test',
      costPerDay: 100
    });
    fixture.detectChanges();
    de.query(By.css('button')).triggerEventHandler('click');

    expect(api.createPayment).toHaveBeenCalledWith({
      name: 'test',
      cost: 100,
    });

    tick();
    expect(component.form.value).toEqual({name: null, costPerDay: null});
  }));
});
