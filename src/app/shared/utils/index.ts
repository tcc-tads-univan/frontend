import {HttpHeaders} from "@angular/common/http";
import {ApiEndpoints} from "../enums/api-endpoints";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

export function getApiURL(apiEndpoint: ApiEndpoints | string) {
  const API_GATEWAY_URL = "https://backend.redisland-d18d0338.eastus2.azurecontainerapps.io";
  return API_GATEWAY_URL.concat(apiEndpoint);
}
