import {Payment} from "../regular-student/payment";

export interface StudentSubscription {
  driverName: string,
  driverPhone: string,
  vehiclePlate: string,
  payments: Payment[]
}

