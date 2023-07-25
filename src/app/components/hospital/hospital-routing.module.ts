import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HospitalComponent } from './hospital.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: '', component: HospitalComponent },
  { path: 'request', component: RequestComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
