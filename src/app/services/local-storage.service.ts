import {Injectable} from '@angular/core';
import {LocalStorageKeys} from "../shared/enums/local-storage-keys";
import {Schedule} from "../shared/models/carpool/schedule";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  saveAuthToken(token: string) {
    localStorage.setItem(LocalStorageKeys.AUTH, 'true[' + token + ']');
  }

  clearAuthToken() {
    localStorage.removeItem(LocalStorageKeys.AUTH);
  }

  saveUserInfo(studentId: number, studentName: string) {
    localStorage.setItem(LocalStorageKeys.STUDENT, JSON.stringify({studentId, studentName}));
  }

  getUserInfo(): { studentId: number, studentName: string } {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.STUDENT) ?? JSON.stringify({}));
  }

  saveCarpool(studentId: number, campusId: number) {
    localStorage.removeItem(LocalStorageKeys.CARPOOL);
    localStorage.setItem(LocalStorageKeys.CARPOOL, JSON.stringify({studentId, campusId}));
  }

  getCarpool(): { studentId: number, campusId: number } {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.CARPOOL) ?? JSON.stringify({}));
  }

  saveSchedule(schedule: Schedule) {
    localStorage.setItem(LocalStorageKeys.AGENDAMENTO, JSON.stringify(schedule));
  }

  getSchedule(): Schedule {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.AGENDAMENTO) ?? JSON.stringify({}));
  }
}
