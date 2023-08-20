export class CarpoolRequest {
  constructor(
    public campusId: number,
    public studentId: number,
    public scheduleTime: string,
    public lineAddress: string
  ) {
  }
}
