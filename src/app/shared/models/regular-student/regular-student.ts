import {Payment} from "./payment";

export interface RegularStudent {
  subscriptionId: number;
  name: string;
  phone: string;
  finalAddress: string;
  subscriptionStatus: string;
  payment: Payment;
}

