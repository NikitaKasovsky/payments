export interface IPayment {
  id: number;
  name: string;
  cost: number;
  months: any;
}

export interface IPaymentCreateRequest {
  name: string;
  cost: number;
}
