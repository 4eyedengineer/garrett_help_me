import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sha256 } from "js-sha256";
import { environment } from "../../environments/environment";

enum API {
  signIn = "/login",
  signUp = "/signUp",
}
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public signInWithEmailAndPassword(email, password) {
    password = sha256(password);
    return this.http
      .post(`${environment.API}${API.signIn}`, {
        email,
        password,
      })
      .toPromise();
  }

  public createUserWithEmailAndPassword(email, password) {
    // todo: submit name, email, phone, and password.  Hash password
    password = sha256(password);
    return this.http
      .post(`${environment.API}${API.signUp}`, {
        email,
        password,
      })
      .toPromise();
  }

  public sendPasswordResetEmail(email) {
    // todo: send email
  }
}
