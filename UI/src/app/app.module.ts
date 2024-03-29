import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { LoginComponent } from './login/login.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemComponent } from './manage-queue/item/item.component';
import { EmailLoginComponent } from './login/email-login/email-login.component';
import { AuthInterceptorService } from './service/AuthInterceptor.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    JoinQueueComponent,
    ManageQueueComponent,
    LoginComponent,
    ItemComponent,
    EmailLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
