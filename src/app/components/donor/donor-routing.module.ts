import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';
import { DonorComponent } from './donor.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: DonorComponent },
  { path: 'donate', component: DonateBloodComponent },
  { path: 'history', component: DonationHistoryComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
