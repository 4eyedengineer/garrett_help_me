import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'please', component: LoginComponent },
  { path: 'join-queue', component: JoinQueueComponent },
  { path: 'manage', component: ManageQueueComponent },
  { path: '',   redirectTo: '/please', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
