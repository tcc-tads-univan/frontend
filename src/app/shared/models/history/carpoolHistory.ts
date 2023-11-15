import {CarpoolStatus} from "../../enums/carpool-status";

export interface CarpoolHistory {
  id: number;
  studentId: number;
  studentName: string;
  driverId: number;
  driverName: string;
  initialDestination: string;
  finalDestination: string;
  price: number;
  date: string;
  stars: number;
  status: CarpoolStatus;
}
