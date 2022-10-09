import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public signInWithEmailAndPassword(email, password){
  // todo:  submit email and password.  Hash password.
  }

  public createUserWithEmailAndPassword(email, password){
    // todo: submit name, email, phone, and password.  Hash password
  }

  public sendPasswordResetEmail(email){
    // todo: send email
  }

}   
