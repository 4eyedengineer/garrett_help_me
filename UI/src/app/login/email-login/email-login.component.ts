import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Iuser, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'login';
  loading = false;

  serverMessage: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        const user = await this.loginService.signInWithEmailAndPassword(
          email,
          password
        );
        this.loginService.setSession(user);
        this.setUser(user);
        this.router.navigate(['/join-queue']);
      } else if (this.isSignup) {
        const newUser = await this.loginService.createUserWithEmailAndPassword(
          email,
          password
        );

        this.setUser(newUser);
        this.router.navigate(['/join-queue']);
      } else if (this.isPasswordReset) {
        await this.loginService.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
      console.log('try');
    } catch (err) {
      this.serverMessage = err;
    }
    console.log('finished submit');
    this.loading = false;
  }

  private handleUserNavigation(user: Iuser) {
    (user.admin && this.router.navigate(['/manage'])) ||
      this.router.navigate(['/join-queue']);
    if (user.admin) {
      this.router.navigate(['/manage']);
    } else {
      this.router.navigate(['/join-queue']);
    }
  }

  private setUser(user: Iuser) {
    this.userService.user = user;
  }
}
