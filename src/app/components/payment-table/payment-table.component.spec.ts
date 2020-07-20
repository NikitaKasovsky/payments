import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Сервисы
import { ApiService } from 'src/app/services';

// Компоненты
import { PaymentTableComponent } from './payment-table.component';

// Интерфейсы
import { IPayment } from 'src/app/interfaces';

// Константы
import { MONTHS } from 'src/app/constants';

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
            createPayment: jasmine.createSpy('createPayment').and.returnValue(of({})),
            getPayments: jasmine.createSpy('getPayments').and.returnValue(of([])),
            deletePayment: jasmine.createSpy('deletePayment').and.returnValue(of(''))
          }
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaymentTableComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    api = TestBed.get(ApiService);
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be render table', () => {
    expect(de.query(By.css('.table__head'))).toBeTruthy();
    expect(de.queryAll(By.css('th')).length).toEqual(15);
    expect(de.query(By.css('tr'))).toBeTruthy();
  });

  fit('should be delete payment', fakeAsync(() => {
    expect(api.createPayment).toHaveBeenCalledWith({
      id: 0,
      name: 'test',
      cost: 100,
      months: []
    });
    tick();

    // expect(api.deletePayment).toHaveBeenCalledWith(0);
    // tick();

    // expect(api.getPayments).toHaveBeenCalledWith();
    // tick();
  }));
});
