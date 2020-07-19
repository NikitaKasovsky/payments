export interface IPayment {
  id: number;
  name: string;
  cost: number;
  months: number[];
}

export interface IPaymentCreateRequest {
  name: string;
  cost: number;
}
