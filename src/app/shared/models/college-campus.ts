import {College} from "./college";

export class CollegeCampus {
  constructor(
    public id?: number,
    public name?: string,
    public acronym?: string,
    public lineAddress?: string,
    public college?: College
  ) {
  }
}
