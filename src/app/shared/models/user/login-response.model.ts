import {UserType} from "../../enums/user-type";

export interface LoginResponse {
  userId: number,
  name: string,
  token: string,
  userType: UserType
}
