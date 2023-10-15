import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StudentRegistration} from "../shared/models/student/student-registration";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {RequestedCarpool} from "../shared/models/carpool/requested-carpool";
import {DriverRegistration} from "../shared/models/driver/driver-registration";
import {Driver} from "../shared/models/driver/driver";
import {Student} from "../shared/models/student/student";
import {RegularStudent} from "../shared/models/regular-student/regular-student";
import {PendingSubscriptions} from "../shared/models/subscriptions/pending-subscriptions";

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

  findStudentBasicInfosById(userId: number) {
    const endpoint = getApiURL(ApiEndpoints.STUDENT) + "/" + userId + '/basic-infos';
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

  findPendingSubscriptions(studentId: number) {
    return this.http.get<PendingSubscriptions>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/pending-subscriptions"), httpOptions)
}

  findStudentSubscription(studentId: number) {
    return this.http.get<PendingSubscriptions>(getApiURL(ApiEndpoints.STUDENT + "/" + studentId + "/subscriptions"), httpOptions)
  }

}
