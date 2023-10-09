import {HttpHeaders} from "@angular/common/http";
import {ApiEndpoints} from "../enums/api-endpoints";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

export function getApiURL(apiEndpoint: ApiEndpoints | string) {
  const API_GATEWAY_URL = "http://localhost:8080";
  return API_GATEWAY_URL.concat(apiEndpoint);
}

export function convertDateToScheduleTime(date: Date) {
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minutes}`;
}
