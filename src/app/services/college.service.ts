import {Injectable} from '@angular/core';
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {CollegeCampus} from "../shared/models/college/college-campus";

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  apiURL = getApiURL(ApiEndpoints.CAMPI);
  constructor(private http: HttpClient) { }

  findAllCampi() {
    return this.http.get<CollegeCampus[]>(this.apiURL, httpOptions);
  }

  findCampusById(campusId: number) {
    return this.http.get<CollegeCampus>(this.apiURL + "/" + campusId, httpOptions);
  }
}
