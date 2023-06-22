export class Agendamento {
  constructor(
    public scheduleId: number,
    public driverName: string,
    public origin: string,
    public destination: string,
    public scheduledTime: string
  ) {
  }
}
