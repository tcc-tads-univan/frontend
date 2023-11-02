import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StudentRegistration} from "../shared/models/student/student-registration";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {Student} from "../shared/models/student/student";
import {PendingSubscriptions} from "../shared/models/subscriptions/pending-subscriptions";
import {StudentSubscription} from "../shared/models/subscriptions/student-subscription";
import {Address} from "../shared/models/address/address";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  registerStudent(studentRegistration: StudentRegistration) {
    const data = new FormData();
    Object.keys(studentRegistration).forEach(key => {
      // @ts-ignore
      data.append(key, studentRegistration[key]);
    });

    return this.http.post(getApiURL(ApiEndpoints.STUDENT), data);
  }

  findStudentById(userId: number) {
    const endpoint = getApiURL(ApiEndpoints.STUDENT) + "/" + userId;
    return this.http.get<Student>(endpoint);
  }

  updateStudentById(studentId: number, studentRegistration: StudentRegistration) {
    const endpoint = getApiURL(ApiEndpoints.STUDENT) + "/" + studentId;
    const data = new FormData();
    Object.keys(studentRegistration).forEach(key => {
      // @ts-ignore
      data.append(key, studentRegistration[key]);
    });
    return this.http.put(endpoint, data);
  }

  findPendingSubscriptions(studentId: number | undefined) {
    return this.http.get<PendingSubscriptions[]>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/pending-subscriptions"), httpOptions)
}

  findStudentSubscription(studentId: number | undefined) {
    return this.http.get<StudentSubscription>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/subscription"), httpOptions)
  }

  registerStudentAddress(studentId: number, address: Address) {
    console.log(address.completeLineAddress + address.placeId)

    const body = {
      completeLineAddress: address.completeLineAddress,
      placeId: address.placeId,
    };
    const url = getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/address")

    return this.http.post(url, body);
  }

  findStudentAddress(studentId: number, addressId: number) {
    return this.http.get<Address>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/address/" + addressId), httpOptions)
  }

  deleteStudentAddress(studentId: number, addressId: number) {
    return this.http.delete<Address>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/address/" + addressId), httpOptions)
  }
}
