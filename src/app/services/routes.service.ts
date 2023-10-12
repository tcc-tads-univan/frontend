import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address} from "../shared/models/address/address";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private http: HttpClient) {
  }

  autocompleteAddress(input: string) {
    return this.http.get<Address[]>(`http://localhost:8080/routes?address=${input}`);
  }

  saveStudentAddress(studentId: number, address: Address) {
    return of("MOCK - studentId: " + studentId + ": " + address);
  }
}
