import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Сервисы
import { ApiService } from 'src/app/services';

// Компоненты
import { PaymentTableComponent } from './payment-table.component';

// Интерфейсы
import { IPayment } from 'src/app/interfaces';

describe('PaymentTableComponent', () => {
  let component: PaymentTableComponent;
  let fixture: ComponentFixture<PaymentTableComponent>;
  let de;
  let api;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTableComponent ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getPayments: jasmine.createSpy('getPayments').and.returnValue(of([
              {
                id: 0,
                name: 'test',
                cost: 100,
                months: []
              },
              {
                id: 1,
                name: 'test',
                cost: 100,
                months: []
              }
            ])),
            createPayment: jasmine.createSpy('createPayment').and.returnValue(of({})),
            deletePayment: jasmine.createSpy('deletePayment').and.returnValue(of('200')),
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaymentTableComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    api = TestBed.get(ApiService);
  }));

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be render table', () => {
    fixture.detectChanges();
    expect(de.query(By.css('.table__head'))).toBeTruthy();
    expect(de.queryAll(By.css('th')).length).toEqual(15);
    expect(de.query(By.css('tr'))).toBeTruthy();
  });

  it('should be load payments', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(de.queryAll(By.css('.table__row')).length).toEqual(2);
  }));

  it('should be delete payment', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(de.queryAll(By.css('.table__row')).length).toEqual(2);

    de.query(By.css('.table__remove-button')).triggerEventHandler('click');
    expect(api.deletePayment).toHaveBeenCalledWith(0);
    tick();

    expect(api.getPayments).toHaveBeenCalled();
  }));

  it('should', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.totalCost).toEqual(0);
    const list: IPayment[] = component.payments;
    list.forEach((payment: IPayment) => {
      expect(payment.months.length).toEqual(0);
    });

    de.query(By.css('.table__checkbox')).triggerEventHandler('change');

    expect(list[0].months.length).toEqual(1);
    expect(component.totalCost).toEqual(3100);
  }));
});
