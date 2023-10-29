import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {History} from "../shared/models/history/history";


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getCarpoolHistory(userId: number, userType: number) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('userType', userType);

    const url = getApiURL(ApiEndpoints.HISTORY + "/trips")

    return this.http.get<History>(url, { params });
  }

}

