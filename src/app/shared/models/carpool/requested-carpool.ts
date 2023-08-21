export class RequestedCarpool {
  constructor(
    public studentId?: number,
    public name?: string,
    public phoneNumber?: string,
    public lineAddress?: string,
    public scheduleTime?: string,
    public photoUrl?: string,
    public rating?: number
  ) {
  }
}
