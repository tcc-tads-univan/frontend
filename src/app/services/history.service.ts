import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {getApiURL} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {CarpoolHistory} from "../shared/models/history/carpoolHistory";
import {UserType} from '../shared/enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getCarpoolHistory(userId: number, userType: UserType) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('userType', userType);

    const apiUrl = getApiURL(ApiEndpoints.HISTORY + "/trips")
    return this.http.get<CarpoolHistory[]>(apiUrl, {params});
  }

}

