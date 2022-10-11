import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/service/login.service";

@Component({
  selector: "app-email-login",
  templateUrl: "./email-login.component.html",
  styleUrls: ["./email-login.component.scss"],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: "login" | "signup" | "reset" = "signup";
  loading = false;

  serverMessage: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6), Validators.required]],
      passwordConfirm: ["", []],
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === "login";
  }

  get isSignup() {
    return this.type === "signup";
  }

  get isPasswordReset() {
    return this.type === "reset";
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  get passwordConfirm() {
    return this.form.get("passwordConfirm");
  }

  get passwordDoesMatch() {
    if (this.type !== "signup") {
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
        await this.loginService.signInWithEmailAndPassword(email, password);
      } else if (this.isSignup) {
        await this.loginService.createUserWithEmailAndPassword(email, password);
      } else if (this.isPasswordReset) {
        await this.loginService.sendPasswordResetEmail(email);
        this.serverMessage = "Check your email";
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        await this.tryLogin(email, password);
      }
      this.serverMessage = err;
    }
    this.router.navigate(["/join-queue"]);
    this.loading = false;
  }

  async tryLogin(email, password) {
    this.loading = true;
    try {
      await this.loginService.signInWithEmailAndPassword(email, password);
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }
}
