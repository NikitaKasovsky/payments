import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Компоненты
import {
  PaymentViewComponent,
  PaymentTableComponent
 } from './components';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PaymentViewComponent,
        PaymentTableComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
