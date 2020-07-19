import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Компоненты
import { AppComponent } from './app.component';
import {
  PaymentViewComponent,
  PaymentTableComponent
 } from './components';

@NgModule({
  declarations: [
    AppComponent,
    PaymentViewComponent,
    PaymentTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
