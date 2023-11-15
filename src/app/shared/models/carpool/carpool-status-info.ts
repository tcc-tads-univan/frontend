import {CarpoolStatus} from "../../enums/carpool-status";

export interface CarpoolStatusInfo {
  userId: number;
  originId: number;
  status: CarpoolStatus;
  lastUpdated: Date;
  scheduleId: number;
}
