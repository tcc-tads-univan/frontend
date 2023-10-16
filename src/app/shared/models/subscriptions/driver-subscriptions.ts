export interface DriverSubscriptions {
  availableSeats: number,
  students: [
    {
      subscriptionId: number,
      name: string,
      subscriptionStatus: string
    }
  ]
}

