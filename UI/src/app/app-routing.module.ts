import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: 'please', component: WelcomeComponent },
  { path: 'join-queue', component: JoinQueueComponent },
  { path: 'manager', component: ManageQueueComponent },
  { path: '',   redirectTo: '/please', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
