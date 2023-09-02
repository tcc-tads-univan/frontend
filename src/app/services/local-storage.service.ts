import { Injectable } from '@angular/core';
import {Agendamento} from "../shared/models/agendamento.model";
import {LocalStorageKeys} from "../shared/enums/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  saveAuthToken(token: string) {
    localStorage.setItem(LocalStorageKeys.AUTH, 'true[' + token + ']');
  }

  clearAuthToken() {
    localStorage.removeItem(LocalStorageKeys.AUTH);
  }

  saveUserInfo(studentId: number, studentName: string) {
    localStorage.setItem(LocalStorageKeys.STUDENT, JSON.stringify({studentId, studentName}));
  }

  getUserInfo(): {studentId: number, studentName: string} {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.STUDENT) ?? JSON.stringify({}));
  }

  saveCarpoolInfo(studentId: number, campusId: number, collegeName: string) {
    localStorage.setItem(LocalStorageKeys.CARPOOL, JSON.stringify({studentId, campusId, collegeName}));
  }

  getCarpoolInfo(): {studentId: number, campusId: number, collegeName: string}  {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.CARPOOL) ?? JSON.stringify({}));
  }

  saveSchedule(agenamento: Agendamento) {
    localStorage.setItem(LocalStorageKeys.AGENDAMENTO, JSON.stringify(agenamento));
  }

  getSchedule(): Agendamento {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.AGENDAMENTO) ?? JSON.stringify({}));
  }
}
