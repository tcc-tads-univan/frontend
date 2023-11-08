import {College} from "./college";

export interface CollegeCampus {
  campusId: number;
  campusName: string;
  completeLineAddress: string;
  placeId: string;
  college: College;
}
