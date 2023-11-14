import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address} from "../shared/models/address/address";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private http: HttpClient) {
  }

  autocompleteAddress(input: string): Observable<Address[]> {
    return this.http.get<Address[]>(`http://localhost:8080/routes?address=${input}`);
  }

}
