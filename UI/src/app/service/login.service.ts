import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { environment } from '../../environments/environment';
import { Iuser } from './user.service';
import * as moment from 'moment';

enum API {
  signIn = '/login',
  signUp = '/signUp',
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  options = {
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}

  public signInWithEmailAndPassword(email, password) {
    password = sha256(password);
    return this.http
      .post<Iuser>(
        `${environment.API}${API.signIn}`,
        {
          email,
          password,
        },
        this.options
      )
      .toPromise();
  }

  public createUserWithEmailAndPassword(email, password) {
    // todo: submit name, email, phone, and password.  Hash password
    password = sha256(password);
    return this.http
      .post<Iuser>(
        `${environment.API}${API.signUp}`,
        {
          email,
          password,
        },
        this.options
      )
      .toPromise();
  }

  public sendPasswordResetEmail(email) {
    // todo: send email
  }

  public setSession(authResult: Iuser) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.jwtBearerToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
