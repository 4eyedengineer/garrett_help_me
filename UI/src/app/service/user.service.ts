import { Injectable } from '@angular/core';

export interface Iuser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  admin: boolean;
  expiresIn?: number;
  jwtBearerToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: Iuser;

  constructor() {}

  get user() {
    return this._user;
  }

  set user(details: Iuser) {
    this._user = { ...details };
    console.log(this._user);
  }
}
