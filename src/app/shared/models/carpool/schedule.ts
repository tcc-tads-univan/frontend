export interface Schedule {

  scheduleId: number,
  scheduleTime: string,
  originAddress: string,
  destinationAddress: string,
  ridePrice: number,
  driver: {
    name: string,
    photoUrl: string,
    rating: number,
    phoneNumber: string,
    vehiclePlate: string
  }

}
