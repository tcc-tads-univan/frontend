import {College} from "./college";

export class CollegeCampus {
  constructor(
    public campusId?: number,
    public campusName?: string,
    public completeLineAddress?: string,
    public college?: College
  ) {
  }
}
