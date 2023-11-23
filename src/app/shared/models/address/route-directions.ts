export interface RouteDirections {
  waypoints: [{
    placeId: string;
    userId: number;
  }];
  destination: string;
}
