import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { ManageQueueComponent } from './manage-queue/manage-queue.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'please', component: DashboardComponent },
  { path: 'join-queue', component: JoinQueueComponent },
  { path: 'manager', component: ManageQueueComponent },
  { path: '',   redirectTo: '/please', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
