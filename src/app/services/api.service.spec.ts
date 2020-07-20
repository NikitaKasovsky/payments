import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

// Сервисы
import { ApiService } from './api.service';

// Интерфейсы
import { IPayment, IPaymentCreateRequest } from '../interfaces';

describe('Service: Api', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
    service = TestBed.get(ApiService);
  });

  it('should create payment, get list payments', fakeAsync(() => {
    const request: IPaymentCreateRequest = { name: 'payment-0-test', cost: 100 };
    const spyCreatePayment = jasmine.createSpy('createPayment');
    const spyPayments = jasmine.createSpy('payments');

    service.getPayments()
      .subscribe(spyPayments);

    tick();
    expect(spyPayments).toHaveBeenCalledWith([]);

    service.createPayment(request)
      .subscribe(spyCreatePayment);

    tick();
    expect(spyCreatePayment).toHaveBeenCalledWith('200');

    service.getPayments()
      .subscribe(spyPayments);

    tick();
    expect(spyPayments).toHaveBeenCalledWith([
      {
        id: 0,
        name: request.name,
        cost: request.cost,
        months: []
      }
    ]);
  }));

  it('should remove payment', fakeAsync(() => {
    const request: IPaymentCreateRequest = { name: 'payment-0-test', cost: 100 };
    const spyCreatePayment = jasmine.createSpy('createPayment');
    const spyPayments = jasmine.createSpy('payments');
    const spyDelPayment = jasmine.createSpy('delPayment');

    service.getPayments()
      .subscribe(spyPayments);

    tick();
    expect(spyPayments).toHaveBeenCalledWith([]);

    service.createPayment(request)
      .subscribe(spyCreatePayment);

    tick();
    expect(spyCreatePayment).toHaveBeenCalledWith('200');

    tick();
    expect(spyPayments).toHaveBeenCalledWith([
      {
        id: 0,
        name: request.name,
        cost: request.cost,
        months: []
      }
    ]);

    service.deletePayment(0)
      .subscribe(spyDelPayment);

    tick();
    expect(spyCreatePayment).toHaveBeenCalledWith('200');

    service.getPayments()
      .subscribe(spyPayments);

    tick();
    expect(spyPayments).toHaveBeenCalledWith([]);
  }));
});
