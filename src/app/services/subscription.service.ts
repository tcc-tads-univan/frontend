import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {
  }

  acceptSubscription(subscriptionId: number) {
    return this.http.post(getApiURL(ApiEndpoints.SUBSCRIPTION + "/" + subscriptionId + "/accept"), httpOptions)
  }

  declineSubscription(subscriptionId: number) {
    return this.http.post(getApiURL(ApiEndpoints.SUBSCRIPTION + "/" + subscriptionId + "/decline"), httpOptions)
  }

}

