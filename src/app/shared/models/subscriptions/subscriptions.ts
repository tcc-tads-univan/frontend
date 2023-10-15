export interface Subscriptions {
  availableSeats: number,
  students: [
    {
      subscriptionId: number,
      name: string,
      subscriptionStatus: string
    }
  ]
}

